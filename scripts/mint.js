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
  const account = prompt("Enter Account address to mint: ");
  const amount = parseInt(prompt("Enter Token amount to mint: "));
  const contractAddress = "0xd9f4734f4A69114a720240a0D024710e6accB871";
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const functionName = "mint";
  const functionArgs = [account, amount];
  const contract = contractFactory.attach(contractAddress);
  console.log(`Minting ${amount} tokens`);
  const mintTx = await sendShieldedTransaction(
    signers[0],
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await mintTx.wait();
  console.log(`${amount} Tokens minted`);
  console.log("--------------------------------------------------------");
  console.log("Transaction Receipt: ", mintTx);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
