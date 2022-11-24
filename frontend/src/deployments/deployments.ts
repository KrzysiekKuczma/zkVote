import { usePolkadotProviderContext } from '@components/web3/PolkadotProvider';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { env } from '@shared/environment';
import { useEffect, useState } from 'react';
import path from 'path';
/**
 * All deployed contracts for ABIs and/or addresses below
 * NOTE: Add new contracts here
 * IMPORTANT: The respective abi & address jsons must be under `/packages/contracts/${contract}/deployments/`
 */
export enum ContractKeys {
  // greeter = 'greeter',
  zk_governor = 'zk_governor',
  zk_governance_token = 'zk_governance_token'
}

/**
 * IMPORTANT: CHANGE NOTHING BELOW JUST FOR ADDING CONTRACTS
 * Imports are inferred dynamically from `ContractKeys` and `supportedChains` from the environment.
 */

/**
 * (Deployed) contract addresses by network identifier
 */

const directory = path.resolve(__dirname, '..');
export type AddressesType = { [_: string]: Promise<{ address: string }> }
export type AllAddressesType = { [_ in ContractKeys]: AddressesType }
// export const allAddresses = Object.keys(ContractKeys).reduce<AllAddressesType>(
//   (acc: any, contract: string) => ({
//     ...acc,
//     [contract]: env.supportedChains.reduce(
//       (acc: any, chain: string) => ({
//         ...acc,
//         [chain]: import(`${directory}/../contracts/${contract}/deployments/${chain}.json`),
//       }),
//       {},
//     ),
//   }),
//   {} as AllAddressesType,
// );

/**
 * (Deployed) contract abis
 */
export type AllABIsType = { [_ in ContractKeys]: Promise<Abi> }
// export const allABIs = Object.keys(ContractKeys).reduce<AllABIsType>(
//   (acc: any, contract: string) => ({
//     ...acc,
//     [contract]: import(`${directory}/../contracts/zk_governor/abi.json`),
//   }),
//   {} as AllABIsType,
// );

export const allABIs = import('../../../contracts/zk_governor/abi.json');

/**
 * Helper hook to access abis and addresses by active chain
 */
export const useDeployment = (key: ContractKeys) => {
  const { api, activeChain } = usePolkadotProviderContext();
  const [contractABI, setContractABI] = useState<object>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [contract, setContract] = useState<ContractPromise>();

  const update = async () => {
    const abi = await allABIs;
    setContractABI(abi);
    // const address = (await allAddresses[key]?.[activeChain?.network])?.address;
    const address = '5HegvCgQkd2ys4p9SH3u15F9akzMKfvz67ijMJnrjMpyPmyr';
    setContractAddress(address);
    const contract = api && address ? new ContractPromise(api, abi, address) : undefined;
    setContract(contract);
  };
  useEffect(() => {
    update();
  }, [api]);

  return {
    contractABI,
    contractAddress,
    contract,
  };
};
