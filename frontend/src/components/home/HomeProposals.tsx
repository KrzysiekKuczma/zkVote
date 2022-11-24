import { ContractKeys, useDeployment } from '@deployments/deployments';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import zkGovIcon from 'public/icons/zkgov.svg';
import 'twin.macro';
import toast from 'react-hot-toast';

type Proposal = {
  againstAddress: string,
  againstVotes: string,
  amount: string,
  description: string,
  executed: boolean,
  forAddress: string,
  forVotes: string,
  title: string,
  to: string,
  voteEnd: string,
  voteStart: string,
  endDate: Date
}

export const HomeProposals: FC = () => {
  const { contract } = useDeployment(ContractKeys.zk_governor);
  // const [proposalsCount, setProposalsCount] = useState<number>();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>();

  const fetchSize = async () => {
    console.log({contract});
    if (!contract) return;
    setFetchIsLoading(true);

    try {
      // FIXME: Replace query/method to call a contract with
      const { result, output } = await contract.query.getProposalsSize('', {});
      const message = output?.toString();

      if (!result?.isOk) throw new Error(result.toString());

      console.log({message});
      // setProposalsCount(parseInt(message!));

      // const {result: res, output: out} = await contract.query.getProposal('', {}, {proposal_id: 1});
      // console.log({res: res.toHuman(), out: out?.toHuman()});

      const proposalsCount = parseInt(message!);

      let elements: any[] = await Promise.all([
        ...new Array(proposalsCount).fill('').map((_, index) => contract.query.getProposal('', {}, {proposal_id: index}))
      ]);

      let elementsVotes: any[] = await Promise.all([
        ...new Array(proposalsCount).fill('').map((_, index) => contract.query.getProposalVote('', {}, {proposal_id: index}))
      ]);

      elements = elements.map(el => el.output?.toHuman());
      elementsVotes = elementsVotes.map(el => el.output?.toHuman());

      const proposals: Proposal[] = elements.map((el, index) => ({
        ...el,
        ...elementsVotes[index],
        endDate: new Date(parseInt(el.voteEnd.split(',').join('')))
      }));

      console.log(proposals);
      setProposals(proposals);
    } catch (e) {
      console.error(e);
      toast.error('Error while fetching proposals count. Try again…');
      // setProposalsCount(0);
    } finally {
      setFetchIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSize();
  }, [contract]);
  
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-extrabold text-gray-200">
            Proposals
      </h2>

      <div className="flex flex-col space-y-4">
        {proposals.map((proposal, index) => (
          <Link key={index} href={`/proposal/${index}`} className="flex space-x-[32px] border-[2px] border-gray-500 p-8 rounded-md">
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-medium text-gray-200">{proposal.title}</h3>
              <p className="text-gray-400 text-sm max-w-[600px]">{proposal.description}</p>
            </div>

            <div className="flex text-center space-x-4">
              <div className="flex flex-col">
                <div className="">
                  <h4 className="text-medium text-mono">Votes for</h4>
                  <h5 className="text-green-700">{proposal.forVotes}</h5>
                </div>

                <div className="">
                  <h4 className="text-medium text-mono">Votes against</h4>
                  <h5 className="text-red-700">{proposal.againstVotes}</h5>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="">
                  <h4 className="text-medium text-mono">Total votes</h4>
                  <h5 className="text-gray-400">{parseInt(proposal.againstVotes) + parseInt(proposal.forVotes)}</h5>
                </div>

                <div className="">
                  <h4 className="text-medium text-mono">End date</h4>
                  <h5 className="text-gray-400">{`${proposal.endDate.getDate()}.${proposal.endDate.getMonth()}.${proposal.endDate.getFullYear()}`}</h5>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
