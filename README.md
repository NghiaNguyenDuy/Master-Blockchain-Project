# Voting dApp using smart contract - Team7

## Step 0: Setup dev environment

```text
dev env: wls2 ubuntu on windowns 11
IDE: VSCode
VSCode Extensions: Solidity, Prisma
NodeJs: lts 24 for ui using Next.js framework
```

## Step 1: install foundry

```shell
# Download foundry installer `foundryup`
curl -L https://foundry.paradigm.xyz | bash
# Install forge, cast, anvil, chisel
foundryup

# check:
forge --version
anvil --version
```

## Step 2: Create Solidity project

```shell
forge init voting-foundry
cd voting-foundry

# code Voting.sol and DeployVoting.sol
```

## Step 3: build

```shell
forge clean
forge build
```

## Step 4: Start Envil

```shell
anvil
# or anvil &
# or anvil --port 8546 &
# copy 01 private key
```

## Step 5: Deploy contract

```shell
export RPC_URL="http://127.0.0.1:8545"
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

forge script script/DeployVoting.s.sol:DeployVoting \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast

# copy Contract Address
# Lấy ABI & Contract Address cho Frontend: out/Voting.sol/Ballot.json

```

## Step 6: install MetaMask

```text
Install MetaMask chrome extension

# new network
# import contract

```


## Step 7: Create voting webapp project

```shell
npx create-next-app@latest voting-web \
  --typescript \
  --eslint \
  --tailwind

cd voting-web

npm install -D prisma@6.18.0
npm install @prisma/client@6.18.0

npx prisma migrate dev --name init
npx prisma generate

npm run seed

```

```shell
# project clone

cd voting-web
# install node lts 24.11.1

npm install

npx prisma migrate dev --name init
npx prisma generate

npm run seed
```