import Image from 'next/image';
import Link from 'next/link';
import zkGovIcon from 'public/icons/zkgov.svg';
import { FC } from 'react';
import 'twin.macro';

export const AddProposal: FC = () => {
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

      <button className="mt-[32px] text-bold font-mono text-black bg-gray-200 hover:bg-white w-full py-3 rounded-md">Add Proposal</button>
    </div>
  );
};
