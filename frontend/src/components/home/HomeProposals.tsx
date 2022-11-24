import Image from 'next/image';
import Link from 'next/link';
import zkGovIcon from 'public/icons/zkgov.svg';
import { FC } from 'react';
import 'twin.macro';

export const HomeProposals: FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-extrabold text-gray-200">
            Proposals
      </h2>

      <div className="flex flex-col space-y-4">
        <Link href="/proposal/0" className="flex space-x-[32px] border-[2px] border-gray-500 p-8 rounded-md">
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-medium text-gray-200">Remove Paweł from the HackOnChain team</h3>
            <p className="text-gray-400 text-sm max-w-[600px]">Snacks. We love snacks. Definitely we love snacks. Why there are any snacks on the venue? Why do I have to steal energy drinks from random table? Why the whole world is against us? Can’t we just get prizes, get drunk, party and back home next day? I totally don’t get it.</p>
          </div>

          <div className="flex text-center space-x-4">
            <div className="flex flex-col">
              <div className="">
                <h4 className="text-medium text-mono">Votes for</h4>
                <h5 className="text-green-700">100k</h5>
              </div>

              <div className="">
                <h4 className="text-medium text-mono">Votes against</h4>
                <h5 className="text-red-700">100k</h5>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="">
                <h4 className="text-medium text-mono">Total votes</h4>
                <h5 className="text-gray-400">100k</h5>
              </div>

              <div className="">
                <h4 className="text-medium text-mono">Time left</h4>
                <h5 className="text-gray-400">100k</h5>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/proposal/1" className="flex space-x-[32px] border-[2px] border-gray-500 p-8 rounded-md">
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-medium text-gray-200">Remove Paweł from the HackOnChain team</h3>
            <p className="text-gray-400 text-sm max-w-[600px]">Snacks. We love snacks. Definitely we love snacks. Why there are any snacks on the venue? Why do I have to steal energy drinks from random table? Why the whole world is against us? Can’t we just get prizes, get drunk, party and back home next day? I totally don’t get it.</p>
          </div>

          <div className="flex text-center space-x-4">
            <div className="flex flex-col">
              <div className="">
                <h4 className="text-medium text-mono">Votes for</h4>
                <p className="text-green-700">100k</p>
              </div>

              <div className="">
                <h4 className="text-medium text-mono">Votes against</h4>
                <p className="text-red-700">100k</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="">
                <h4 className="text-medium text-mono">Total votes</h4>
                <p className="text-gray-400">100k</p>
              </div>

              <div className="">
                <h4 className="text-medium text-mono">Time left</h4>
                <p className="text-gray-400">100k</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
