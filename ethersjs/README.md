# 🏷️ CÓMO USAR ETHERS.JS Para El DESARROLLO BLOCKCHAIN

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=MyYzuiiIzSg">
    <img src="https://img.youtube.com/vi/MyYzuiiIzSg/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Vamos a ver qué es la librería [Ethers.js](https://ethers.org/) y cómo podemos usarla al igual que [web3js](https://web3js.org/) para interactuar con la _blockchain_ de _Ethereum o sus redes derivadas._

Esta librería tiene una [documentación](https://docs.ethers.org/v6/getting-started/) muy completa, que podemos utilizar para aprender a usarla.

## Prerrequisitos

Antes de comenzar, como siempre, necesitamos tener instalado [Node.js](https://nodejs.org/) y su gestor de paquetes [NPM](https://www.npmjs.com/) en nuestro equipo...

### Provider vs Signer

Antes de empezar a utilizar esta librería, tenemos que entender varios [términos comunes](https://docs.ethers.org/v6/getting-started/#starting-glossary):

Un **proveedor** es una conexión a la _blockchain_ en modo de **solo lectura**, que nos permite consultar su estado, como las cuentas, bloques o los detalles de una transacción.

Un _signer_ o **firmante** en español, **agrupa todas las operaciones para interactuar con una cuenta**. Esta cuenta suele tener una clave privada en algún sitio, como por ejemplo en la memoria, utilizando el objeto `Wallet` o por otros servicios como [MetaMask](https://metamask.io/) que nos proporciona una interfaz gráfica intermedia para interactuar con la _Blockchain_ de una manera muy sencilla.

## Instalación

Lo primero que vamos a hacer es [instalar](https://docs.ethers.org/v6/getting-started/#getting-started) este paquete en un nuevo directorio utilizando este comando de `npm`:

```jsx
npm install ethers
```

### Infura

Al igual que en el [video anterior sobre web3](https://www.youtube.com/watch?v=_IBMr2kJNdM), **necesitamos un proveedor para poder conectarnos a la red**, así que primero vamos a usar [Infura](https://www.infura.io/) para crear una nueva `API KEY` llamada `Ethers`.

En este caso, vamos a seleccionar solo la red de [Avalanche C-Chain](https://docs.avax.network/es/build/dapp/c-chain-evm) para cambiar un poco. Esta es la red de [Avalanche](https://www.avax.network/) que **nos permite ejecutar contratos inteligentes** en _Solidity_ y es compatible con _Ethereum_.

## Uso

Una vez lo hayamos instalado, vamos a crear un nuevo archivo de _JavaScript_ llamado `app.js` dónde vamos a importar esta dependencia:

```jsx
const { ethers, formatEther } = require("ethers");
```

### Conexión

En este archivo, vamos a crear una nueva variable llamada `provider`, dónde vamos a indicar la ruta de nuestra `API KEY` para conectarnos a la red de **Avalanche**:

```jsx
// Conexión a Infura
const provider = new ethers.JsonRpcProvider(
  "https://avalanche-mainnet.infura.io/v3/c9bb142b5c1a4b9b86e625c797ebaecd"
);
```

## Obtener información

Una vez nos hayamos conectado, podemos interactuar con la _blockchain_, para sacar información. **La mayoría de funciones que vamos a usar son asíncronas**, así que vamos a crear este bloque de código para poder hacer estas consultas:

```jsx
const main = async () => {
  //
};

main();
```

Por ejemplo vamos a consultar **cuál es el número de bloque actual**, creando una nueva variable dentro de esta función y después la imprimiremos por pantalla:

```jsx
const main = async () => {
  // Consultar número de bloque actual
  const block = await provider.getBlockNumber();
  console.log("Bloque actual: ", block);
};

main();
```

Si ahora ejecutamos este script desde la consola, nos devolverá el número de [bloque actual](https://snowtrace.io/block/44893841?chainId=43114) de la _blockchain_ de **Avalanche**:

```jsx
$ node app.js
Bloque actual: 44893841
```

En el [explorador de bloques](https://snowtrace.io/accounts) de esta cadena, **podemos consultar las cuentas con más balance**, y en este caso vamos a copiar [la cuarta dirección](https://snowtrace.io/address/0x9Da5812111DCBD65fF9b736874a89751A4F0a2F8) para consultarlo desde el código.

Además, vamos a formatearlo a _ethers_ directamente utilizando otro método de una forma muy similar a como lo haciamos con la libreria [web3](https://docs.web3js.org/api/web3-utils/function/fromWei).

```jsx
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
```

Si ejecutamos este archivo de nuevo, **podemos ver el bloque actual y además el balance que tiene esta dirección**:

```jsx
$ node app.js
Bloque actual:  44931698
Balance:  3687242.947841756442809948
```

## Lectura de Smart Contracts

Con esta librería también podemos leer datos de un _Smart Contract_, para ponerlo en práctica, vamos a crear otro archivo llamado `contracts.js` dónde copiaremos las primeras lineas **para instanciar la librería y conectarnos al nodo de Infura**:

```jsx
// Importar librería ethers
// import { ethers } from "ethers";
const { ethers, formatEther } = require("ethers");

// Conexión a Infura
const provider = new ethers.JsonRpcProvider(
  "https://avalanche-mainnet.infura.io/v3/c9bb142b5c1a4b9b86e625c797ebaecd"
);
```

En el [explorador de bloques](https://snowtrace.io/tokens-nft) otra vez, podemos consultar los [tokens NFT con más volumen en esta red](https://snowtrace.io/tokens-nft). En este caso, vamos a entrar en [AvaxBirds](https://snowtrace.io/address/0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8) y aquí podemos ver las **transacciones**, los **holders**, el **inventario de los tokens** y el **contrato**.

En esta [sección](https://snowtrace.io/address/0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8/contract/43114/code) podemos ver con mucho detalle como está programado el contrato inteligente, **incluyendo sus librerías y utilidades**.

Un poco más abajo veremos el _ABI_, que es como resumir todo el código del contrato en un archivo _JSON_ para que lo podamos utilizar.

Como hay tantas líneas de código para el ABI, **vamos a copiar a mano solo 4 funciones básicas para aprender a consultar datos de un token NFT**:

```jsx
// Funciones ABI que queremos consultar
const ERC721_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];
```

Para poder instanciarlo tenemos que crear un nuevo objeto [Contract](https://docs.ethers.org/v6/getting-started/#starting-contracts) dónde vamos a indicar **la dirección dónde se encuentra**, el **ABI** y ya que de momento solo vamos a leer datos:

```jsx
// Dirección del contrato:
// https://snowtrace.io/address/0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8
const address = "0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8";

// Instancia del contrato
const contract = new ethers.Contract(address, ERC721_ABI, provider);
```

Si queremos consultar datos, **tenemos que volver a crear la función asíncrona** `main()`.

```jsx
// Función asíncrona
const main = async () => {};

main();
```

Dentro de este bloque, vamos a llamar a las funciones para consultar el **nombre, símbolo y totalSupply**.

Además, vamos a [buscar](https://snowtrace.io/token/0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8/balances?chainId=43114) quien es la [dirección](https://snowtrace.io/address/0xb650599eed33603E3E8cC77Ff412c18366d50b3A/tokentxns?tokenAddresses=0x69d2cc5CDd7e2A5F630C73CdFd23bF0071b7dBF8) que tiene más _tokens_ y la vamos a guardar en una variable también.

Consultaremos cuántos _tokens_ tiene utilizando la función `balanceOf` y por último **imprimiremos por pantalla el resultado de todas las consultas**.

```jsx
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
```

Ahora si ejecutamos este archivo, nos devolverá el resultado completo:

```jsx
node contracts.js
El mayor holder de la colección NFT AvaxBirds es 0xb650599eed33603E3E8cC77Ff412c18366d50b3A y tiene un total de 427 AVXB de un total de 10000
```

## Firmar transacciones

Con esta librería **también podemos enviar y firmar transacciones**. Para ponerlo en práctica vamos a iniciar un nodo local con la herramienta `anvil` como hemos visto en [videos anteriores](https://youtu.be/48dcaGfubcI):

```jsx
$ anvil
                             _   _
                            (_) | |
      __ _   _ __   __   __  _  | |
     / _` | | '_ \  \ \ / / | | | |
    | (_| | | | | |  \ V /  | | | |
     \__,_| |_| |_|   \_/   |_| |_|

    0.2.0 (42da942 2024-03-16T00:15:08.124289951Z)
    https://github.com/foundry-rs/foundry

Available Accounts
==================

(0) 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000.000000000000000000 ETH)
(1) 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000.000000000000000000 ETH)
(2) 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000.000000000000000000 ETH)
(3) 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000.000000000000000000 ETH)
(4) 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000.000000000000000000 ETH)
(5) 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000.000000000000000000 ETH)
(6) 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000.000000000000000000 ETH)
(7) 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000.000000000000000000 ETH)
(8) 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000.000000000000000000 ETH)
(9) 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000.000000000000000000 ETH)

Private Keys
==================

(0)
(1)
(2)
(3)
(4)
(5)
(6)
(7)
(8)
(9)

Wallet
==================
Mnemonic:          test test test test test test test test test test test junk
Derivation path:   m/44'/60'/0'/0/

Chain ID
==================

31337

Base Fee
==================

1000000000

Gas Limit
==================

30000000

Genesis Timestamp
==================

1715161603

Listening on 127.0.0.1:8545
```

Después, crearemos un nuevo archivo llamado `tx.js` dónde **instanciaremos otra vez la libreria ethers y la conexión al provider**, que en este caso será a nuestra dirección `localhost` por el puerto **8545**:

```jsx
// Importar librería ethers
// import { ethers } from "ethers";
const { ethers, formatEther, parseEther } = require("ethers");

// Conexión a Anvil
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
```

Para que sea más cómodo, vamos a guardar en variables las direcciones públicas que vamos a utilizar:

```jsx
// Direcciones Públicas
const account1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const account2 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
```

Luego, **guardaremos también la clave privada de la primera cuenta** aunque esto **NO es recomendable hacerlo en un entorno de producción**, ya que estaríamos exponiendo nuestros fondos.

Una vez tengamos la clave privada, **podemos instanciar la cartera con el método** `Wallet`:

```jsx
// Clave privada de la cuenta 1
const private1 =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Instanciar wallet
const wallet = new ethers.Wallet(private1, provider);
```

Nuestro **objetivo es mandar una transacción de la cuenta 1 a la cuenta 2**, así que lo primero que vamos a hacer es crear una función **asíncrona** dónde veremos:

- Primero **consultaremos los balances** de ambas cuentas **antes** de enviar la transacción.
- Luego, **crearemos** y enviaremos **la transacción**.
- Imprimimos los **detalles de la transacción** por pantalla.
- Por último, **consultaremos** de nuevo los **balances para verificar que han cambiado**.

```jsx
// Función asíncrona
const main = async () => {
  // Comprobar el balance de la cuenta 1 antes
  const account1BalanceBefore = await provider.getBalance(account1);
  console.log(
    `Account 1 Balance Before: ${formatEther(account1BalanceBefore)} ETH`
  );

  // Comprobar el balance de la cuenta 2 antes
  const account2BalanceBefore = await provider.getBalance(account2);
  console.log(
    `Account 2 Balance Before: ${formatEther(account2BalanceBefore)} ETH`
  );

  // Crear transacción de la cuenta 1 a la cuenta 2
  const tx = await wallet.sendTransaction({
    to: account2,
    value: parseEther("100"),
  });

  // Enviar transacción
  await tx.wait();

  // Ver detalles de la transacción
  console.log(tx);

  // Comprobar el balance de la cuenta 1 después
  const account1BalanceAfter = await provider.getBalance(account1);
  console.log(
    `Account 1 Balance After: ${formatEther(account1BalanceAfter)} ETH`
  );

  // Comprobar el balance de la cuenta 2 después
  const account2BalanceAfter = await provider.getBalance(account2);
  console.log(
    `Account 1 Balance After: ${formatEther(account2BalanceAfter)} ETH`
  );
};

// Llamar a la función principal
main();
```

Si ahora ejecutamos este `script` veremos lo siguiente:

- Primero observamos que **cada cuenta tiene 10.000 ETH**.
- Tardará un poco pero **veremos los detalles de la transacción como el hash, remitente y destinatario** etcétera.
- Por último, **verificamos que el balance de la cuenta 1 ha disminuido 100 ETH y el de la cuenta 2 ha aumentado**.

```jsx
$ node tx.js
Account 1 Balance Before: 10000.0 ETH
Account 2 Balance Before: 10000.0 ETH
TransactionResponse {
  provider: JsonRpcProvider {},
  blockNumber: null,
  blockHash: null,
  index: undefined,
  hash: '0x7d4215421943ae8428a5417d88416308465de4cb62255244a4f65e3c0ce102a6',
  type: 2,
  to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  nonce: 0,
  gasLimit: 21000n,
  gasPrice: undefined,
  maxPriorityFeePerGas: 1000000000n,
  maxFeePerGas: 3000000000n,
  maxFeePerBlobGas: null,
  data: '0x',
  value: 100000000000000000000n,
  chainId: 31337n,
  signature: Signature { r: "0x8599047d39adac504691ba422bce0759b2e74bc1a095a908bb62804fcdd47394", s: "0x3acabfa39e27c54702e90fd1d316bc602c0bfc612df5eb4e3eda21c197c64e62", yParity: 1, networkV: null },
  accessList: [],
  blobVersionedHashes: null
}
Account 1 Balance After: 9899.999958 ETH
Account 2 Balance After: 10100.0 ETH
```

Esta [librería](https://docs.ethers.org/v6/) junto con [web3](https://docs.web3js.org/) son de las más útiles a la hora de trabajar y **crear aplicaciones descentralizadas**, te recomiendo practicar con su documentación ya que es muy interesante y como puedes ver, **se puede hacer de todo**.
