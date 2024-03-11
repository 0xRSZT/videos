# Despliega HARDHAT y BLOCKSCOUT en DOCKER

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=dLhxR6pMkdo">
    <img src="https://img.youtube.com/vi/dLhxR6pMkdo/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## HardHat

Antes de comenzar, tenemos que tener [Docker](https://www.docker.com/) instalado, si no has visto el video de las [5 Herramientas que NECESITAS para el DESARROLLO BLOCKCHAIN](https://youtu.be/wZu1gKwz8V8) te recomiendo que lo veas antes que este para estar completamente preparado.

Una vez estemos listos, usaremos este código de `docker-compose` para desplegar nuestra **blockchain personal**:

```solidity
version: "3"

services:
  hardhat:
    image: "ethereumoptimism/hardhat-node:latest"
    container_name: HardHat
    restart: unless-stopped
    ports:
      - 8545:8545
```

En este fichero estamos definiendo la imagen que vamos a usar, en este caso es el nodo de [HardHat](https://hardhat.org/) que nos ofrece [Optimism](https://hub.docker.com/r/ethereumoptimism/hardhat-node) de Ethereum por lo que es bastante segura, el nombre del contenedor y el puerto que vamos a exponer a la red que va a ser el `8545`.

Usamos este comando para desplegar este contenedor de manera desatendida:

```bash
docker compose up -d
```

Esperamos a que se descargue la imagen y se inicie el contenedor. Una vez esté corriendo el contenedor, podemos entrar y ver los `logs` de la misma manera que lo haríamos en nuestra terminal pero al estar en un contenedor de **docker** es más cómodo.

## Metamask

En nuestra _wallet_ de [Metamask](https://metamask.io/), añadiremos una nueva red manualmente dónde indicaremos:

- Nombre de la red: **HardHat Docker**
- Dirección URL de RPC: `http://localhost:8545`
- Identificador de cadena: **31337**
- Símbolo de Moneda: _ETH_
- Dirección del explorador de bloques: `http://localhost:80`

En esta red nuestra _wallet_ no tiene fondos, así que vamos a importar la primera _wallet_ que nos ofrece **HardHat** y veremos que tenemos **10000 ETH**.

```bash
Account 0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

## Explorador de Bloques

Como explorador de bloques vamos a utilizar [Blockscout](https://www.blockscout.com/) ya que nos ofrece el [código](https://github.com/blockscout/blockscout/tree/master/docker-compose) y así tendremos un explorador profesional como el de [Ethereum](https://eth.blockscout.com/) u otras _blockchains_ como [Polygon](https://polygon.blockscout.com/) o [Base](https://base.blockscout.com/).

En el repositorio de [GitHub](https://github.com/blockscout/blockscout/tree/master/docker-compose) de Blockscout encontraremos una carpeta dedicada a [docker-compose](https://github.com/blockscout/blockscout/tree/master/docker-compose) así que la clonamos. Veremos que hay una carpeta para las variables de entorno que podemos modificar, y los servicios que vamos a desplegar.

Para desplegar este explorador de bloques usando nuestra _blockchain_ local de _Hardhat_ utilizaremos el siguiente comando:

```solidity
docker-compose -f hardhat-network.yml up -d
```

**Puede tardar bastante** en descargar las imágenes así que esperamos a que termine…

Cuando termine, podemos acceder al explorador a través del navegador por la dirección `localhost:80`.

Ahora vamos a hacer una transacción desde esta cuenta a otra para comprobar cómo se ve en el explorador. En **Metamask**, enviamos 1 _ether_ a otra cuenta y confirmamos la transacción. Esperamos hasta que se confirme en la blockchain…

En el explorador veremos que se ha creado otro bloque dónde podemos ver los detalles de la transacción. Como el _hash_ de la transacción, el número de bloque, _Timestamp_…

## Despliegue de token

Por último, vamos a desplegar el _token_ **ERC-20** que hicimos en el [video](https://www.youtube.com/watch?v=-VRQEfDNXTqI) anterior, que si no has visto te lo recomiendo mucho. Compilamos el _Smart Contract_ y seleccionamos la red integrada de _Metamask_, que en este caso estamos usando **HardHat Docker**.

Desplegamos el contrato a la red y en el explorador de bloques veremos la transacción dónde se ha ejecutado y todos los detalles de este token. Por el momento solo está la transacción de la creación del contrato.

### Mint

Ahora vamos a **mintear** `100.000` _tokens_ directamente a nuestra wallet ejecutando el método mint en _Remix_. Una vez se haya confirmado la transacción, comprobaremos el supply que ahora es `100.000` _tokens_.

En el explorador, veremos en la transacción que se han creado los _tokens_ y están en a nuestra cuenta. Si queremos importar este contrato a nuestra billetera, hacemos _clic_ en el icono de **Metamask** para agregarlo, de esta forma podemos verlo aquí.

### Enviar

Una vez lo tengamos aquí, vamos a enviar a la cuenta 1, `10.000` _tokens_. Aceptamos la transacción y esperamos a que se confirme en la **Blockchain**. Comprobamos que la transacción se ha ejecutado correctamente.

En este explorador tenemos un listado de los _tokens_ que hay desplegados en la red, en este caso solo está el nuestro así que vamos a ver su página. Al igual que veríamos en [etherscan](https://etherscan.io/) los datos de un _token_, aquí tenemos el _supply_, los **holders** y **todas las transferencias** de este _token_.
