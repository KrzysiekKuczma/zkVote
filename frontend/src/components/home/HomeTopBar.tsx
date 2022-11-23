import { ConnectButton } from '@components/web3/ConnectButton';
import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import 'twin.macro';
import zkGovIcon from 'public/icons/zkgov.svg';

export const HomeTopBar: FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto">
      <div className="space-x-8 flex py-auto">
        <Link href="/" className="flex flex-col">
          <Image
            src={zkGovIcon}
            priority
            width={42}
            alt="zkGov Logo"
            className="w-[25px] h-auto mx-auto"
          />
          <h3 className="font-bold">zkVote</h3>
        </Link>
      
        <Link href="/add-proposal" className="my-auto">Add Proposal</Link>
      </div>
      

      {/* <ConnectButton /> */}
    </div>
  );
};
