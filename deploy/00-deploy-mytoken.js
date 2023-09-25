const hre = require("hardhat");

module.exports = async () => {
  const contract = await hre.ethers.deployContract("MyToken");
  await contract.waitForDeployment();
  console.log(`MyToken contract deployed to ${contract.target}`);
};
