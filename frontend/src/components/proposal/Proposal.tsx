import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import 'twin.macro';
import { usePolkadotProviderContext } from '../web3/PolkadotProvider';
import { ZkGovernorContractInteractions } from '@components/web3/ZkGovernorContractInteractions';

export const Proposal = ({id}: {id: string}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    activeChain,
    api,
    account,
    accounts,
  } = usePolkadotProviderContext();

  const sendVote = async (kind: 'against' | 'for') => {
    axios.post('http://localhost:8000/', {
      'seed': '//Alice',
      'amount': 100,
      'option': (kind === 'for') ? '5CiCMK4JAxTvfygV1tqavoSyCsXGWYhhPYNxjdrFsBNJ1LRy' : '5FNVFEemK2vg7fdEinh4sVeiPh4XsHvB7Vii3UfLHLj7EBgX',
    }).then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
    
      <div className="flex space-x-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-200">
            TITLE - {id}
          </h2>

          <p className="text-gray-400 text-sm max-w-[600px]">Snacks. We love snacks. Definitely we love snacks. Why there are any snacks on the venue? Why do I have to steal energy drinks from random table? Why the whole world is against us? Can’t we just get prizes, get drunk, party and back home next day? I totally don’t get it.</p>

          <div className="">
            <button onClick={() => setModalOpen(!isModalOpen)} className="text-bold font-mono text-black bg-gray-200 hover:bg-white px-12 py-2 rounded-md">Vote</button>
          </div>
        </div>

        <div className="flex flex-col min-w-[350px] space-y-8">
          <div className="flex flex-col border-[2px] rounded-md border-gray-500 p-4">
            <h3 className="text-mono font-medium text-xl mb-4">Informations</h3>

            <div className="flex justify-between">
              <h4 className="text-medium text-mono">Voting system</h4>
              <p className="text-gray-400">Single choice voting</p>
            </div>

            <div className="flex justify-between">
              <h4 className="text-medium text-mono">Start date</h4>
              <p className="text-gray-400">Aug 18, 2022, 6:00 PM</p>
            </div>

            <div className="flex justify-between">
              <h4 className="text-medium text-mono">End date</h4>
              <p className="text-gray-400">Aug 18, 2022, 8:00 PM</p>
            </div>
          </div>

          <div className="flex flex-col border-[2px] rounded-md border-gray-500 p-4">
            <h3 className="text-mono font-medium text-xl mb-4">Results</h3>

            <div className="flex justify-between">
              <h4 className="text-medium text-mono">Votes for</h4>
              <p className="text-green-400">100k</p>
            </div>

            <div className="flex justify-between">
              <h4 className="text-medium text-mono">Votes against</h4>
              <p className="text-red-400">100k</p>
            </div>

            <div className="flex justify-between">
              <h4 className="text-medium text-mono">Total votes</h4>
              <p className="text-gray-400">1.8M</p>
            </div>
          </div>
        </div>
      
      </div>

      {isModalOpen && (
        <div aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div onClick={() => setModalOpen(!isModalOpen)} className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="px-8 py-4 relative transform overflow-hidden bg-black text-white rounded-md shadow-xl transition-all">
                <div className="flex mx-auto justify-center">
                  <div className="mt-3 text-center">
                    <div className="flex my-auto space-between">
                      <h3 className="text-lg font-medium leading-6 text-white" id="modal-title">Make the decision</h3>
                      <button onClick={() => setModalOpen(!isModalOpen)}  className="text-lg text-mono font-medium ml-auto align-middle">x</button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">Do you want to vote for, or against given proposal?</p>
                    </div>
                  </div>
                </div>
                {/* buttons */}
                <div className="px-4 py-3 flex text-black space-x-4 justify-center">
                  <button onClick={async () => {
                    await sendVote('against');
                    setModalOpen(!isModalOpen);
                  }} type="button" className="font-mono px-3 py-2 font-bold border-[2px] border-red-500 rounded-md hover:bg-red-600 text-white">Vote against</button>

                  <button onClick={async () => {
                    await sendVote('for');
                    setModalOpen(!isModalOpen);
                  }} type="button" className="font-mono px-3 py-2 font-bold border-[2px] bg-black border-green-500 text-white rounded-md hover:bg-green-600">Vote for</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
    
  );
};
