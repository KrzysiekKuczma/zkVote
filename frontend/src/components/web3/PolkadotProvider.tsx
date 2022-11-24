import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api';
import { InjectedAccountWithMeta, Unsubcall } from '@polkadot/extension-inject/types';
import { Signer } from '@polkadot/types/types';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';

export type PolkadotProviderContextType = {
  activeChain?: PolkadotProviderChain
  setActiveChain?: Dispatch<SetStateAction<PolkadotProviderChain>>
  api?: ApiPromise
  provider?: WsProvider | HttpProvider
  connect?: () => Promise<void>
  disconnect?: () => void
  isLoading?: boolean
  accounts?: InjectedAccountWithMeta[]
  account?: InjectedAccountWithMeta
  signer?: Signer
  setAccount?: Dispatch<SetStateAction<InjectedAccountWithMeta | undefined>>
  generateAccount?: () => {voteAgainstAddress: string; voteForAddress: string}
}
export const PolkadotProviderContext = createContext<PolkadotProviderContextType>({});

export const usePolkadotProviderContext = () => {
  return useContext(PolkadotProviderContext);
};

export interface PolkadotProviderChain {
  network: string
  name: string
  rpcUrls: [string, ...string[]]
  testnet?: boolean,
  faucetUrls?: string[]
}
export interface PolkadotProviderProps extends PropsWithChildren {
  connectOnInit?: boolean
  defaultChain: PolkadotProviderChain
}
export const PolkadotProvider: FC<PolkadotProviderProps> = ({
  children,
  connectOnInit,
  defaultChain,
}) => {
  const [activeChain, setActiveChain] = useState<PolkadotProviderChain>(defaultChain);
  const [api, setApi] = useState<ApiPromise>();
  const [provider, setProvider] = useState<WsProvider | HttpProvider>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [account, setAccount] = useState<InjectedAccountWithMeta>();
  const [signer, setSigner] = useState<Signer>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [unsubscribeAccounts, setUnsubscribeAccounts] = useState<Unsubcall>();

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

    return {voteAgainstAddress, voteForAddress};
  };

  const initialize = async () => {
    // Initialize polkadot-js/api
    try {
      const provider = new WsProvider('wss://ws-smartnet.test.azero.dev');
      console.log(provider);
      setProvider(provider);
      const api = await ApiPromise.create({ provider });
      setApi(api);
    } catch (e) {
      console.error('Error while initializing polkadot-js/api:', e);
      setApi(undefined);
      setProvider(undefined);
    }

    // Optionally Connect
    if (connectOnInit) await connect();
  };

  const connect = async () => {
    setIsLoading(true);
    try {
      // Dynamically import polkadot/extension-dapp (hydration error otherwise)
      const { web3AccountsSubscribe, web3Enable } = await import('@polkadot/extension-dapp');

      // Initialize web3 extension
      const extensions = await web3Enable('zkVote'); // TODO
      if (!extensions?.length) {
        toast.error('No Substrate-compatible extension detected.');
      }

      generateAccount();

      // Query & keep listening to web3 accounts
      unsubscribeAccounts?.();
      const unsubscribe = await web3AccountsSubscribe((injectedAccounts) => {
        console.log('accounts update:', injectedAccounts);
        setAccounts(injectedAccounts || []);
        setAccount(!!injectedAccounts?.length ? injectedAccounts[0] : undefined);
      });
      setUnsubscribeAccounts(unsubscribe);
    } catch (e) {
      console.error('Error while fetching accounts with polkadot/extension-dapp:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setAccounts([]);
    setAccount(undefined);
    unsubscribeAccounts?.();
    setUnsubscribeAccounts(undefined);
  };

  // Initialze
  useEffect(() => {
    initialize();
    return unsubscribeAccounts;
  }, [activeChain?.network]);

  // Update signer
  const udpateSigner = async () => {
    if (!account) {
      setSigner(undefined)
      ;(api as any)?.setSigner(undefined);
      return;
    }
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp');
      const injector = await web3FromSource(account.meta.source);
      setSigner(injector?.signer);
      api?.setSigner(injector?.signer);
    } catch (e) {
      console.error('Error while getting signer:', e);
      setSigner(undefined)
      ;(api as any)?.setSigner(undefined);
    }
  };
  useEffect(() => {
    udpateSigner();
  }, [account]);

  return (
    <PolkadotProviderContext.Provider
      value={{
        activeChain,
        setActiveChain,
        api,
        provider,
        connect,
        disconnect,
        isLoading,
        accounts,
        account,
        signer,
        setAccount,
        generateAccount
      }}
    >
      {children}
    </PolkadotProviderContext.Provider>
  );
};
