require("dotenv").config();
const ethers = require("ethers");

// Get Alchemy App URL
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider("sepolia", API_KEY);

// Get contract ABI file
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = "0xad03823b9a81988bac0ce27914c0448686355c60"; // !!

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);

// Get the NFT Metadata IPFS URL
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmPgAuNyqM3XqAjkyLePpiRSdy5Ly7mRkjwN74krUaXY69"; // !!

// Call mintNFT function
const mintNFT = async () => {
  let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri);
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
