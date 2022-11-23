import { FC } from 'react';
import 'twin.macro';
import { useRouter } from 'next/router';
import { HomeTopBar } from '@components/home/HomeTopBar';
import { ConnectButton } from '@components/web3/ConnectButton';
import { Proposal } from '@components/proposal/Proposal';

const ProposalPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <div className="flex flex-col mx-auto space-y-8 py-[32px]">
        {/* Connect Wallet Button */}
        <div className="mx-auto">
          <ConnectButton />
        </div>
      
        <Proposal id={id} />

        {/* Chain Metadata Information */}
        {/* <ChainInfo /> */}

        {/* ZkGovernor Read/Write Contract Interactions */}
        {/* <ZkGovernorContractInteractions /> */}
      </div>
    </>
  );
};

export default ProposalPage;
