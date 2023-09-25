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
  const fromAccount = prompt("Enter From Account Address: ");
  const toAccount = prompt("Enter to account address: ");
  const signer = fromAccount === signers[0].address ? signers[0] : signers[1];
  const amount = parseInt(prompt("Enter Token amount to transfer: "));
  const contractAddress = "0xd9f4734f4A69114a720240a0D024710e6accB871";
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const functionName = "transferWithApproval";
  const functionArgs = [toAccount, amount];
  const contract = contractFactory.attach(contractAddress);
  console.log(`Transfering ${amount} tokens from ${fromAccount} to ${toAccount}...`);
  const burnTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await burnTx.wait();
  console.log(`Tokens transfered`);
  console.log("--------------------------------------------------------");
  console.log("Transaction Receipt: ", burnTx);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
