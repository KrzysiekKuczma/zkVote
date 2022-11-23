import { HomePageTitle } from '@components/home/HomePageTitle';
import { HomeProposals } from '@components/home/HomeProposals';
import { HomeTopBar } from '@components/home/HomeTopBar';
import { CenterBody } from '@components/layout/CenterBody';
import { ChainInfo } from '@components/web3/ChainInfo';
import { ConnectButton } from '@components/web3/ConnectButton';
import { ZkGovernorContractInteractions } from '@components/web3/ZkGovernorContractInteractions';
import type { NextPage } from 'next';
import 'twin.macro';

const HomePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <div className="flex flex-col max-w-7xl w-7xl mx-auto space-y-8 py-[50px]">
        <HomePageTitle />
        
        {/* Connect Wallet Button */}
        <div className="mx-auto">
          <ConnectButton />
        </div>
        

        <HomeProposals />

        {/* Chain Metadata Information */}
        {/* <ChainInfo /> */}

        {/* ZkGovernor Read/Write Contract Interactions */}
        {/* <ZkGovernorContractInteractions /> */}
      </div>
    </>
  );
};

export default HomePage;
