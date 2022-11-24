
import 'twin.macro';
import { ContractKeys, useDeployment } from '@deployments/deployments';
import { FC, useEffect, useState } from 'react';
import { Keyring } from '@polkadot/keyring';
import { numberToU8a, stringToU8a } from '@polkadot/util';
import { AddressOrPair } from '@polkadot/api/types';
import { usePolkadotProviderContext } from '../web3/PolkadotProvider';
// type AddProposal = {

// }


export const AddProposal: FC = () => {
  const { contract } = useDeployment(ContractKeys.zk_governor);
  // const [proposal, setProposal]= useState<AddProposal>();
  const {
    accounts,
  } = usePolkadotProviderContext();

  console.log(accounts);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);

  const [addresses, setAddresses] = useState<{voteAgainstAddress: string, voteForAddress: string}>();

  const generateAccount = (): {voteAgainstAddress: string; voteForAddress: string} => {
    // Create account seed for Alice
    const VOTE_FOR_SEED = `Vote-for-${Date.now()}`.padEnd(32, ' ');
    const VOTE_AGAINST_SEED = `Vote-against-${Date.now()}`.padEnd(32, ' ');

    // Create an instance of the Keyring
    const keyring = new Keyring();

    // Create pair and add Alice to keyring pair dictionary (with account seed)
    const voteForPair = keyring.addFromSeed(stringToU8a(VOTE_FOR_SEED));
    const vorAgainstPair = keyring.addFromSeed(stringToU8a(VOTE_AGAINST_SEED));

    const voteForAddress = keyring.getPair(voteForPair.address).address;
    const voteAgainstAddress = keyring.getPair(vorAgainstPair.address).address;

    console.log('Created keyring pair for RANDOMs with address: ', {voteForAddress, voteAgainstAddress});
    setAddresses({voteAgainstAddress, voteForAddress});
    return {voteAgainstAddress, voteForAddress};
  };

  useEffect(() => {
    if(!addresses) return;
    
    generateAccount();
  }, [addresses]);

  const gasLimit = 3000n * 1000000n;
  const storageDepositLimit = null;

  const addProposal = async () => {
    const res = await contract?.tx.propose(
      {gasLimit, storageDepositLimit}, 
      addresses?.voteForAddress,
      addresses?.voteAgainstAddress,
      addresses?.voteForAddress, // to
      'Test title',
      'Test description',
      numberToU8a(1000),
      10
    );

    console.log(res);

    const ss = await res?.signAndSend(accounts ? accounts[0].address : '5Cvr3LKm2vYQiEYVZavFTqyi1fLjr5woaL5nS5QtNkReBbYf', {});
    console.log(ss?.toHuman());
    console.log(ss?.toString());
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-extrabold text-gray-200">
            Add proposal
      </h2>

      <div className="flex flex-col space-y-4 text-mono mt-[32px]">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-mono font-medium">Title</label>
          <input maxLength={100} type="text" id="title" className="border rounded-md bg-black border-gray-300 py-2 px-4 w-full" />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-mono font-medium">Duration [in minutes]</label>
            <input type="text" id="duration" className="border rounded-md bg-black border-gray-300 py-2 px-4 w-[250px]" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount" className="text-mono font-medium">Amount</label>
            <input type="number" id="amount" className="border rounded-md bg-black border-gray-300 py-2 px-4 w-[250px]" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-mono font-medium">Description</label>
          <textarea maxLength={300} id="description" className="border rounded-md bg-black border-gray-300 py-2 px-4 w-full h-[120px]" />
        </div>
      </div>

      <button onClick={async () => await addProposal()} className="mt-[32px] text-bold font-mono text-black bg-gray-200 hover:bg-white w-full py-3 rounded-md">Add Proposal</button>
    </div>
  );
};
