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
  const contractAddress = "0xD72731016b8A0F5dee3c1a76e9EaB99263e87F5E";
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
