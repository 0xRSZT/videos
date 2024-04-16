## 🐱 Crea tu PROPIA MEME COIN en SOLANA | SPL-TOKEN con METABOSS

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=xukTkSUz_H8">
    <img src="https://img.youtube.com/vi/xukTkSUz_H8/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## Metaboss

Lo primero que vamos a hacer es instalar la herramienta [Metaboss](https://metaboss.rs/overview.html) que va a ser nuestro entorno de desarrollo para Solana. Es muy parecido a [Foundry](https://book.getfoundry.sh/) para **Ethereum** como ya vimos en otro [vídeo](https://youtu.be/48dcaGfubcI).

Instalamos las dependencias necesarias:

```jsx
sudo apt install libssl-dev libudev-dev pkg-config
```

Además, descargaremos este paquete del archivo de _Ubuntu_ con el comando `wget`:

```jsx
wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```

Cuando se haya descargado, lo instalamos:

```jsx
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```

Copiamos el comando que nos indica en la [documentación](https://metaboss.rs/installation.html) en nuestra terminal para instalarlo:

```jsx
bash <(curl -sSf https://raw.githubusercontent.com/samuelvanderwaal/metaboss/main/scripts/install.sh)
```

Cuando se haya instalado, podemos ver todas las opciones:

```jsx
$ metaboss
Metaboss 0.41.1
Metaplex NFT 'Swiss Army Knife' tool.

USAGE:
    metaboss [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -l, --log-level <log-level>    Log level [default: off]
    -r, --rpc <rpc>                RPC endpoint url to override using the Solana config or the hard-coded default
    -T, --timeout <timeout>        Timeout to override default value of 90 seconds [default: 90]

SUBCOMMANDS:
    airdrop           Airdrop assets to a list of addresses
    burn              Full Burn an asset
    burn-nft          Full Burn a NFT
    burn-print        Full Burn a print edition NFT
    check             Check specific metadata values for a list of NFTs
    collections       NFT collections commands
    create            Create accounts
    decode            Decode on-chain data into JSON format
    derive            Derive PDAs for various account types
    extend-program    Extend an on-chain program's binary size
    find              Find things
    help              Prints this message or the help of the given subcommand(s)
    mint              Mint new NFTs from JSON files
    parse-errors      Parse Errors commands
    set               Set non-Data struct values for a NFT
    sign              Sign metadata for an unverified creator
    snapshot          Get snapshots of various blockchain states
    transfer          Transfer Metaplex assets
    unverify          Unverify Creators
    update            Update various aspects of NFTs
    uses              NFT uses commands
    verify            Verify Creators
```

## Solana Tools

Una vez hayamos instalado **Metaboss**, también necesitamos tener instaladas las herramientas de la suite de **Solana**, así que copiamos el comando de instalación de la [documentación](https://docs.solanalabs.com/cli/install#use-solanas-install-tool) en nuestra terminal para instalarlas:

```jsx
sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"
```

Verificamos que se ha instalado comprobando la versión:

```jsx
solana --version
```

Ahora, crearemos una nueva _wallet_ para la terminal, indicando la ruta dónde **se va a guardar la clave privada**.

```jsx
solana-keygen new --force --outfile ~/.config/solana/metaboss.json
```

Introducimos una contraseña y veremos la clave pública y **sus frases semillas para esta dirección**.

Si queremos importar esta cuenta a nuestra billetera _Phantom_, solo tenemos que copiar nuestra clave privada:

```jsx
cat ~/.config/solana/metaboss.json
```

En _Phantom_, nos dirigimos a los ajustes > Gestión de Cuentas > Añadir billetera > Importar Clave Privada. Aquí le pondremos un nombre y pegamos la clave privada, desde los corchetes.

### Configuración

Ahora, vamos a consultar nuestra configuración establecida con el siguiente comando:

```jsx
$ solana config get
Config File: /home/raul/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/raul/.config/solana/id.json
Commitment: confirmed
```

En este caso, estamos usando el _RPC_ de la [Devnet](https://solana.com/docs/core/clusters#devnet-endpoint) y un par de claves por defecto. Vamos a cambiarlo a la dirección que hemos creado y al _RPC_ de la [red principal](https://solana.com/docs/core/clusters#mainnet-beta-endpoint) con este comando:

```jsx
$ solana config set --url https://api.mainnet-beta.solana.com --keypair ~/.config/solana/metaboss.json
Config File: /home/raul/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /home/raul/.config/solana/metaboss.json
Commitment: confirmed
```

Ahora, podemos comprobar nuestro balance desde la terminal:

```jsx
solana balance
0 SOL
```

Como no tenemos nada, vamos a enviarnos desde nuestra cuenta principal _0.05 SOL_ por lo menos para poder pagar las comisiones de la red al desplegar los _tokens_.

## Creación del token

### Metadatos

Para comenzar, vamos a subir el **logo** de nuestro _token_ a _IPFS_ para que sea accesible siempre de forma descentralizada. En este caso voy a usar [Pinata](https://www.pinata.cloud/) pero hay muchas otras. Una vez hayamos subido nuestro logo, nos guardamos el identificador que nos dé:

- https://gateway.pinata.cloud/ipfs/QmPQQ8GgR98PzY1zjHKVfFtuVLnUbZJHA2bGrZGL72tvK8

Una vez hayamos subido nuestro logo, crearemos un nuevo archivo _JSON_ llamado `metadata.json` con esta estructura con todos los datos de nuestro _token_, **incluyendo la dirección dónde se encuentra el logo**:

```jsx
{
  "name": "Ghost",
  "symbol": "GHOST",
  "description": "A ghost is the soul or spirit of a dead person or non-human animal that is believed to be able to appear to the living.",
  "image": "https://gateway.pinata.cloud/ipfs/QmPQQ8GgR98PzY1zjHKVfFtuVLnUbZJHA2bGrZGL72tvK8",
  "attributes": [],
  "properties": {
    "files": [
      {
        "uri": "https://gateway.pinata.cloud/ipfs/QmPQQ8GgR98PzY1zjHKVfFtuVLnUbZJHA2bGrZGL72tvK8",
        "type": "image/png"
      }
    ]
  }
}

```

Subiremos este archivo _JSON_ a _IPFS_ desde **Pinata** de la misma forma que antes para que los metadatos sean accesibles de forma descentralizada también.

- https://gateway.pinata.cloud/ipfs/QmdZWhu8BA3dfbyyoqmpmCF4nJ5P6sdARkfQnH8HMNwn7n

### Despliegue

Para poder desplegar este _token_, vamos a crear otro archivo JSON que se llame ghost.json dónde vamos a indicar otra vez el nombre, símbolo y la dirección URI del archivo de Metadatos:

```jsx
{
  "name": "Ghost",
  "symbol": "GHOST",
  "uri": "https://gateway.pinata.cloud/ipfs/"
}
```

Ahora sí, vamos a utilizar este comando para crear nuestro _token_ indicando que va a tener **10 decimales** y el archivo que c**ontiene la dirección URI de los metadatos**.

```jsx
metaboss create fungible --decimals 10 --metadata data/ghost.json
Signature: 52U8maqjhemBv1sZWTubns1mLfFcUZt1yPzNZdEJrSca3RKeJq21aWkgrwfmxxmSeS5LxMvKiHXmFn5jVnkstPSG
Mint: 4m98kQHcu95jAuHzfTi3n9t4wYYNeBgpH2ZbM6ND6e9q
Metadata: BYxhtb9YDUsqSUcwpGu2Ge1mrRVKzCMvZ2CiYEbDb7Ug
```

Este comando nos devolverá el identificador de la transacción dónde se ha creado, l**a dirección de Minteo y la dirección de los Metadatos**. En el explorador de bloques podemos investigar un poco la [creación](https://explorer.solana.com/tx/52U8maqjhemBv1sZWTubns1mLfFcUZt1yPzNZdEJrSca3RKeJq21aWkgrwfmxxmSeS5LxMvKiHXmFn5jVnkstPSG) y la [información](https://explorer.solana.com/address/4m98kQHcu95jAuHzfTi3n9t4wYYNeBgpH2ZbM6ND6e9q) de nuestro _token_, pero por el momento **no hay supply**, es decir no hay _tokens_ en circulación.

### Mint

Para ello tenemos que mintear _tokens_, y en este caso vamos a crear **1000** _tokens_ con este simple comando **indicando la dirección de minteo**.

```jsx
metaboss mint fungible --amount 1000 --mint-address 4m98kQHcu95jAuHzfTi3n9t4wYYNeBgpH2ZbM6ND6e9q
Mint: "4m98kQHcu95jAuHzfTi3n9t4wYYNeBgpH2ZbM6ND6e9q" minted 1000 tokens successfully!
Created in tx: 3gvnezxWDMDyfgLR31bbMYGrdZBA2Z57SwNvVbQvggqStyAexC7qD1PzLwTLcEvQ383K1h8px2fYuFNMAyvhJtma
```

Este comando nos devolverá también el identificador de la transacción dónde se han creado los _tokens_. En el explorador podemos ver otra vez los detalles de la [transacción](https://explorer.solana.com/tx/3gvnezxWDMDyfgLR31bbMYGrdZBA2Z57SwNvVbQvggqStyAexC7qD1PzLwTLcEvQ383K1h8px2fYuFNMAyvhJtma) y además en nuestra billetera, han aparecido los 1000 _tokens_!

Desde _Phantom_, vamos a enviar **10** _tokens_ a otra cuenta para comprobar que está todo bien. Una vez se haya confirmado la [transacción](https://explorer.solana.com/tx/5VHaZBFcnvDPrLbD8weqcoXScQSn2iWc7L5LaDU7vUJonfAEQLnS29N9HNVedCxNJgEYPTr7hXajaQhAiRed4av3) en la **blockchain**, veremos que han aparecido pero no aparece el precio de los _tokens_ porque no tienen valor!

### Liquidez

Para que nuestro _token_ tenga valor, **tenemos que crear una pool de liquidez en algún protocolo de finanzas descentralizadas** como [Orca](https://www.orca.so/), [Raydium](https://raydium.io/swap/) o en este caso vamos a usar [Meteora](https://app.meteora.ag/) ya que me parece el más sencillo.
Antes de empezar, he añadido más fondos para pagar las comisiones y **USDC** para poder hacer una _pool_ de liquidez **con una moneda estable**.

Nos conectamos a esta aplicación con _Phantom_ y vamos a crear una nueva pool que va a tener **50** _tokens_ y **5 dólares**. Además **vamos a establecer el precio** y el porcentaje que se llevará el proveedor de liquidez. Aceptamos y confirmamos la [transacción](https://explorer.solana.com/tx/5HWvQtCvGLcSdcAZXoyzuNPUSnyLDeGY9ycFwg9h7LoxWdG9DDNGEAYDjRgUdFXa5azSfxy3Z8bDLJ8A93dnuzK8).

Puede tardar bastante, ya que ahora mismo la red de solana está un poco saturada pero finalmente ya tenemos la [pool](https://app.meteora.ag/pools/CVM9oA5W6jqcEaUkgYypRYLi1ipLP2GF5LMAxF4KuWU3).

Ahora, con otra cuenta vamos a comprar nuestro propio _token_, es decir, **vamos a depositar 2 dólares para recibir 14 _tokens_**. Aceptamos la [transacción](https://explorer.solana.com/tx/rVJDgvMfLmDFpRRZ14vNJpwajnUtbQAsKFnKBaDML7abbXtEsCc2R3ao9sZCyDPhnMDWtkmnkm5UXxrggQGKBFJ) y esperamos a que se confirme.

Por último, podemos consultar la gráfica de precios desde [Birdeye](https://birdeye.so/token/4m98kQHcu95jAuHzfTi3n9t4wYYNeBgpH2ZbM6ND6e9q/CVM9oA5W6jqcEaUkgYypRYLi1ipLP2GF5LMAxF4KuWU3?chain=solana) o [la terminal de CoinGuecko](https://www.geckoterminal.com/solana/pools/CVM9oA5W6jqcEaUkgYypRYLi1ipLP2GF5LMAxF4KuWU3) dónde nos indica los movimientos que han habido **y el precio actual que es de 14 céntimos**.

---

## ⚠️ Aviso

Este _token_ ha sido creado únicamente para fines educativos. **NO tiene ningún valor y NO** recomiendo comprarlo con el fín de especular.
