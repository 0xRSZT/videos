require("dotenv").config();
const ethers = require("ethers");

const API_KEY = process.env.API_KEY;

const provider = new ethers.AlchemyProvider("sepolia", API_KEY);

const contract = require("../artifacts/contracts/NFT.sol/Pixels.json");

const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

const abi = contract.abi;
const contractAddress = "0xfE6Bd658f875aF57f7548a951eADE5DDAcED60CD";

const NFT = new ethers.Contract(contractAddress, abi, signer);

// 2: Cat
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmWXEWofWL88VJDYaW3rLU25adBTEznWuwuYZtJCTxEppJ";

const mintNFT = async () => {
  let nftTxn = await NFT.mintNFT(signer.address, tokenUri);
  await nftTxn.wait();
  console.log(
    `NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
  );
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
