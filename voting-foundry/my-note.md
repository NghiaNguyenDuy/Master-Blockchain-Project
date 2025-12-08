## Step 1: Build

```shell
forge build
```

## Step 2: Start Envil

```shell
anvil
# or anvil &
# or anvil --port 8546 &
# copy 01 private key
```

## Step 3: Delpoy Contract

```shell
export RPC_URL="http://127.0.0.1:8545"
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

forge script script/DeployVoting.s.sol:DeployVoting \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast
```

```shell
export VOTER1_ADDR=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export VOTER1_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

export VOTER2_ADDR=0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
export VOTER2_PK=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

export VOTER3_ADDR=0x90F79bf6EB2c4f870365E785982E1f101E93b906
export VOTER3_PK=0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

export VOTER4_ADDR=0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
export VOTER4_PK=0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a







cast interface out/Voting.sol/Ballot.json
# 1) Chairperson start vote
cast send $BALLOT "startVote()" \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY

# 2) Chairperson giveRightToVote cho voter1, voter2
export VOTER1_ADDR=0x...
export VOTER2_ADDR=0x...

cast send $BALLOT "giveRightToVote(address)" $VOTER1_ADDR \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY

cast send $BALLOT "giveRightToVote(address)" $VOTER2_ADDR \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY

# 3) Voter1 vote cho candidate 0
export VOTER1_PK=0x...

cast send $BALLOT "vote(uint256)" 0 \
  --rpc-url $RPC_URL \
  --private-key $VOTER1_PK

# 4) Voter2 vote cho candidate 1
export VOTER2_PK=0x...

cast send $BALLOT "vote(uint256)" 1 \
  --rpc-url $RPC_URL \
  --private-key $VOTER2_PK

# 5) Chairperson endVote
cast send $BALLOT "endVote()" \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY

# 6) Xem winner + số phiếu
cast call $BALLOT "winningCandidate()(string)" --rpc-url $RPC_URL
cast call $BALLOT "candidates(uint256)(string,uint256)" 0 --rpc-url $RPC_URL
cast call $BALLOT "candidates(uint256)(string,uint256)" 1 --rpc-url $RPC_URL

```