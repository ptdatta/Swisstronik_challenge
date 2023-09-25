const prompt = require("prompt-sync")();
const hre = require("hardhat");
const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");

const sendShieldedQuery = async (provider, destination, data) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData, usedEncryptionKey] = await encryptDataField(
    rpcLink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};

const main = async () => {
  console.log("--------------------------------------------------------");
  const contractAddress = "0xd9f4734f4A69114a720240a0D024710e6accB871";
  const signers = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "totalSupply";
  console.log("Fetching total Supply...");
  const responseMessage = await sendShieldedQuery(
    signers[0].provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );
  console.log(
    "TotalSupply:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0]
  );
  console.log("--------------------------------------------------------");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
