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
  const signers = await hre.ethers.getSigners();
  console.log("--------------------------------------------------------");
  console.log("Avaliable Accounts: ");
  console.log(`${signers[0].address}(Owner) \n${signers[1].address}`);
  const account = prompt("Enter Account address: ");
  const contractAddress = "0xd9f4734f4A69114a720240a0D024710e6accB871";
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "balanceOf";
  const functionArgs = [account];
  console.log(`Fetching Balance of ${account}`);
  const responseMessage = await sendShieldedQuery(
    signers[0].provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs)
  );
  console.log(
    "Balance: ",
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
