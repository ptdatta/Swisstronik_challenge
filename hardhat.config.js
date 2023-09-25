require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config({path: './.env'});

const SWISSTRONIK_RPC_URL = process.env.SWISSTRONIK_RPC_URL;
const DEPLOYER = process.env.DEPLOYER_PRIVATE_KEY;
const USER = process.env.USER_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url: SWISSTRONIK_RPC_URL,
      accounts: [`0x${DEPLOYER}`, `0x${USER}`],
    },
  },
};
