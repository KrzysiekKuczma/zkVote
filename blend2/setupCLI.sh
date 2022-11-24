#!/bin/bash

#$1 //seed

cargo run --release -- --seed $1 set-node ws://ws-smartnet.test.azero.dev

cargo run --release -- --seed $1 set-contract-address 5ExdeNmh3c7kXpx9uE4M9T63z19KZNAPSyGMfE5zPXeBUryj