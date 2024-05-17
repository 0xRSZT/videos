// Importar librería ethers
// import { ethers } from "ethers";
const { ethers, formatEther } = require("ethers");

// Conexión a Infura
const provider = new ethers.JsonRpcProvider(
  "https://avalanche-mainnet.infura.io/v3/c9bb142b5c1a4b9b86e625c797ebaecd"
);

// Funciones ABI que queremos consultar
const ERC721_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

// Dirección del contrato:
// https://snowtrace.io/address/0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8
const address = "0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8";

// Instancia del contrato
const contract = new ethers.Contract(address, ERC721_ABI, provider);

// Función asíncrona
const main = async () => {
  // Consultar el nombre del token
  const name = await contract.name();

  // Consultar símbolo del token
  const symbol = await contract.symbol();

  // Consultar cuántos tokens hay en circulación
  const totalSupply = await contract.totalSupply();

  // Dirección del mayor holder:
  // https://snowtrace.io/address/0xb650599eed33603E3E8cC77Ff412c18366d50b3A/tokentxnsErc721
  const holder = "0xb650599eed33603E3E8cC77Ff412c18366d50b3A";

  // Consultar el balance de tokens de una cuenta
  const balanceOf = await contract.balanceOf(holder);

  // Imprimir resultados por pantalla
  console.log(
    `El mayor holder de la colección NFT ${name} es ${holder} y tiene un total de ${balanceOf} ${symbol} de un total de ${totalSupply}`
  );
};

main();
