// Importamos la librería
const { Web3 } = require("web3");

// Nos conectamos al nodo de Infura
const web3 = new Web3(
  "https://mainnet.infura.io/v3/ce1ddfe9d795439fa0bd0dc8c3163088"
);

// Imprimimos por pantalla el objeto web3 para comprobar que estamos conectados
// console.log(web3);

// Hash de una cadena de caracteres
console.log(web3.utils.sha3("Hello World"));

// Comprobar que nuestra dirección de Ethereum es válida
console.log(web3.utils.isAddress("0x019805194afAABE04BFE3743b37c274E5415126e"));

// Comprobar una dirección inválida
console.log(web3.utils.isAddress("0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"));
