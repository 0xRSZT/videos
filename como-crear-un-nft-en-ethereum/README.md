# 🖼️ Cómo CREAR TU PROPIA Colección de NFTs en Ethereum DESDE CERO!

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=XWN6_ue-PBs">
    <img src="https://img.youtube.com/vi/XWN6_ue-PBs/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Antes de comenzar, necesitamos tener instalado [Node.js,](https://nodejs.org/) una cuenta de [Alchemy](https://www.alchemy.com/) y [Metamask](https://metamask.io/). En nuestro equipo, creamos un nuevo directorio e instalamos [HardHat](https://hardhat.org/).

```bash
npm install --save-dev hardhat
```

Luego iniciamos un nuevo proyecto de **_JavaScript_** aceptando todos los valores predeterminados:

```solidity
npx hardhat init
```

## Desarrollo

Ahora vamos a instalar la dependencia de [OpenZeppelin](https://www.openzeppelin.com/) para que podemos usar sus contratos:

```bash
npm i @openzeppelin/contracts@4.9.3
```

Después (eliminamos el contrato que viene por defecto) y creamos un nuevo _Smart Contract_ llamado `NFT.sol` con este código:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pixels is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Pixels", "PXL") {}

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

### Análisis

Primero, como en todos los _Smart Contracts_, definiremos la versión de _Solidity_. Después **importaremos las siguientes librerías externas** que nos ofrece [OpenZeppelin](https://www.openzeppelin.com/) para poder almacenar la `URI`, utilizar un contador seguro y poseer el contrato como `owner`.

Luego, crearemos el contrato llamado `Pixels` que va a heredar otros dos contratos. Dentro, instanciaremos la última librería para llevar la cuenta de los NFTs. En el constructor, estableceremos que va a heredar las funciones del estándar _ERC721_, con el nombre **Pixels** y su abreviación.

Por último, la función `mintNFT()` nos permitirá crear **NFTs** especificando la cuenta que va a recibir el **NFT** y la dirección _URI_ que va a contener los _metadatos_ como el nombre, la descripción, imágen y otros atributos. Esta función solo la puede llamar el dueño del contrato y devuelve el _ID_ del ítem que hayamos creado.

### Variables de Entorno

Ahora que ya tenemos el código, vamos a conectarlo todo: Nuestra _wallet_, el _Smart Contract_ y la cuenta de _Alchemy_. Para poder firmar las transacciones de una manera segura, vamos a instalar la dependencia `dotenv` para almacenar la **clave privada** de nuestra billetera y la _API key_ de _Alchemy_ de forma local.

```solidity
npm install dotenv --save
```

En _Alchemy_, crearemos una nueva **App** llamada **NFT** en la red **Ethereum Sepolia**. Aquí veremos un panel de control con la cantidad de peticiones que hemos hecho a la **Blockchain**. Consultaremos las **_API keys_** de nuestro proyecto y copiamos la dirección **HTTPS**. En la carpeta raíz de nuestro proyecto, creamos el archivo `.env` con estos datos:

```solidity
API_URL = "https://eth-sepolia.g.alchemy.com/v2/<api-key>"
PRIVATE_KEY = "<metamask-private-key>"
```

Para exportar nuestra clave privada de [Metamask](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) hacemos clic en la selección de cuentas para ver los detalles de la billetera. Después hacemos clic en “**Mostrar la clave privada**” e introducimos la contraseña. Por último, mantenemos presionado el botón para ver la clave y la copiamos.

Es muy importante **NO enviar esta clave a nadie** ya que nos podría robar todos nuestros fondos. Tampoco debemos subir nunca el archivo `.env` a un entorno de producción o algún sitio en línea, este archivo **solo tiene que estar en nuestro equipo local**.

### HardHat Config

Antes de comenzar con el despliegue de este _Smart Contract_, vamos a actualizar el fichero `hardhat.config.js` para que utilice nuestras variables de entorno y se conecte a la red de _Sepolia_.

```solidity
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
```

## Despliegue

Es hora de programar el `script` que va a desplegar nuestro **Smart Contract**, nos dirigimos al archivo `deploy.js` en la carpeta _scripts_, borramos todo el contenido y pegamos este:

```solidity
async function main() {
  const Pixels = await ethers.getContractFactory("Pixels");

  const pixels = await Pixels.deploy();
  console.log("Contract deployed to address:", pixels.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Ahora sí que si, vamos a desplegar esto a la red ejecutando el siguiente comando:

```solidity
npx hardhat run scripts/deploy.js --network sepolia
```

Veremos que tarda muy poco y nos indica la dirección del _Smart Contract_. Esperamos un poco y podemos buscar esta dirección en el [explorador de bloques](https://sepolia.etherscan.io/), para comprobar que la [transacción](https://sepolia.etherscan.io/tx/0x1e8e3294b7a1790626aaa8a571c28f0ef873b0d4ca462b1a2a826b0bbd311a94) se ha ejecutado correctamente.

## Mint

Ya tenemos nuestro [contrato inteligente](https://sepolia.etherscan.io/address/0xfe6bd658f875af57f7548a951eade5ddaced60cd) con el estándar _ERC721_, ahora solo queda crear los **tokens**. En la carpeta de `scripts` creamos un nuevo archivo llamado `mint-nft.js` dónde usaremos la librería `ethers` para conectarnos a _Alchemy_:

```jsx
require("dotenv").config();
const ethers = require("ethers");

const API_KEY = process.env.API_KEY;

const provider = new ethers.AlchemyProvider("sepolia", API_KEY);

const contract = require("../artifacts/contracts/NFT.sol/Pixels.json");
```

Cómo estamos usando `API_KEY`, lo añadiremos a nuestro archivo `.env`.

```jsx
API_URL = "https://eth-sepolia.g.alchemy.com/v2/<api-key>";
PRIVATE_KEY = "<metamask-private-key>";
API_KEY = "<api-key>";
```

Si queremos interactuar con nuestro _Smart Contract_ desde nuestro `script`, tenemos que usar el **ABI**. El `ABI` es una **interfaz que describe el contrato en un formato JSON**. _HardHat_ genera este archivo automáticamente y lo podemos ver en la ruta `/artifacts/contracts/MyNFT`.

### Metadatos

Los metadatos son los **atributos** que va a tener cada **NFT**, por ejemplo este [NFT](https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1034) tiene como atributos los accesorios que lleva y dependiendo de sus rarezas va el precio. Vamos a crear un archivo `JSON` con los datos de nuestro primer _NFT_ y lo subiremos a _IPFS_.

Para subir archivos a _IPFS_ vamos a usar [Pinata](https://www.pinata.cloud/). Nos creamos una cuenta y verificamos el correo. Después, indicamos que vamos a subir archivos.

Subimos la imagen que queremos crear como _NFT_, en este caso tengo varias imágenes en píxeles, así que primero voy a subir la del teléfono. Podemos ver nuestro archivo accediendo mediante el enlace:

- [https://gateway.pinata.cloud/ipfs/QmVz6Dx3JmQPLteFHbJegjn3VLtmQC41FDBa4XFH1STU7u](https://gateway.pinata.cloud/ipfs/QmZL7qs4i7hei8wfvGhbnN3r7gGcopmqFGAyLcQpcxBtXE)

Ahora crearemos una carpeta para los metadatos y crearemos el primer archivo _JSON_ para el teléfono:

```json
{
  "attributes": [
    {
      "trait_type": "Background",
      "value": "White"
    },
    {
      "trait_type": "Category",
      "value": "Technology"
    }
  ],
  "description": "Vintage.",
  "image": "https://gateway.pinata.cloud/ipfs/QmVz6Dx3JmQPLteFHbJegjn3VLtmQC41FDBa4XFH1STU7u",
  "name": "Telephone"
}
```

Cuando hayamos terminado de customizar los **metadatos**, subiremos este archivo de la misma forma que la imagen a **Pinata** y **nos guardamos la dirección _URL_ de este archivo**:

- https://gateway.pinata.cloud/ipfs/QmVB7mJuBwQMhk1WLp9bDa4zt8z7cz1ymCdtSPzngctgqW

### Añadir Wallet y Metadatos

Volvemos al _script_ de despliegue, y para poder conectar este _script_ con nuestra _wallet_. Con este código, **indicamos la clave privada** para poder firmar transacciones y la dirección del contrato principal y por último instanciamos el contrato.

```jsx
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

const abi = contract.abi;
const contractAddress = "0xfE6Bd658f875aF57f7548a951eADE5DDAcED60CD";

const NFT = new ethers.Contract(contractAddress, abi, signer);
```

Por último, escribimos este código dónde indicamos la _URI_ de nuestro _token_ y llamamos a la función _mintNFT_ del **Smart Contract** con los _metadatos_ como parámetro de entrada.

```jsx
// 1: Telephone
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmVB7mJuBwQMhk1WLp9bDa4zt8z7cz1ymCdtSPzngctgqW";

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
```

El fichero final quedará así:

```jsx
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

// 1: Telephone
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmVB7mJuBwQMhk1WLp9bDa4zt8z7cz1ymCdtSPzngctgqW";

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
```

## Mint

Ya hemos terminado, solo queda ejecutar este _script_ para **mintear** nuestro **primer NFT**!

```jsx
node scripts/mint-nft.js
NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/0x5913f7d5af2413a98703d7b3f3cfcf649d0d0d06f5641cf28ea65cabd0f4e219
```

Si ha salido todo bien, nos responderá con la dirección de la transacción. En esta transacción podemos ver que hemos llamado a la función _Mint NFT_ en el contrato pasándole el primer **NFT**.

Usando este _script_ podemos crear tantos _NFT_ como queramos, solo tenemos que cambiar el **tokenURI** **indicando un archivo de metadatos diferente para cada uno**.

En [OpenSea](https://testnets.opensea.io/es/collection/mynft-8334), podemos conectarnos para ver en nuestro perfil el [NFT](https://testnets.opensea.io/es/assets/sepolia/0xfe6bd658f875af57f7548a951eade5ddaced60cd/1) que acabamos de crear y ver la [colección](https://testnets.opensea.io/es/collection/pixels-tutorial) con nuestro **NFT**! Aquí, podemos listar el NFT a la venta.

### Crear más Tokens

Si queremos crear más tokens NFT diferentes, lo primero que tenemos que hacer es subir primero la imagen a IPFS y copiar su dirección URL a un nuevo archivo de metadatos. Por ejemplo, vamos a subir el gato… y nos guardamos su dirección…

- https://gateway.pinata.cloud/ipfs/QmbFwRWyP64T7AUWRr4fexshK5pAh7ujEVoNLv1FrNcfJg

Editamos los atributos de este token y subimos también este archivo a IPFS. La dirección URL de los metadatos, la cambiamos en el script para mintear el NFT.

- https://gateway.pinata.cloud/ipfs/QmWXEWofWL88VJDYaW3rLU25adBTEznWuwuYZtJCTxEppJ

Ejecutamos el script de nuevo para desplegar este NFT y nos indicará que la transacción ha salido bien. Ahora podemos ver otro NFT en nuestra colleción desde OpenSea!

Además, OpenSea nos permite editar a nuestro gusto como se ve la colección, podemos cambiar el banner, logo como queramos.

### Testnet

En este tutorial, lo hemos hecho sobre la _testnet_ de **Sepolia** porque si lo hacemos sobre la red principal **nos costaría dinero al desplegar cada NFT**. Pero si lo quieres hacer sobre la _mainnet_, solo tienes que cambiar el _endpoint_ a la hora de crear la aplicación en **Alchemy**.
