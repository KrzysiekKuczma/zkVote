## Inspiration

Long, long time ago, when zkVote, nor AlephZero existed, the world has been ruled by Kings and Queens, the society had little to none impact on the path of history. One day, a mystery Night's Watch arrived to the town with his knights. They had a mission, to bring long awaited freedom, privacy, and voice to the people of the land. New order has been established, and finally every man and every lady could vote without worrying about being hunted, and decide about our common destiny together!

## What it does

zkVote - is an example DAO where users can submit their own proposals, vote on the other proposals, 
and in the end execute the proposals that have been resolved. However, the biggest game changer here is the voting system.  The voting system utilises Liminal 0, which leverages zero-knowledge proofs to hide the decision of the particular voter.

## How we built it

There are 2 smart contracts written in Rust and Ink!, first one is a governance token of the PSP22 standard, and the other smart contract is the DAO governance contract, which stores the proposals, votes, and allows executing them. The users do not vote directly on the governance smart contract, rather they send PSP22 governance tokens, to two separate addresses (one for votes supporting proposal, and one for votes against the given proposal), and later on the number of the deposited (burned) PSP22 governance tokens are counted to find out the results of the voting. The PSP22 governance tokens, are sent to the respective address using Blender - a CLI tool that leverages Liminal technology, generates zkProofs, and abstracts the real identity of the voters. Moreover, there is a backend service created that can execute the whole process from the user, to simplify the whole process. On top of it, there is also a frontend application built with React, TypeScript, and Polkadot.js library for interacting with the smart contract.

## Challenges we ran into

Working with freshly baked new technology - Blender, with very little documentation brought us a lot of troubles, yet we have managed to solve them. Another tricky part was introducing zero-knowledge proofs in an effective way to our application. On top of that, building smart contracts using Rust and Ink, in a new environment such as AlephZero was also additional challenge for our whole team. 

## Accomplishments that we're proud of

Definitely we are really proud of finishing the MVP version of the app, especially taking into consideration the fact that none of us had previous experience with Rust, Ink, nor Substrate. Another thing that we are really proud of, is finishing the initial Luminal implementation with Blender despite all of the issues that we have faced.

## What we learned

Tons of practical knowledge about Substrate ecosystem, smart contracts written in Rust, and most importantly the significance of the data privacy in the blockchain based projects.
## What's next for zkVote

Extending the functionality of the Liminal in a broader spectrum, and possibly moving the zero-knowledge proof generation to the client side as a WASM module.
