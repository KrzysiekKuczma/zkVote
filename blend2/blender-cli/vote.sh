#!/bin/bash
#seed = $1;
#amount = $2;
#option = $3; (for/against address)

echo $1;
DEPOSIT_ID=$(cargo run --release -- --seed $1 show-assets 50 | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | cut -d " " -f 3);
echo $2;
cargo run --release -- --seed $1 deposit 50 $2;
echo $3;
echo $DEPOSIT_ID;
cargo run --release -- --seed $1 withdraw --recipient $3 --deposit-id "$((DEPOSIT_ID))" --amount $2;
echo $DEPOSIT_ID;