const prompt = require("prompt-sync")();
const hre = require("hardhat");
const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

const main = async () => {
  const signers = await hre.ethers.getSigners();
  console.log("--------------------------------------------------------");
  console.log("Avaliable Accounts: ");
  console.log(`${signers[0].address}(Owner) \n${signers[1].address}`);
  const account = prompt("Enter Account address to burn: ");
  const amount = parseInt(prompt("Enter Token amount to burn: "));
  const contractAddress = "0xD72731016b8A0F5dee3c1a76e9EaB99263e87F5E";
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const functionName = "burn";
  const functionArgs = [account, amount];
  const contract = contractFactory.attach(contractAddress);
  console.log(`Burning ${amount} tokens from ${account}`);
  const burnTx = await sendShieldedTransaction(
    signers[0],
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await burnTx.wait();
  console.log(`${amount} Tokens burned`);
  console.log("--------------------------------------------------------");
  console.log("Transaction Receipt: ", burnTx);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
