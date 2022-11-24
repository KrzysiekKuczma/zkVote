#!/bin/bash
#amount = $1;
#seed = $2;
#option = $3; (for/against address)

cd ../blend2/blender-cli

pwd

sh ./vote.sh $1 $2 $3

# DEPOSIT_ID = cargo run --release -- --seed $1 show-assets 50 | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | cut -d " " -f 3
# 
# cargo run --release -- --seed $1 deposit 50 $2
# 
# cargo run --release -- --seed $1 withdraw --recipient $3 --deposit-id DEPOSIT_ID --amount $2
