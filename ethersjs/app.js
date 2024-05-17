// Importar librería ethers
// import { ethers } from "ethers";
const { ethers, formatEther } = require("ethers");

// Conexión a Infura
const provider = new ethers.JsonRpcProvider(
  "https://avalanche-mainnet.infura.io/v3/c9bb142b5c1a4b9b86e625c797ebaecd"
);

const main = async () => {
  // Consultar número de bloque actual
  const block = await provider.getBlockNumber();
  console.log("Bloque actual: ", block);

  // Consultar balance de una cuenta
  balance = await provider.getBalance(
    "0x9Da5812111DCBD65fF9b736874a89751A4F0a2F8"
  );
  console.log("Balance: ", formatEther(balance));
};

main();
