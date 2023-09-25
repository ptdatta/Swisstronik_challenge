# MYToken or MTK(ERC20)

This is a simple ERC20 contract with a token name MyToken and symbol MTK.
Fuctionalities:
 - Mint
 - Burn
 - Transfer
 - BalanceOf
 - TotalSupply

Contract Address `0xd9f4734f4A69114a720240a0D024710e6accB871`

Link in [explorer-evm](https://explorer-evm.testnet.swisstronik.com/address/0xd9f4734f4A69114a720240a0D024710e6accB871)

## To run

Clone the repo
```shell
git clone https://github.com/ptdatta/Swisstronik_challenge.git
cd Swisstronik_challenge
npm install or yarn install
```

To Deploy the contract
```shell
 yarn hardhat deploy --network swisstronik
```

Expected Output
```dotnetcli
Nothing to compile
MyToken contract deployed to 0xd9f4734f4A69114a720240a0D024710e6accB871
Done in 9.12s.
``````

### Mint

```powershell
yarn mint
``````

Expected Output
```dotnetcli
--------------------------------------------------------
Avaliable Accounts: 
0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668(Owner) 
0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Enter Account address to mint: 0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668
Enter Token amount to mint: 120
Minting 120 tokens
120 Tokens minted
--------------------------------------------------------
``````

### Burn

```powershell
yarn burn
``````

Expected Output
```dotnetcli
--------------------------------------------------------
Avaliable Accounts: 
0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668(Owner) 
0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Enter Account address to burn: 0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668
Enter Token amount to burn: 10
Burning 10 tokens from 0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668
10 Tokens burned
--------------------------------------------------------
``````

### Transfer

```powershell
yarn transfer
``````

Expected Output
```dotnetcli
--------------------------------------------------------
Avaliable Accounts: 
0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668(Owner) 
0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Enter From Account Address: 0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668
Enter to account address: 0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Enter Token amount to transfer: 10
Transfering 10 tokens from 0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668 to 0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0...
Tokens transfered
--------------------------------------------------------
``````

### Check Balance

```powershell
yarn balanceof
``````

Expected Output
```dotnetcli
--------------------------------------------------------
Avaliable Accounts: 
0x4Bd173f33cC6Db62f95E2bDBaF6d5723c179a668(Owner) 
0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Enter Account address: 0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Fetching Balance of 0xfc3f74d645F6cF687C74C4ED13231EF8A9313Df0
Balance:  10n
--------------------------------------------------------
``````

### Check totalSupply

```powershell
yarn supply
``````

Expected Output
```dotnetcli
--------------------------------------------------------
Fetching total Supply...
TotalSupply: 110n
--------------------------------------------------------
``````