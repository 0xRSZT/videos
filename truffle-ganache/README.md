# Truffle & Ganache

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=j1vkcTg0XFY">
    <img src="https://img.youtube.com/vi/j1vkcTg0XFY/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## Introducción

[Truffle](https://trufflesuite.com/) es un entorno de desarrollo para hacer pruebas con aplicaciones descentralizadas sobre la blockchain de Ethereum. Esta herramienta nos permite compilar contratos, depurarlos y desplegarlos para ver cómo se comportan en un entorno local.

[Ganache](https://trufflesuite.com/ganache/) por otro lado, es una herramienta que nos permite crear nuestra propia Blockchain personal para poder probar los Smart Contracts en nuestro equipo. Permite que despleguemos nuestros contratos y ver todas las transacciones que vayamos generando.

Podemos utilizarlo desde la terminal por CLI o con una interfaz gráfica.

## Instalación de Truffle (CLI)

Ahora sí, vamos a comenzar instalando la herramienta en la [terminal](https://trufflesuite.com/docs/truffle/how-to/install/). Tenemos que tener instalado [Node.js](https://nodejs.org/en) y el gestor de paquetes [NPM](https://www.npmjs.com/). Instalamos el paquete truffle de forma global:

```jsx
npm install -g truffle
```

Puede que aparezcan unas advertencias durante la instalación y una vez acabe, confirmamos que se ha instalado correctamente consultando la versión:

```jsx
truffle version
```

Ahora podemos ejecutar una blockchain en nuestra terminal de esta manera:

```jsx
ganache;
```

Aquí veremos que se ha desplegado la cadena de bloques en la dirección `localhost` por el puerto **8545** y aparecerán 10 direcciones con sus claves privadas para poder utilizarlas:

```jsx
ganache v7.7.4 (@ganache/cli: 0.8.3, @ganache/core: 0.8.3)
Starting RPC server

Available Accounts
==================
(0) 0x731C8666820bF572f444f5d81236BB416e076096 (1000 ETH)
(1) 0xC10705122A9f4f20Ad08b344Ea89b60C5A6bB4B5 (1000 ETH)
(2) 0xe20756A2dF7b1e36c4DfD89C2624b34162465505 (1000 ETH)
(3) 0x04aA9B218A262b1F29b4B2457b34683AE2f0D056 (1000 ETH)
(4) 0xE3A09e437f421AE5EA141BbeCb8a4976e9D036Cb (1000 ETH)
(5) 0xF2ce7Ab09475B8B448d582eF50B37Df5F3640DF9 (1000 ETH)
(6) 0xbE6E0FE6005D6d9d7414b16Fa5B26acF12557b29 (1000 ETH)
(7) 0x339eaDbc7E232C8bCf5E93f483315712D8bE8a48 (1000 ETH)
(8) 0xd0Cfd3166cb60ed755845A35f56078c8CAc2c4f8 (1000 ETH)
(9) 0xF654Cb40f512dAf61e7046EA7A870660E383b97F (1000 ETH)

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

HD Wallet
==================
Mnemonic:
Base HD Path:  m/44'/60'/0'/0/{account_index}

Default Gas Price
==================
2000000000

BlockGas Limit
==================
30000000

Call Gas Limit
==================
50000000

Chain Id
==================
1337

RPC Listening on 127.0.0.1:8545
```

Para utilizar estas direcciones, tenemos que agregar la red a Metamask **manualmente**.

Le ponemos un nombre, y la dirección `URL` del `RPC` que hemos visto antes. Como identificador de la cadena pondremos el número **1337** y el símbolo de moneda **ETH**.

Añadimos dos wallets de esta red copiando sus claves privadas y probamos a enviar _ether_ de una a otra para ver como se ejecuta en la Blockchain:

```js
Transaction: 0x65dc7b49d87d4df066861eb1e7dd53baaf130d896d2da6945e67f9c057d11730
  Gas usage: 21000
  Block number: 1
  Block time: Wed Feb 07 2024 18:55:32 GMT+0100 (Central European Standard Time)
```

## Instalación de Ganache (GUI)

Ahora vamos a [instalar](https://trufflesuite.com/docs/ganache/quickstart/) la herramienta en nuestro equipo Windows desde su página web oficial. Una vez se haya instalado, crearemos un nuevo _WorkSpace_ de **Ethereum**.

Aparecerá una pantalla que mostrará todos los detalles sobre nuestro servidor y una lista de direcciones de Ethereum con **100 ETH** cada una. Estos _ETHER_ no son de verdad, solo existen en esta instancia de nuestra Blockchain.

En este caso no se ha minado ningún bloque, el identificador de la red y la dirección del RPC es `localhost` por el puerto **7545**.

Vamos a añadir esta red a Metamask de la misma manera que antes, añadimos una red manualmente, introducimos la dirección _URL_ del _RPC_ con el puerto **7545** el identificador de la red **5777** y símbolo **ETH**.

En esta red, la wallet que hemos añadido antes no tendrá fondos, así que vamos a añadir otras dos wallets copiando la **clave privada** desde la interfaz gráfica. También probaremos a mandar _ether_ de una cuenta a otra.

## Tienda de Mascotas web3

Para probar nuestras Blockchains, vamos a desplegar una aplicación descentralizada sobre una [tienda de mascotas](https://trufflesuite.com/guides/pet-shop/#creating-a-truffle-project-using-a-truffle-box). En otra terminal, creamos un nuevo directorio y descargamos la [box](https://trufflesuite.com/boxes/pet-shop/) que nos ofrece truffle para empezar.

```jsx
truffle unbox pet-shop
```

Abrimos un editor de código, en mi caso voy a utilizar Visual Studio Code y veremos los directorios:

- `contracts/`: Contiene los Smart Contracts. Tiene el contrato Migrations.sol que usaremos más adelante.
- `migrations/`: Truffle utiliza un sistema de migración para manejar el despliegue de Smart Contracts. Una migración es un Smart Contract adicional que controla los cambios.
- `test/`: Contiene los tests e en JavaScript y Solidity para nuestros Smart Contracts.
- `truffle-config.js`: Fichero de configuración de Truffle.

Editaremos este último fichero para tener solo una red:

```jsx
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
  },
};
```

Ahora, crearemos un nuevo **Smart Contract** en el directorio `contracts` llamado **Adoption.sol**. En este contrato escribiremos el código para almacenar los _adopters_ en un `array` y dos funciones para adoptar y ver los adopters. Siguiendo el [tutorial oficial](https://trufflesuite.com/guides/pet-shop/#writing-the-smart-contract).

Después de programar el contrato, vamos a compilarlo con **truffle**:

```jsx
truffle compile --network develop --all

Compiling your contracts...
===========================
> Compiling ./contracts/Adoption.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /home/raul/videos/truffle-ganache/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

Una vez lo hayamos compilado y no tengamos errores, vamos a desplegarlo en nuestra blockchain.
Duplicamos el archivo que hay en el directorio `migrations` para migrar el nuevo contrato y lo renombramos a `2_deploy_contracts.js`, editamos el código necesario para desplegar este contrato y ejecutamos este comando para iniciar la migración a la Blockchain.

```jsx
truffle migrate --network develop --all

Compiling your contracts...
===========================
> Compiling ./contracts/Adoption.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /home/raul/videos/truffle-ganache/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

Starting migrations...
======================
> Network name:    'develop'
> Network id:      1707244437116
> Block gas limit: 30000000 (0x1c9c380)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x2e159cef64502524f447814576a300f64730074b496acdefcbc946e363c787a8
   > Blocks: 0            Seconds: 0
   > contract address:    0x83139F2E14A29AB71Aec39D7b59E88Ec64De9f17
   > block number:        3
   > block timestamp:     1707247316
   > account:             0x731C8666820bF572f444f5d81236BB416e076096
   > balance:             999.998585517307054402
   > gas used:            193243 (0x2f2db)
   > gas price:           3.171447162 gwei
   > value sent:          0 ETH
   > total cost:          0.000612859963926366 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000612859963926366 ETH

2_deploy_contracts.js
=====================

   Deploying 'Adoption'
   --------------------
   > transaction hash:    0xce9dc74df596d8a1d8ab02e3fdda2304660c4869a1bb91f570fc4e35fb024c4a
   > Blocks: 0            Seconds: 0
   > contract address:    0x4C2a68326514D684aF3c8F1f5d6f2F5bB63E93fF
   > block number:        5
   > block timestamp:     1707247316
   > account:             0x731C8666820bF572f444f5d81236BB416e076096
   > balance:             999.997829662243865228
   > gas used:            203827 (0x31c33)
   > gas price:           3.01524719 gwei
   > value sent:          0 ETH
   > total cost:          0.00061458878899613 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.00061458878899613 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.001227448752922496 ETH
```

Después, tenemos que instanciar la librería `web3` para poder interactuar con la Blockchain desde _JavaScript_. En el archivo `/src/js/app.js` copiaremos este código:

```jsx
initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },
```

En el mismo archivo, pegamos este código para poder **instanciar** el contrato para que _web3_ sepa cómo interactuar con él:

```jsx
initContract: function () {
    $.getJSON("Adoption.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },
```

Por último, programamos las funciones para marcar los adoptados y consultar los adoptados:

```jsx
markAdopted: function () {
    var adoptionInstance;

    App.contracts.Adoption.deployed()
      .then(function (instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      })
      .then(function (adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel-pet")
              .eq(i)
              .find("button")
              .text("Success")
              .attr("disabled", true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data("id"));

    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed()
        .then(function (instance) {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, { from: account });
        })
        .then(function (result) {
          return App.markAdopted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
```

Finalmente, **iniciamos** el proyecto en nuestro equipo local con este comando:

```jsx
npm run dev
> pet-shop@1.0.0 dev
> lite-server

** browser-sync config **
{
  injectChanges: false,
  files: [ './**/*.{html,htm,css,js}' ],
  watchOptions: { ignored: 'node_modules' },
  server: {
    baseDir: [ './src', './build/contracts' ],
    middleware: [ [Function (anonymous)], [Function (anonymous)] ]
  }
}
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
```

Accedemos a nuestra aplicación en el navegador a través de la dirección `http://localhost:3000` y nos conectamos con nuestra _wallet_ usando la red **Truffle CLI**.

Si intentamos **adoptar** una mascota, tendremos que confirmar la **transacción** que se va a ejecutar. En la terminal podemos observar que se ha ejecutado la transacción rápidamente.

Esto ha causado que en nuestro **Smart Contract** desplegado en la Blockchain se actualice el `array` de _adopters_.

Además en la aplicación, aparecerá la mascota como adoptada y ya no será posible adoptarla otra vez.

En **Metamask**, aparecerá la actividad de la _wallet_ con todas las transacciones que hayamos ejecutado para adoptar.

### Ganache

Si quieremos hacer lo mismo en nuestra _blockchain_ con **interfaz gráfica**, tendremos que editar el archivo `truffle-config.js` y añadir la red.

Después tendremos que **compilar** y **desplegar** los **contratos** de la misma manera en esta _blockchain_.

Una vez hayamos desplegado el contrato en esta otra _blockchain_ podremos iniciar la aplicación de nuevo.

Aquí podemos adoptar mascotas otra vez y consultar las transacciones de manera más grafica.

Cada vez que se ejecuta una transacción se mina un bloque.
