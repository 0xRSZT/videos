# 🗺️ web3.js: ¿QUÉ ES Y CÓMO USAR ESTA LIBRERÍA? | DESARROLLO BLOCKCHAIN

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=_IBMr2kJNdM">
    <img src="https://img.youtube.com/vi/_IBMr2kJNdM/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

En este vídeo veremos qué es la librería [Web3](https://web3js.org/) y cómo la podemos utilizar en nuestros proyectos _Blockchain_!

## Prerrequisitos

Antes de comenzar, como siempre, necesitamos tener instalado [Node.js](https://nodejs.org) y su gestor de paquetes [NPM](https://www.npmjs.com/) en nuestro equipo...

## Qué es

[Web3.js](https://docs.web3js.org/) es una **colección de librerías** que nos permite interactuar con un nodo local o remoto de _Ethereum_ o sus redes derivadas. Por ejemplo, podríamos utilizar un nodo local como hemos visto en otros vídeos: **Ganache Truffle, HardHat o Foundry** pero en este caso vamos a conectarnos a un nodo de la red principal utilizando [Infura](https://www.infura.io/).

## Instalación

Para [instalar](https://docs.web3js.org/#installation) esta herramienta en nuestra terminal, utilizaremos este comando de `npm` para instalar la librería:

```jsx
npm install web3
```

Así de sencillo, ahora ya podemos utilizar `web3`.

## Uso

Para usar esta librería, tenemos que abrir una terminal de `node`, dónde podemos ejecutar código en `JavaScript`:

```jsx
$ node
Welcome to Node.js v18.12.1.
Type ".help" for more information.
>
```

Aquí, podemos instanciar `web3` creando una variable llamada `Web3` en mayúscula **que requiera el módulo que acabamos de instalar**, `web3`.

```jsx
> const { Web3 } = require('web3');
undefined
```

Vamos a ver que hay dentro de esta variable:

```js
> Web3
[class Web3 extends Web3Context] {
  version: '4.8.0',
  utils: {
    jsonRpc: {
      isResponseRpcError: [Function: isResponseRpcError],
      isResponseWithResult: [Function: isResponseWithResult],
      isResponseWithError: [Function: isResponseWithError],
      isResponseWithNotification: [Function: isResponseWithNotification],
      isSubscriptionResult: [Function: isSubscriptionResult],
      validateResponse: [Function: validateResponse],
      isValidResponse: [Function: isValidResponse],
      isBatchResponse: [Function: isBatchResponse],
      setRequestIdStart: [Function: setRequestIdStart],
      toPayload: [Function: toPayload],
      toBatchPayload: [Function: toBatchPayload],
      isBatchRequest: [Function: isBatchRequest]
    },
    ethUnitMap: [Getter],
    bytesToUint8Array: [Getter],
    bytesToHex: [Getter],
    hexToBytes: [Getter],
    hexToNumber: [Getter],
    toDecimal: [Getter],
    numberToHex: [Getter],
    fromDecimal: [Getter],
    hexToNumberString: [Getter],
    utf8ToHex: [Getter],
    fromUtf8: [Getter],
    stringToHex: [Getter],
    hexToUtf8: [Getter],
    toUtf8: [Getter],
    utf8ToBytes: [Getter],
    hexToString: [Getter],
    asciiToHex: [Getter],
    fromAscii: [Getter],
    hexToAscii: [Getter],
    toAscii: [Getter],
    toHex: [Getter],
    toNumber: [Getter],
    toBigInt: [Getter],
    fromWei: [Getter],
    toWei: [Getter],
    toChecksumAddress: [Getter],
    toBool: [Getter],
    EventEmitter: [Getter],
    isHexStrict: [Getter],
    isHex: [Getter],
    checkAddressCheckSum: [Getter],
    isAddress: [Getter],
    isBloom: [Getter],
    isInBloom: [Getter],
    isUserEthereumAddressInBloom: [Getter],
    isContractAddressInBloom: [Getter],
    isTopic: [Getter],
    isTopicInBloom: [Getter],
    compareBlockNumbers: [Getter],
    isContractInitOptions: [Getter],
    isNullish: [Getter],
    isDataFormat: [Getter],
    convertScalarValue: [Getter],
    convert: [Getter],
    format: [Getter],
    sha3: [Getter],
    sha3Raw: [Getter],
    keccak256Wrapper: [Getter],
    keccak256: [Getter],
    processSolidityEncodePackedArgs: [Getter],
    encodePacked: [Getter],
    soliditySha3: [Getter],
    soliditySha3Raw: [Getter],
    getStorageSlotNumForLongString: [Getter],
    randomBytes: [Getter],
    randomHex: [Getter],
    padLeft: [Getter],
    padRight: [Getter],
    rightPad: [Getter],
    leftPad: [Getter],
    toTwosComplement: [Getter],
    fromTwosComplement: [Getter],
    mergeDeep: [Getter],
    isPromise: [Getter],
    waitWithTimeout: [Getter],
    pollTillDefinedAndReturnIntervalId: [Getter],
    pollTillDefined: [Getter],
    rejectIfTimeout: [Getter],
    rejectIfConditionAtInterval: [Getter],
    isResponseRpcError: [Getter],
    isResponseWithResult: [Getter],
    isResponseWithError: [Getter],
    isResponseWithNotification: [Getter],
    isSubscriptionResult: [Getter],
    validateResponse: [Getter],
    isValidResponse: [Getter],
    isBatchResponse: [Getter],
    setRequestIdStart: [Getter],
    toPayload: [Getter],
    toBatchPayload: [Getter],
    isBatchRequest: [Getter],
    Web3DeferredPromise: [Getter],
    ChunkResponseParser: [Getter],
    uuidV4: [Getter],
    Eip1193Provider: [Getter],
    SocketProvider: [Getter],
    isUint8Array: [Getter],
    uint8ArrayConcat: [Getter],
    uint8ArrayEquals: [Getter]
  },
  requestEIP6963Providers: [Function: requestEIP6963Providers],
  onNewProviderDiscovered: [Function: onNewProviderDiscovered],
  modules: {
    Web3Eth: [class Web3Eth extends Web3Context],
    Iban: [class Iban] {
      _iso13616Prepare: [Function (anonymous)],
      _parseInt: [Function (anonymous)],
      _mod9710: [Function (anonymous)],
      toAddress: [Function (anonymous)]
    },
    Net: [class Net extends Web3Context],
    ENS: [class ENS extends Web3Context],
    Personal: [class Personal extends Web3Context]
  }
}
```

Aquí podemos ver la **versión** que hemos instalado, **junto con todos sus métodos** que nos ofrece para poder crear nuestra Aplicación Descentralizada.

## Nodo Remoto

Ahora, nos vamos a [Infura](https://www.infura.io/). [Infura](https://www.infura.io/) **nos permite crear un nodo remoto para poder conectarnos a cualquier red compatible** con la `Ethereum Virtual Machine` y hacer consultas a la _Blockchain_.

Una vez nos hayamos creado una cuenta, vamos a crear una nueva `API KEY` llamada **Web3**. Aquí podemos seleccionar todas las redes que queremos consultar con una misma `API KEY`.

En este caso, voy a seleccionar todas las redes principales: _Ethereum_, _Linea_, _Polygon_ etcétera…

Guardamos los cambios y esperamos a que nos aparezca la clave.

Veremos los _endpoints_ de todas las redes, es decir nuestro punto de conexión personal. Esta `API KEY` debería permanecer secreta ya que tenemos un uso limitado pero yo en este caso voy a eliminar este proyecto después así que da igual…

Vamos a copiar la URL de _Ethereum_ y la vamos a almacenar en una variable en nuestra terminal:

```jsx
> const url = "https://mainnet.infura.io/v3/ce1ddfe9d795439fa0bd0dc8c3163088"
undefined
> url
'https://mainnet.infura.io/v3/ce1ddfe9d795439fa0bd0dc8c3163088'
```

### Conexión

Para conectarnos a este nodo remoto desde nuestra terminal con _web3_, v**amos a crear un nuevo objeto pasando como parámetro este proveedor**:

```jsx
> const web3 = new Web3(url)
undefined
```

En esta nueva variable, **podemos ver todos los métodos que podemos utilizar** y que estamos conectados a nuestro nodo remoto:

```jsx
> web3
Web3 {
  _emitter: EventEmitter {
    _events: Events <[Object: null prototype] {}> { CONFIG_CHANGE: [Array] },
    _eventsCount: 1,
    maxListeners: 9007199254740991
  },
  config: {
    handleRevert: false,
    defaultAccount: undefined,
    defaultBlock: 'latest',
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 24,
    transactionPollingInterval: 1000,
    transactionPollingTimeout: 750000,
    transactionReceiptPollingInterval: undefined,
    transactionSendTimeout: 750000,
    transactionConfirmationPollingInterval: undefined,
    blockHeaderTimeout: 10,
    maxListenersWarningThreshold: 100,
    contractDataInputFill: 'data',
    defaultNetworkId: undefined,
    defaultChain: 'mainnet',
    defaultHardfork: 'london',
    defaultCommon: undefined,
    defaultTransactionType: '0x2',
    defaultMaxPriorityFeePerGas: '0x9502f900',
    enableExperimentalFeatures: {
      useSubscriptionWhenCheckingBlockTimeout: false,
      useRpcCallSpecification: false
    },
    transactionBuilder: undefined,
    transactionTypeParser: undefined
  },
  providers: {
    HttpProvider: [class HttpProvider extends Web3BaseProvider],
    WebsocketProvider: [class WebSocketProvider extends SocketProvider]
  },
  _requestManager: Web3RequestManager {
    _emitter: EventEmitter {
      _events: [Events <Complex prototype>],
      _eventsCount: 2,
      maxListeners: 9007199254740991
    },
    _provider: HttpProvider {
      clientUrl: 'https://mainnet.infura.io/v3/ce1ddfe9d795439fa0bd0dc8c3163088',
      httpProviderOptions: undefined
    },
    useRpcCallSpecification: undefined
  },
  _subscriptionManager: Web3SubscriptionManager {
    requestManager: Web3RequestManager {
      _emitter: [EventEmitter],
      _provider: [HttpProvider],
      useRpcCallSpecification: undefined
    },
    registeredSubscriptions: {
      logs: [class LogsSubscription extends Web3Subscription],
      newPendingTransactions: [class NewPendingTransactionsSubscription extends Web3Subscription],
      newHeads: [class NewHeadsSubscription extends Web3Subscription],
      syncing: [class SyncingSubscription extends Web3Subscription],
      pendingTransactions: [class NewPendingTransactionsSubscription extends Web3Subscription],
      newBlockHeaders: [class NewHeadsSubscription extends Web3Subscription]
    },
    tolerateUnlinkedSubscription: false,
    _subscriptions: Map(0) {}
  },
  _wallet: Wallet(0) [
    _accountProvider: {
      create: [Function: createWithContext],
      privateKeyToAccount: [Function: privateKeyToAccountWithContext],
      decrypt: [Function: decryptWithContext]
    },
    _addressMap: Map(0) {},
    _defaultKeyName: 'web3js_wallet'
  ],
  _accountProvider: {
    signTransaction: [Function: signTransactionWithContext],
    create: [Function: createWithContext],
    privateKeyToAccount: [Function: privateKeyToAccountWithContext],
    decrypt: [Function: decryptWithContext],
    recoverTransaction: [Function: recoverTransaction],
    hashMessage: [Function: hashMessage],
    sign: [Function: sign],
    recover: [Function: recover],
    encrypt: [Function: encrypt],
    wallet: Wallet(0) [
      _accountProvider: [Object],
      _addressMap: Map(0) {},
      _defaultKeyName: 'web3js_wallet'
    ],
    privateKeyToAddress: [Function: privateKeyToAddress],
    parseAndValidatePrivateKey: [Function: parseAndValidatePrivateKey],
    privateKeyToPublicKey: [Function: privateKeyToPublicKey]
  },
  utils: {
    jsonRpc: {
      isResponseRpcError: [Function: isResponseRpcError],
      isResponseWithResult: [Function: isResponseWithResult],
      isResponseWithError: [Function: isResponseWithError],
      isResponseWithNotification: [Function: isResponseWithNotification],
      isSubscriptionResult: [Function: isSubscriptionResult],
      validateResponse: [Function: validateResponse],
      isValidResponse: [Function: isValidResponse],
      isBatchResponse: [Function: isBatchResponse],
      setRequestIdStart: [Function: setRequestIdStart],
      toPayload: [Function: toPayload],
      toBatchPayload: [Function: toBatchPayload],
      isBatchRequest: [Function: isBatchRequest]
    },
    ethUnitMap: [Getter],
    bytesToUint8Array: [Getter],
    bytesToHex: [Getter],
    hexToBytes: [Getter],
    hexToNumber: [Getter],
    toDecimal: [Getter],
    numberToHex: [Getter],
    fromDecimal: [Getter],
    hexToNumberString: [Getter],
    utf8ToHex: [Getter],
    fromUtf8: [Getter],
    stringToHex: [Getter],
    hexToUtf8: [Getter],
    toUtf8: [Getter],
    utf8ToBytes: [Getter],
    hexToString: [Getter],
    asciiToHex: [Getter],
    fromAscii: [Getter],
    hexToAscii: [Getter],
    toAscii: [Getter],
    toHex: [Getter],
    toNumber: [Getter],
    toBigInt: [Getter],
    fromWei: [Getter],
    toWei: [Getter],
    toChecksumAddress: [Getter],
    toBool: [Getter],
    EventEmitter: [Getter],
    isHexStrict: [Getter],
    isHex: [Getter],
    checkAddressCheckSum: [Getter],
    isAddress: [Getter],
    isBloom: [Getter],
    isInBloom: [Getter],
    isUserEthereumAddressInBloom: [Getter],
    isContractAddressInBloom: [Getter],
    isTopic: [Getter],
    isTopicInBloom: [Getter],
    compareBlockNumbers: [Getter],
    isContractInitOptions: [Getter],
    isNullish: [Getter],
    isDataFormat: [Getter],
    convertScalarValue: [Getter],
    convert: [Getter],
    format: [Getter],
    sha3: [Getter],
    sha3Raw: [Getter],
    keccak256Wrapper: [Getter],
    keccak256: [Getter],
    processSolidityEncodePackedArgs: [Getter],
    encodePacked: [Getter],
    soliditySha3: [Getter],
    soliditySha3Raw: [Getter],
    getStorageSlotNumForLongString: [Getter],
    randomBytes: [Getter],
    randomHex: [Getter],
    padLeft: [Getter],
    padRight: [Getter],
    rightPad: [Getter],
    leftPad: [Getter],
    toTwosComplement: [Getter],
    fromTwosComplement: [Getter],
    mergeDeep: [Getter],
    isPromise: [Getter],
    waitWithTimeout: [Getter],
    pollTillDefinedAndReturnIntervalId: [Getter],
    pollTillDefined: [Getter],
    rejectIfTimeout: [Getter],
    rejectIfConditionAtInterval: [Getter],
    isResponseRpcError: [Getter],
    isResponseWithResult: [Getter],
    isResponseWithError: [Getter],
    isResponseWithNotification: [Getter],
    isSubscriptionResult: [Getter],
    validateResponse: [Getter],
    isValidResponse: [Getter],
    isBatchResponse: [Getter],
    setRequestIdStart: [Getter],
    toPayload: [Getter],
    toBatchPayload: [Getter],
    isBatchRequest: [Getter],
    Web3DeferredPromise: [Getter],
    ChunkResponseParser: [Getter],
    uuidV4: [Getter],
    Eip1193Provider: [Getter],
    SocketProvider: [Getter],
    isUint8Array: [Getter],
    uint8ArrayConcat: [Getter],
    uint8ArrayEquals: [Getter]
  },
  eth: Web3Eth {
    _emitter: EventEmitter {
      _events: Events <Complex prototype> {},
      _eventsCount: 0,
      maxListeners: 9007199254740991
    },
    config: {
      handleRevert: false,
      defaultAccount: undefined,
      defaultBlock: 'latest',
      transactionBlockTimeout: 50,
      transactionConfirmationBlocks: 24,
      transactionPollingInterval: 1000,
      transactionPollingTimeout: 750000,
      transactionReceiptPollingInterval: undefined,
      transactionSendTimeout: 750000,
      transactionConfirmationPollingInterval: undefined,
      blockHeaderTimeout: 10,
      maxListenersWarningThreshold: 100,
      contractDataInputFill: 'data',
      defaultNetworkId: undefined,
      defaultChain: 'mainnet',
      defaultHardfork: 'london',
      defaultCommon: undefined,
      defaultTransactionType: '0x2',
      defaultMaxPriorityFeePerGas: '0x9502f900',
      enableExperimentalFeatures: [Object],
      transactionBuilder: undefined,
      transactionTypeParser: undefined
    },
    providers: {
      HttpProvider: [class HttpProvider extends Web3BaseProvider],
      WebsocketProvider: [class WebSocketProvider extends SocketProvider]
    },
    _requestManager: Web3RequestManager {
      _emitter: [EventEmitter],
      _provider: [HttpProvider],
      useRpcCallSpecification: undefined
    },
    _subscriptionManager: Web3SubscriptionManager {
      requestManager: [Web3RequestManager],
      registeredSubscriptions: [Object],
      tolerateUnlinkedSubscription: false,
      _subscriptions: Map(0) {}
    },
    _accountProvider: {
      signTransaction: [Function: signTransactionWithContext],
      create: [Function: createWithContext],
      privateKeyToAccount: [Function: privateKeyToAccountWithContext],
      decrypt: [Function: decryptWithContext],
      recoverTransaction: [Function: recoverTransaction],
      hashMessage: [Function: hashMessage],
      sign: [Function: sign],
      recover: [Function: recover],
      encrypt: [Function: encrypt],
      wallet: [Wallet],
      privateKeyToAddress: [Function: privateKeyToAddress],
      parseAndValidatePrivateKey: [Function: parseAndValidatePrivateKey],
      privateKeyToPublicKey: [Function: privateKeyToPublicKey]
    },
    _wallet: Wallet(0) [
      _accountProvider: [Object],
      _addressMap: Map(0) {},
      _defaultKeyName: 'web3js_wallet'
    ],
    ens: ENS {
      _emitter: [EventEmitter],
      config: [Object],
      providers: [Object],
      _requestManager: [Web3RequestManager],
      _subscriptionManager: [Web3SubscriptionManager],
      _accountProvider: [Object],
      _wallet: [Wallet],
      registryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      _registry: [Registry],
      _resolver: [Resolver]
    },
    Iban: [class Iban] {
      _iso13616Prepare: [Function (anonymous)],
      _parseInt: [Function (anonymous)],
      _mod9710: [Function (anonymous)],
      toAddress: [Function (anonymous)]
    },
    net: Net {
      _emitter: [EventEmitter],
      config: [Object],
      providers: [Object],
      _requestManager: [Web3RequestManager],
      _subscriptionManager: [Web3SubscriptionManager],
      _accountProvider: [Object],
      _wallet: [Wallet]
    },
    personal: Personal {
      _emitter: [EventEmitter],
      config: [Object],
      providers: [Object],
      _requestManager: [Web3RequestManager],
      _subscriptionManager: [Web3SubscriptionManager],
      _accountProvider: [Object],
      _wallet: [Wallet]
    },
    Contract: [class ContractBuilder extends Contract],
    abi: {
      encodeEventSignature: [Function: encodeEventSignature],
      encodeFunctionCall: [Function: encodeFunctionCall],
      encodeFunctionSignature: [Function: encodeFunctionSignature],
      encodeParameter: [Function: encodeParameter],
      encodeParameters: [Function: encodeParameters],
      decodeParameter: [Function: decodeParameter],
      decodeParameters: [Function: decodeParameters],
      decodeLog: [Function: decodeLog]
    },
    accounts: {
      signTransaction: [Function: signTransactionWithContext],
      create: [Function: createWithContext],
      privateKeyToAccount: [Function: privateKeyToAccountWithContext],
      decrypt: [Function: decryptWithContext],
      recoverTransaction: [Function: recoverTransaction],
      hashMessage: [Function: hashMessage],
      sign: [Function: sign],
      recover: [Function: recover],
      encrypt: [Function: encrypt],
      wallet: [Wallet],
      privateKeyToAddress: [Function: privateKeyToAddress],
      parseAndValidatePrivateKey: [Function: parseAndValidatePrivateKey],
      privateKeyToPublicKey: [Function: privateKeyToPublicKey]
    }
  }
}
```

## Obtención de Información

Una de las cosas que podemos hacer con esta librería es obtener información así que vamos a ir al **explorador de bloques**, dónde podemos observar las [cuentas](https://etherscan.io/accounts) con mayor balance de _Ethers_. Vamos a meternos en la segunda dirección que corresponde al _Smart Contract_ del [token](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) Wrapped Ether y podemos ver que tiene mucho balance de _ethers_.

Vamos a **copiar la dirección de este contrato** y en la terminal otra vez creamos una variable llamada `token`:

```jsx
> const token = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
undefined
> token
'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
```

Después, vamos a crear una variable llamada `balance` que va a llamar a la librería `web3` y dentro de su método _eth_ > `getBalance` **vamos a pegar la variable que contiene la dirección del contrato**.

```jsx
> const balance = await web3.eth.getBalance(token)
undefined
```

De esta forma, **estamos almacenando el balance de Ethers de este contrato en la variable** `balance` que podemos ver ahora, y nos los devuelve en _wei_:

```jsx
> balance
3064389642728898632706604n
```

Si lo queremos ver expresado en _ethers_, podemos utilizar un método dentro de las utilidades de _web3_ para convertirlo:

```jsx
> web3.utils.fromWei(balance, 'ether')
'3064389.642728898632706604'
```

### Conexión al Smart Contract

Ahora, nos vamos a desplazar a la sección [Contract](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code) **dónde podemos ver el código fuente** y lo que nos interesa a nosotros, el `ABI` **que contiene toda la información del contrato**.

Si tenemos la dirección del contrato y el `ABI`, **podemos acceder a todos sus métodos desde la terminal** utilizando _web3_.

Vamos a copiar el `ABI` y **lo guardamos en una nueva variable**:

```jsx
> const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]
```

Una vez tengamos la dirección y el `ABI` del contrato, **vamos a crear una nueva variable** llamada `contract` **pasándole estos datos como parámetros**:

```jsx
> const contract = new web3.eth.Contract(abi, token)
undefined
```

Una vez hayamos instanciado este contrato, **podemos acceder a sus métodos de esta forma**:

```jsx
> contract.methods
{
  name: [Function (anonymous)],
  'name()': [Function (anonymous)],
  '0x06fdde03': [Function (anonymous)],
  approve: [Function (anonymous)],
  'approve(address,uint256)': [Function (anonymous)],
  '0x095ea7b3': [Function (anonymous)],
  totalSupply: [Function (anonymous)],
  'totalSupply()': [Function (anonymous)],
  '0x18160ddd': [Function (anonymous)],
  transferFrom: [Function (anonymous)],
  'transferFrom(address,address,uint256)': [Function (anonymous)],
  '0x23b872dd': [Function (anonymous)],
  withdraw: [Function (anonymous)],
  'withdraw(uint256)': [Function (anonymous)],
  '0x2e1a7d4d': [Function (anonymous)],
  decimals: [Function (anonymous)],
  'decimals()': [Function (anonymous)],
  '0x313ce567': [Function (anonymous)],
  balanceOf: [Function (anonymous)],
  'balanceOf(address)': [Function (anonymous)],
  '0x70a08231': [Function (anonymous)],
  symbol: [Function (anonymous)],
  'symbol()': [Function (anonymous)],
  '0x95d89b41': [Function (anonymous)],
  transfer: [Function (anonymous)],
  'transfer(address,uint256)': [Function (anonymous)],
  '0xa9059cbb': [Function (anonymous)],
  deposit: [Function (anonymous)],
  'deposit()': [Function (anonymous)],
  '0xd0e30db0': [Function (anonymous)],
  allowance: [Function (anonymous)],
  'allowance(address,address)': [Function (anonymous)],
  '0xdd62ed3e': [Function (anonymous)]
}
```

Podemos ver que tiene los métodos propios de un _token_ **ERC-20**: `transfer`, `balanceOf`, `allowance`…

Por ejemplo, **podemos consultar el nombre** de este _token_ llamando al método `name()`:

```jsx
> await contract.methods.name().call()
'Wrapped Ether'
```

También **podemos ver el símbolo** de la misma manera:

```jsx
> await contract.methods.symbol().call()
'WETH'
```

Otras funciones interesantes es para ver el `totalSupply`, es decir cuántos _tokens_ hay en circulación:

```jsx
> await contract.methods.totalSupply().call()
3067772873663070778364178n
```

Si nos metemos dentro de la página del [token](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) en el explorador de bloques de _Etherscan_, podemos consultar los [holders](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#balances), es decir, aquellas cuentas que tienen más _tokens_ y que porcentaje poseen.

En este caso, **vamos a copiar la primera dirección** y vamos a utilizar el método `balanceOf()` que tenemos en el contrato para comprobar cuántos _tokens_ tiene:

```jsx
> await contract.methods.balanceOf("0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E").call()
530898058636336931334476n
```

Nos devuelve el número sin los decimales, así que **vamos a consultar cuántos decimales tiene** este _token_ utilizando el método `decimals()`:

```jsx
> await contract.methods.decimals().call()
18n
```

Este _token_ **tiene 18 decimales**, así sabemos **por dónde tenemos que cortar** :)

### Otros métodos

Hay muchísimos métodos disponibles como podemos ver en su [documentación](https://docs.web3js.org/guides/web3_eth/methods), por ejemplo **podemos ver el último bloque que se está minando**:

```jsx
> await web3.eth.getBlockNumber()
19731971n
```

Que se correspondería con este [bloque](https://etherscan.io/block/19731971), y además podemos consultar cuantas [transacciones](https://etherscan.io/txs?block=19731971) tiene:

```jsx
> await web3.eth.getBlockTransactionCount(19731971n)
5n
```

También **podríamos consultar toda la información** de una [transacción](https://etherscan.io/tx/0x1e4dc210ab88dea2428f5447863d0c69ce45b5bb577d4411eb56224ffe3eda61) en específico.

```jsx
> await web3.eth.getTransactionReceipt("0x1e4dc210ab88dea2428f5447863d0c69ce45b5bb577d4411eb56224ffe3eda61")
{
  blockHash: '0x9f1b796347b1fca375b85999f3c1c1368c01d68aa9fe145f43ea5c805c2ef16a',
  blockNumber: 19731986n,
  cumulativeGasUsed: 11540172n,
  effectiveGasPrice: 10753725242n,
  from: '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5',
  gasUsed: 22111n,
  logs: [
    {
      address: '0x388c818ca8b9251b393131c08a736a67ccb19297',
      blockHash: '0x9f1b796347b1fca375b85999f3c1c1368c01d68aa9fe145f43ea5c805c2ef16a',
      blockNumber: 19731986n,
      data: '0x0000000000000000000000000000000000000000000000000056f8b25bf8719b',
      logIndex: 341n,
      removed: false,
      topics: [Array],
      transactionHash: '0x1e4dc210ab88dea2428f5447863d0c69ce45b5bb577d4411eb56224ffe3eda61',
      transactionIndex: 141n
    }
  ],
  logsBloom: '0x00000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000',
  status: 1n,
  to: '0x388c818ca8b9251b393131c08a736a67ccb19297',
  transactionHash: '0x1e4dc210ab88dea2428f5447863d0c69ce45b5bb577d4411eb56224ffe3eda61',
  transactionIndex: 141n,
  type: 2n
}
```

Cómo te digo, **hay muchos métodos para ver todos los datos que quieras** y t**e recomiendo jugar un poco para practicar con esta librería**, seguro que encuentras algo interesante.

## Nodo Local

Para ver todas las funcionalidades que nos quedan, **vamos a conectarnos a un nodo local para tener fondos de prueba y no tener que gastar dinero**.

En este caso vamos a usar [anvil](https://book.getfoundry.sh/reference/anvil/), el nodo local que nos ofrece [Foundry](https://book.getfoundry.sh/getting-started/installation) como vimos en otro vídeo. En otra terminal, vamos a ejecutar el siguiente comando para iniciar la _Blockchain_:

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

(0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
(1) 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
(2) 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
(3) 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
(4) 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
(5) 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
(6) 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
(7) 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
(8) 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97
(9) 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

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

1714055457

Listening on 127.0.0.1:8545
```

### Conexión

Para conectarnos a este nodo local desde nuestra terminal con _web3_, vamos volver a crear un nuevo objeto pasando como parámetro la dirección del proveedor local, que es la dirección [localhost](http://localhost) por el puerto **8545**:

```jsx
> const { Web3 } = require('web3');
undefined

> const web3 = new Web3("http://127.0.0.1:8545")
undefined
```

Una vez estemos conectados a nuestro nodo local, **vamos a almacenar en variables las dos primeras direcciones** para que sea más cómodo:

```jsx
> const account1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
undefined

> const account2 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
undefined
```

### Enviar ETH

Antes de intentar [enviar](https://docs.web3js.org/guides/migration_from_other_libs/ethers#sending-transactions) fondos de una cuenta a otra, **vamos a consultar su balance**:

```jsx
> await web3.eth.getBalance(account1)
10000000000000000000000n

> await web3.eth.getBalance(account2)
10000000000000000000000n
```

Podemos ver que cada cuenta tiene **10.000 ETH**. Ahora, con este comando vamos a enviar desde la primera cuenta a la segunda, un total de _100 Ethers_ utilizando las utilidades, ya que necesitamos el valor expresado en _Wei_.

```jsx
> await web3.eth.sendTransaction({from: account1, to: account2, value: web3.utils.toWei("100", "ether")})
{
  transactionHash: '0x22cc052c603b0be5a580760cefcc56fd0f04dadc598f3862c78d99213ca94b14',
  transactionIndex: 0n,
  blockHash: '0x92e8f56a571c780ac0df20274b360782221f7bf1200fd78fc4cac5864cb88c1a',
  blockNumber: 1n,
  cumulativeGasUsed: 21000n,
  gasUsed: 21000n,
  effectiveGasPrice: 3500000000n,
  from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: 1n,
  type: 2n
}
```

Nos devolverá **los detalles de la transacción y si consultamos de nuevo los balances**, veremos que han cambiado:

```jsx
> await web3.eth.getBalance(account1)
9899999926500000000000n

> await web3.eth.getBalance(account2)
10100000000000000000000n
```

Como estamos en un entorno de pruebas, no hemos necesitado la clave privada para firmar la transacción, pero en un entorno real, **tendríamos que firmar la transacción con la clave privada que va a enviar los fondos**.

## Archivos

Pero claro, lo más importante de este tipo de librerías es **incorporarlas a nuestros proyectos de aplicaciones descentralizadas**.

Si queremos utilizar esta librería en nuestro proyecto, vamos a crear un nuevo archivo llamado `app.js` en el mismo directorio dónde hemos instalado este paquete.

En este archivo **instanciaremos la librería de la misma forma que hacíamos en la terminal y después imprimiremos por pantalla el objeto para comprobar que estamos conectados**:

```jsx
// Importamos la librería
const { Web3 } = require("web3");

// Nos conectamos al nodo de Infura
const web3 = new Web3(
  "https://mainnet.infura.io/v3/ce1ddfe9d795439fa0bd0dc8c3163088"
);

// Imprimimos por pantalla el objeto web3 para comprobar que estamos conectados
console.log(web3);
```

Ahora vamos a ejecutar este archivo para comprobar que estamos conectados y poder continuar…

```jsx
node app.js
```

### Utilidades

En este archivo vamos a poner en práctica las [utilidades](https://web3js.readthedocs.io/en/v3.0.0-rc.5/web3-utils.html) que nos ofrece web3, por ejemplo podemos convertir una cadena de caracteres a el formato hash [sha3](https://web3js.readthedocs.io/en/v3.0.0-rc.5/web3-utils.html#sha3):

```jsx
console.log(web3.utils.sha3("Hello World"));
```

Si ejecutamos el archivo de nuevo, podemos ver el resultado:

```jsx
node app.js
0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba
```

En la documentación podemos ver todos los métodos disponibles, para terminar, por ejemplo vamos a ver como funciona el método [isAddress()](https://web3js.readthedocs.io/en/v3.0.0-rc.5/web3-utils.html#isaddress).

Este método **nos permite comprobar si una cadena de caracteres se corresponde con una dirección de Ethereum válida**. Vamos a usarla en nuestro fichero para comprobar si nuestra dirección es válida y otra que no lo sea:

```jsx
// Comprobar que nuestra dirección de Ethereum es válida
console.log(web3.utils.isAddress("0x019805194afAABE04BFE3743b37c274E5415126e"));

// Comprobar una dirección inválida
console.log(web3.utils.isAddress("0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"));
```

Ejecutamos el archivo de nuevo…

```jsx
$ node app.js
0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba
true
false
```

Veremos que nos devuelve el _hash_ otra vez y luego un `true`, ya que es válida y después un `false` porque la siguiente no es una dirección.
