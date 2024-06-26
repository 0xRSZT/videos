# 🚩 Challenge #0: 🎟 Simple NFT Example

<!-- > Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=GPtu2sfh1Q4">
    <img src="https://img.youtube.com/vi/GPtu2sfh1Q4/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p> -->

vamos a comenzar la serie dónde vamos a completar cada desafío que nos propone **Ethereum** en forma de [SpeedRun](https://speedrunethereum.com/).

Lo primero que tenemos que hacer es registrarnos como _builders_ conectando nuestra billetera de _MetaMask_ y firmando la transacción.

Vamos a empezar por el desafío **número cero** dónde vamos a aprender sobre **compilar** y **desplegar** contratos, utilizar una aplicación de **React** como _frontend_ y por último desplegar el contrato a la red **testnet Sepolia** para que sea accesible desde _Internet_.

## Entorno

Antes de comenzar, tenemos que tener instalado [Node.JS](https://nodejs.org/) **versión 18.17** o superior, [Yarn](https://yarnpkg.com/getting-started/install) y [Git](https://git-scm.com/) en nuestro equipo. Para ello instalaremos la versión **LTS** con nuestro [gestor de versiones de Node](https://github.com/nvm-sh/nvm) de la siguiente manera:

```jsx
$ nvm use lts
```

Para instalar `yarn`, simplemente tenemos que introducir este comando que nos da la [documentación oficial](https://yarnpkg.com/getting-started/install), de esta manera habilitaremos el paquete de `yarn` en **Node**.

```jsx
$ corepack enable
```

Una vez tengamos todo instalado, descargaremos el [repositorio](https://github.com/scaffold-eth/se-2-challenges/tree/challenge-0-simple-nft) de _GitHub_ y entraremos en el directorio:

```jsx
$ git clone https://github.com/scaffold-eth/se-2-challenges.git challenge-0-simple-nft

$ cd challenge-0-simple-nft
```

Dentro de este directorio, cambiaremos a la rama de este nivel e instalaremos los paquetes necesarios de `yarn`:

```jsx
$ git checkout challenge-0-simple-nft

$ yarn install
```

Esperamos a que se instalen todos los componentes y cuando termine, iniciamos la **blockchain** local para este proyecto con el siguiente comando:

```jsx
$ yarn chain
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key:

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key:

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key:

Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
Private Key:

Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
Private Key:

Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
Private Key:

Account #6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000 ETH)
Private Key:

Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
Private Key:

Account #8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000 ETH)
Private Key:

Account #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000 ETH)
Private Key:

Account #10: 0xBcd4042DE499D14e55001CcbB24a551F3b954096 (10000 ETH)
Private Key:

Account #11: 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 (10000 ETH)
Private Key:

Account #12: 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a (10000 ETH)
Private Key:

Account #13: 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec (10000 ETH)
Private Key:

Account #14: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 (10000 ETH)
Private Key:

Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
Private Key:

Account #16: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30 (10000 ETH)
Private Key:

Account #17: 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E (10000 ETH)
Private Key:

Account #18: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0 (10000 ETH)
Private Key:

Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
Private Key:

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.
```

De esta forma, podemos desplegar contratos inteligentes sin costes. **En otra terminal, entramos en este mismo directorio y desplegamos el contrato a esta cadena de bloques**.

```jsx
$ yarn deploy
Generating typings for: 18 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 48 typings!
Compiled 20 Solidity files successfully (evm target: london).
deploying "YourCollectible" (tx: 0x364d576dca178e40400c27745a166360778ada56ce81fbe0b1a9924293fa7210)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 1758855 gas
📝 Updated TypeScript contract definition file on ../nextjs/contracts/deployedContracts.ts
```

Para terminar de preparar todo, iniciaremos el _*frontend*_ para esta aplicación con el siguiente comando:

```jsx
$ yarn start
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000

 ✓ Ready in 1680ms
```

Ahora podemos acceder a nuestra aplicación a través de _localhost_ por el puerto `3000`.

## Wallet

Ya tenemos todo preparado para empezar! De momento estamos en la red equivocada así que vamos a cambiar a `HardHat` haciendo clic en el botón que tenemos en la parte superior derecha. Aparecerá una ventana emergente de _MetaMask_ y nos conectaremos a esta red.

Como no tenemos fondos, vamos a solicitar haciendo clic en el botón de al lado.

## Minteo

Una vez tengamos todo listo, vamos a mintear nuestros **NFTs**. Vamos a la sección de My **NFTs** y hacemos clic sobre el botón. Esto subirá los metadatos a **IPFS** y luego nos pedirá una confirmación para que se despliegue el **NFT**.

De esta manera tan sencilla, hemos desplegado un **NFT** a nuestra red local! Lo vamos a hacer más veces para tener una colección con 3 items.

Podemos observar que **cada item tiene sus propios atributos, descripción, dirección del** `owner` y tenemos la posibilidad de transferirlos a otras cuentas.

El contrato se encuentra en nuestro proyecto en la carpeta `packages/hardhat/contracts` y podemos ver que es un contrato típico del estándar _ERC721_ dónde están definidas todas las funciones que podemos utilizar. Vamos a cambiar el nombre y el símbolo a **MyZoo**/**ZOO** para desplegarlo a la red **Testnet de Sepolia**.

## Despliegue

Todo esto está muy bien en local, **¿pero cómo lo subimos la red principal?** Como subirlo a la red principal nos puede costar dinero para pagar las comisiones, vamos a subirlo a la red **testnet de Sepolia**.

Para ello, nos dirigimos a la configuración de `HardHat`, dónde podemos ver que la red por defecto es `localhost`. Más abajo podemos ver todas las redes de pruebas que podemos utilizar. **En este caso vamos a definir la red de Sepolia**.

Para desplegar este contrato, vamos a crear una nueva `wallet` con el siguiente comando:

```jsx
$ yarn generate
👛 Generating new Wallet
📄 Private Key saved to packages/``hardhat``/.env file
🪄 Generated wallet address: 0xF03588EB2977A0E38a2708eB4aa8d4f8F6d4D56F
```

De esta forma, **se ha guardado la clave privada en el directorio de este proyecto** para que la podamos utilizar de una forma muy sencilla.

Como esta cuenta no tiene fondos, **vamos a mandarnos Ethers de pruebas desde otra cuenta**. Para ver el balance de esta cuenta podemos utilizar este comando:

```jsx
$ yarn account

Public address: 0xF03588EB2977A0E38a2708eB4aa8d4f8F6d4D56F

Can't connect to network localhost
-- mainnet -- 📡
   balance: 0
   nonce: 0
-- sepolia -- 📡
   balance: 2
   nonce: 0
```

Ya tenemos todo listo para desplegar este contrato a Sepolia, **así que vamos a utilizar los mismos comandos que antes para compilarlo y desplegarlo a la red**:

```jsx
$ yarn deploy
Nothing to compile
No need to generate any newer typings.
deploying "YourCollectible" (tx: 0x42a486553a65ffc96f12c4a06b5575c74bf360d33808b28bcacded2d8e703cb0)...: deployed at 0x3Ba287e1f87800e283CA2e7B6ef545a3B37F8B6A with 1758855 gas
📝 Updated TypeScript contract definition file on ../nextjs/contracts/deployedContracts.ts
```

Tardará un poco en desplegarse, pero finalmente podemos ver que se ha desplegado correctamente. En el explorador de bloques de Sepolia, podemos ver la [transacción](https://sepolia.etherscan.io/tx/0x42a486553a65ffc96f12c4a06b5575c74bf360d33808b28bcacded2d8e703cb0) y el [contrato](https://sepolia.etherscan.io/address/0x3ba287e1f87800e283ca2e7b6ef545a3b37f8b6a) generado.

## Frontend

Antes de desplegar nuestro _frontend_, tenemos que cambiar la _blockchain_ que va a utilizar, para ello vamos al archivo de configuración de **Next.js** y cambiamos la red a `chains.sepolia`.

Después de editar este archivo, podemos volver a iniciar el _frontend_ de manera local para probar su funcionamiento con el mismo comando:

```jsx
$ yarn start
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000

 ✓ Ready in 2.7s
```

Esta vez, nos dirá que estamos en la red equivocada, así que nos cambiaremos a la red de Sepolia. Vamos a intentar mintear un _NFT_ de nuevo. Esperamos a que se confirme en la Blockchain. En el explorador de bloques podemos ver que se ha creado el nuevo Item!

### Variables de Entorno

Antes de continuar, tenemos que configurar las variables de entorno de [Alchemy](https://www.alchemy.com/) y [Etherscan](https://etherscan.io/) en nuestro proyecto. Para ello nos dirigimos primero al panel de control de **Alchemy** y crearemos una nueva **APP**, y seleccionamos la red de Sepolia. Copiamos la clave y la pegamos en el fichero `.env` de la carpeta `nextjs`.

```jsx
NEXT_PUBLIC_ALCHEMY_API_KEY=<API_KEY>
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
```

Pegaremos la `API_KEY` de la misma manera en el fichero `.env` de `hardhat`.

Además, necesitaremos una clave `API` de **Etherscan** para verificar nuestro contrato más adelante, así que nos crearemos una cuenta si no tenemos y solicitamos una nueva `API_KEY`.

Estas claves las vamos a almacenar en el archivo `.env` de la carpeta `hardhat`:

```jsx
DEPLOYER_PRIVATE_KEY=<PRIVATE_KEY>
ALCHEMY_API_KEY=<API_KEY>
ETHERSCAN_API_KEY=<API_KEY>
```

### Vercel

Por último, vamos a subir este _frontend_ a [Vercel](https://vercel.com/raulsanchezzts-projects) para que sea accesible desde _Internet_, así cualquiera puede utilizar nuestra Aplicación. Lo primero que tenemos que hacer es crearnos una cuenta de **Vercel** y confirmarla.

Una vez tengamos una cuenta en [Vercel](https://vercel.com/raulsanchezzts-projects), vamos a utilizar el siguiente comando para desplegar nuestro proyecto a **vercel**, siguiendo el asistente que nos ofrece.

```jsx
$ yarn vercel
Vercel CLI 32.7.2
? Set up and deploy “~/challenge-0-simple-nft/packages/nextjs”? [Y/n] y
? Which scope do you want to deploy to? raulsanchezzt's projects
? Link to existing project? [y/N] n
? What’s your project’s name? nft-challenge
? In which directory is your code located? ./
Local settings detected in vercel.json:
- Install Command: yarn install
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Development Command: next dev --port $PORT
- Output Directory: Next.js default
? Want to modify these settings? [y/N] n
🔗  Linked to raulsanchezzts-projects/nft-challenge (created .vercel)
🔍  Inspect: https://vercel.com/raulsanchezzts-projects/nft-challenge/Heg4i51WmanWW4xG9wTGBDnyXCwr [2s]
✅  Preview: https://nft-challenge-9apmzqlm3-raulsanchezzts-projects.vercel.app [2s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/raulsanchezzts-projects/nft-challenge/settings
╭──────────────────────────────────────────────────────────╮
│                                                          │
│           Update available! v32.7.2 ≫ v34.2.7            │
│   Changelog: https://github.com/vercel/vercel/releases   │
│         Run `yarn add vercel@latest` to update.          │
│                                                          │
╰──────────────────────────────────────────────────────────╯

```

Indicamos que se va a desplegar el proyecto del directorio actual, en nuestro entorno, no lo vamos a enlazar a ningún proyecto existente y le daremos un nombre.

Esperamos a que se despliegue el proyecto, y cuándo termine, nos proporcionará una dirección `URL` mediante la cuál podremos acceder desde todo _internet_.

Vamos a testear su funcionamiento de nuevo, para ello nos conectamos con nuestra `wallet` de _Metamask_ de nuevo y veremos que ya tenemos un NFT creado, porque lo hemos hecho utilizando esta página desde [localhost](http://localhost) así que vamos a crear un nuevo NFT y veremos que lo podemos hacer sin problemas! Ya hemos creado nuestra aplicación descentralizada para crear nuestra colección de **NFTs**!

## OpenSea

Por último, **también podemos ver esta colección desde las Testnets de** [OpenSea](https://testnets.opensea.io) si nos conectamos con la misma `wallet` con la que hemos minteado los **NFTs**. Aquí podemos listarlos para la venta o transferirlos…

Para entregar este nivel, **tenemos que introducir [la dirección URL de nuestra web en Vercel](https://speedrun-ethereum-0.vercel.app/) y [la dirección del contrato que hemos desplegado en el explorador de bloques de Sepolia](https://sepolia.etherscan.io/address/0xec1c53dcd683cd091435cc9ddfb805c9e74d745c)**.
