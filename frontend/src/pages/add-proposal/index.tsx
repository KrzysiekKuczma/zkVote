import { AddProposal } from '@components/add-proposal/AddProposal';
import { HomePageTitle } from '@components/home/HomePageTitle';
import { HomeTopBar } from '@components/home/HomeTopBar';
import { CenterBody } from '@components/layout/CenterBody';
import { ChainInfo } from '@components/web3/ChainInfo';
import { ConnectButton } from '@components/web3/ConnectButton';
import { ZkGovernorContractInteractions } from '@components/web3/ZkGovernorContractInteractions';
import type { NextPage } from 'next';
import 'twin.macro';

const AddProposalPage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <div className="flex flex-col w-5xl mx-auto space-y-8 py-[32px]">
        {/* Connect Wallet Button */}
        <div className="mx-auto">
          <ConnectButton />
        </div>
      
        <AddProposal />

        {/* Chain Metadata Information */}
        {/* <ChainInfo /> */}

        {/* ZkGovernor Read/Write Contract Interactions */}
        {/* <ZkGovernorContractInteractions /> */}
      </div>
    </>
  );
};

export default AddProposalPage;
