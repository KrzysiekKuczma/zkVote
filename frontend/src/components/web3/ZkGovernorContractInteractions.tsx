import { Button, Card, FormControl, FormLabel, Input, Stack, Wrap } from '@chakra-ui/react';
import { ContractKeys, useDeployment } from '@deployments/deployments';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import 'twin.macro';
import { usePolkadotProviderContext } from './PolkadotProvider';

export const ZkGovernorContractInteractions = () => {
  // const { account, signer } = usePolkadotProviderContext();
  const { contract } = useDeployment(ContractKeys.zk_governor);
  const [greeterMessage, setGreeterMessage] = useState<string>();

  const [proposalsCount, setProposalsCount] = useState<number>();

  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>();


  const fetchSize = async () => {
    if (!contract) return;
    setFetchIsLoading(true);

    try {
      // FIXME: Replace query/method to call a contract with
      const { result, output } = await contract.query.getProposalsSize('', {});
      const message = output?.toString();

      if (!result?.isOk) throw new Error(result.toString());

      console.log({message});
      setProposalsCount(parseInt(message!));
    } catch (e) {
      console.error(e);
      toast.error('Error while fetching proposals count. Try again…');
      setProposalsCount(0);
    } finally {
      setFetchIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSize();
  }, [contract]);

  // Update Greeting
  // const updateGreeting = async () => {
  //   if (!account || !contract || !signer) {
  //     toast.error('Wallet not connected. Try again…');
  //     return;
  //   }

  //   setUpdateIsLoading(true);
  //   try {
  //     // Gather form value
  //     const newMessage = form.getValues('newMessage');

  //     // Estimate gas
  //     const { gasRequired } = await contract.query.setMessage(
  //       account.address,
  //       { storageDepositLimit: null, gasLimit: -1 },
  //       newMessage,
  //     );
  //     const gasLimit = gasRequired.toNumber() * 1.5;

  //     // Execute transaction
  //     await contract.tx
  //       .setMessage({ gasLimit }, newMessage)
  //       .signAndSend(account.address, (result) => {
  //         if (result?.status?.isInBlock) fetchGreeting();
  //       });
  //     toast.success('Successfully updated greeting');
  //   } catch (e) {
  //     console.error(e);
  //     toast.error('Error while updating greeting. Try again.');
  //   } finally {
  //     setUpdateIsLoading(false);
  //   }
  // };

  if (!contract) return null;

  return {
    fetchSize,
    contract,
    proposalsCount
  };
};
