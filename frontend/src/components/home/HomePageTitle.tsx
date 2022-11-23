import Image from 'next/image';
import zkGovIcon from 'public/icons/zkgov.svg';
import { FC } from 'react';
import 'twin.macro';

export const HomePageTitle: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center font-mono">
        <Image
          src={zkGovIcon}
          priority
          width={42}
          alt="zkGov Logo"
          className="w-[100px] h-auto"
        />
        <h1 className="text-4xl font-extrabold text-gray-200">
            zkVote
        </h1>
      </div>
    </>
  );
};
