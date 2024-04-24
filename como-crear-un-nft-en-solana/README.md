# 🎭 Crea una COLECCIÓN de NFTs en SOLANA desde CERO! | METAPLEX NFT

<!-- > Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=XWN6_ue-PBs">
    <img src="https://img.youtube.com/vi/XWN6_ue-PBs/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p> -->

Vamos crear una colección de _NFTs_ en la red de [Solana](https://solana.com/es) desde cero!

## Prerrequisitos

Antes de comenzar, como siempre, necesitamos tener instalado [Node.js](https://nodejs.org/en) en nuestro equipo...

## Solana

Además, tenemos que tener instaladas la herramientas de terminal de _Solana_. Podemos instalarlas siguiendo la [documentación oficial](https://docs.solanalabs.com/cli/install).

```jsx
$ sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"
```

Consultamos la versión para comprobar que está instalada:

```bash
$ solana --version
solana-cli 1.18.4 (src:356c6a38; feat:3352961542, client:SolanaLabs)
```

Ahora, podemos ver la configuración inicial:

```bash
$ solana config get
Config File: /home/raul/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/raul/.config/solana/id.json
Commitment: confirmed
```

Aquí veremos donde está el fichero de configuración y que estamos conectados a la red de pruebas [Devnet](https://solana.com/docs/core/clusters#devnet-endpoint).

Vamos a crear una nueva [wallet](https://docs.solanalabs.com/cli/wallets/file-system) para la terminal, indicando la ruta dónde se va a guardar la clave privada.

```jsx
solana-keygen new --force --outfile ~/.config/solana/metaplex.json
```

Introducimos una contraseña y **veremos la clave pública** y sus frases semillas para esta dirección.

Una vez hayamos creado la nueva _wallet_, vamos a establecerla como predeterminada en nuestra configuración con este comando:

```jsx
solana config set --keypair ~/.config/solana/metaplex.json
```

Como es una billetera nueva, podemos ver que no tenemos fondos:

```jsx
solana balance
0 SOL
```

Así que vamos a solicitar _SOL_ de pruebas, **para poder pagar las comisiones** con este comando:

```jsx
solana airdrop 1
```

Si queremos importar esta cuenta a nuestra billetera [Phantom](https://phantom.app/), solo tenemos que **copiar nuestra clave privada**:

```jsx
cat ~/.config/solana/metaplex.json
```

En **Phantom**, nos dirigimos a los ajustes > Gestión de Cuentas > Añadir billetera > Importar Clave Privada. Aquí le pondremos un nombre y pegamos la clave privada, desde los corchetes.

Para poder ver nuestros fondos en la red de pruebas de Solana en **Phantom**, tenemos que activar la red _Devnet_, así que nos dirigimos a los ajustes > Ajustes para desarrolladores y **activamos el modo testnet en la red Devnet**.

## Metaplex

También, vamos a necesitar [Metaplex](https://metaplex.com/). [Metaplex](https://developers.metaplex.com/) **es una herramienta diseñada para facilitarnos la creación, venta y manejo de activos digitales, principalmente NFTs**. La utilidad que vamos a utilizar se llama [Sugar](https://developers.metaplex.com/candy-machine/sugar/installation) y la vamos a instalar con el siguiente comando:

```jsx
bash <(curl -sSf https://sugar.metaplex.com/install.sh)
```

## Metadatos

Esta herramienta nos [indica](https://developers.metaplex.com/token-metadata/token-standard#the-non-fungible-standard) que tenemos que crear una carpeta llamada _assets_ **para almacenar las imágenes y sus metadatos de una manera muy especifica**. **Tienen que estar numerados desde el cero y necesitan un archivo que contenga toda la información de la colección NFT**.

En este caso tenemos 4 imágenes en píxeles, junto con sus archivos de metadatos en formato `JSON`. Este archivo de metadatos es un estándar para esta herramienta, dónde estamos indicando el nombre del _NFT_, **el símbolo es a qué colección pertenece, una pequeña descripción, la ruta de su imagen y una lista de atributos**.

Por ejemplo este es el primer _item_, y todos los demás tienen la misma estructura, lo único que cambia son sus datos.

```json
{
  "name": "Camera",
  "symbol": "PXL",
  "description": "A camera is an instrument used to capture and store images and videos, either digitally via an electronic image sensor, or chemically via a light-sensitive material such as photographic film.",
  "image": "0.png",
  "attributes": [
    {
      "trait_type": "Category",
      "value": "Vintage"
    },
    {
      "trait_type": "Resolution",
      "value": "90 mp"
    },
    {
      "trait_type": "Color",
      "value": "Black & White"
    },
    {
      "trait_type": "Noise",
      "value": "None"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "0.png",
        "type": "image/png"
      }
    ],
    "category": "image"
  }
}
```

Además, **necesitamos un archivo con la configuración de la colección**, es decir con su nombre, descripción, símbolo y su propia imagen. Esta estructura es muy similar a la de un item.

```json
{
  "name": "Pixels",
  "symbol": "PXL",
  "description": "The smallest addressable element in a raster image, or the smallest addressable element in a dot matrix display device.",
  "image": "collection.png",
  "attributes": [
    {
      "trait_type": "Category",
      "value": "Animal"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "collection.png",
        "type": "image/png"
      }
    ]
  }
}
```

## Creación

### Validación

Antes de desplegar los _NFTs_, vamos a **verificar que los metadatos están bien** con el siguiente comando:

```jsx
$ sugar validate
[1/1] 🗂  Loading assets
▪▪▪▪▪ Validating 5 metadata file(s)...

Validation complete, your metadata file(s) look good.

✅ Command successful.
```

Si hemos hecho todo bien, nos indicará que los archivos pintan bien.

### Configuración

Ahora, necesitamos un archivo de configuración con todas las opciones de _sugar_, lo podemos crear a mano pero en este caso vamos a utilizar la [herramienta](https://developers.metaplex.com/candy-machine/sugar/commands/config) de terminal que **nos permite seleccionar todas las opciones de forma interactiva**:

```jsx
$ sugar config create
[1/2] 🍬 Sugar interactive config maker

Found metadata file(s) in folder 'assets':
  -> Loading values from file '0.json'

Check out our Candy Machine config docs to learn about the options:
  -> https://developers.metaplex.com/candy-machine/sugar/configuration

✔ Found 4 file pairs in "assets". Is this how many NFTs you will have in your candy machine? · yes
✔ Found symbol "PXL" in your metadata file. Is this value correct? · yes
✔ What is the seller fee basis points? · 10
✔ Do you want to use a sequential mint index generation? We recommend you choose no. · no
✔ How many creator wallets do you have? (max limit of 4) · 1
✔ Enter creator wallet address #1 · 2ba8kzZtNxbvTWHwtfF6mvQ9nTXWLp4ttQjHCPS2ULMP
✔ Enter royalty percentage share for creator #1 (e.g., 70). Total shares must add to 100. · 100
✔ Which extra features do you want to use? (use [SPACEBAR] to select options you want and hit [ENTER] when done) ·
✔ What upload method do you want to use? · Bundlr
✔ Do you want your NFTs to remain mutable? We HIGHLY recommend you choose yes. · yes

[2/2] 📝 Saving config file

Saving config to file: "config.json"

Successfully generated the config file. 🎉

✅ Command successful.
```

En este caso vamos a indicar lo siguiente:

- Hay **4 NFTs**
- El símbolo es `PXL`
- La tarifa del vendedor es del **10 por ciento**
- No vamos a usar un índice para la generación de minteo
- Solo tenemos una _wallet_ del creador
  - Indicamos la dirección de nuestra _wallet_ que hemos creado
- El porcentaje de _royalties_ del creador **1 es del 100%**.
  - **Si hubiese más de un creador se puede dividir hasta sumar 100%**
- No vamos a usar ninguna característica especial
- Vamos a usar el método _Bundlr_ para subir los archivos a **Aerwave**
- Dejamos que los **NFTs se queden mutables**

Todas estas opciones, las podemos ver que se han guardado en el archivo `config.json`.

### Upload

Una vez tengamos todo listo, **vamos a subir los archivos** a _IPFS_ con este simple comando.

```jsx
$ sugar upload
[1/4] 🗂  Loading assets
Found 5 asset pair(s), uploading files:
+--------------------+
| images    |      5 |
| metadata  |      5 |
+--------------------+

[2/4] 🖥  Initializing upload
▪▪▪▪▪ Connected
Funding address:
  -> pubkey: Gh4Su8dV9gpSFaFMLD8mzHwncQEBNwBPH9nQyhj5icLe
  -> lamports: 8558 (◎ 0.000008558)
Signature: 2Cwa6CdM5Vn2HT2t5Y3ZTs6GWK25sBqLmum8LvtnR3Jd2D7jepj7Eg5P9FaAbwUbWgSEp9C8JsjPXB4co49gxzdM

[3/4] 📤 Uploading image files

Sending data: (Ctrl+C to abort)
[00:00:00] Upload successful ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 5/5

[4/4] 📤 Uploading metadata files

Sending data: (Ctrl+C to abort)
[00:00:00] Upload successful ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 5/5

5/5 asset pair(s) uploaded.

✅ Command successful.
```

En nuestro proyecto, se creará un nuevo archivo llamado `cache.json`, dónde **podemos ver las rutas de dónde se han guardado cada NFT** _con sus metadatos_ correspondientes.

### Despliegue

Por último ya, con este comando **lanzaremos nuestros NFTs a la Blockchain** en forma de _Candy Machine_ o **Máquina de caramelos**. Esto significa que tenemos el control, **podríamos crear una aplicación descentralizada para que nuestro público mintease un NFT directamente a su billetera por ejemplo**.

```jsx
$ sugar launch
Starting Sugar launch... 🚀

>>> sugar validate

[1/1] 🗂  Loading assets
▪▪▪▪▪ Validating 5 metadata file(s)...

Validation complete, your metadata file(s) look good.

>>> sugar upload

[1/4] 🗂  Loading assets
Found 5 asset pair(s), uploading files:
+--------------------+
| images    |      0 |
| metadata  |      0 |
+--------------------+

....no files need uploading, skipping remaining steps.

5/5 asset pair(s) uploaded.

>>> sugar deploy

[1/3] 📦 Creating collection NFT for candy machine
Collection mint ID: DQNJReXuSoQZGS57Y4uAu3g45mNnhvxxGmhvJ7vzXVBL

[2/3] 🍬 Creating candy machine
Candy machine ID: 2T6pATgSAYdF6oBbjYb2y3B5YkUfgZrzkjctgkF5WDfR

[3/3] 📝 Writing config lines
Sending config line(s) in 1 transaction(s): (Ctrl+C to abort)
[00:00:02] Write config lines successful ███████████████████████████████████████████████████████████████████████████████████████████████████████ 1/1

>>> sugar verify

[1/2] 🍬 Loading candy machine
▪▪▪▪▪ Completed

[2/2] 📝 Verification
Verifying 4 config line(s): (Ctrl+C to abort)
[00:00:01] Config line verification successful █████████████████████████████████████████████████████████████████████████████████████████████████ 4/4

Verification successful. You're good to go!

See your candy machine at:
  -> https://www.solaneyes.com/address/2T6pATgSAYdF6oBbjYb2y3B5YkUfgZrzkjctgkF5WDfR?cluster=devnet
```

En nuestra wallet _Phantom_, en la sección de colecciones, a**parecerá solo la portada ya que no hemos minteado ninguno todavía**.

### Mint

Para terminar, **vamos a mintear el primer NFT** directamente a nuestra cuenta con este comando:

```jsx
$ sugar mint
[1/2] 🔍 Loading candy machine
Candy machine ID: 2T6pATgSAYdF6oBbjYb2y3B5YkUfgZrzkjctgkF5WDfR
▪▪▪▪▪ Done

[2/2] 🍬 Minting from candy machine

Minting to Gh4Su8dV9gpSFaFMLD8mzHwncQEBNwBPH9nQyhj5icLe
▹▹▹▹▸ 4 item(s) remaining
Mint: Bw8SebsEJ3pdU4PpbX2S7yZ9xN5zQEGKc2cWxZDMSrYg
▪▪▪▪▪ Mint success

✅ Command successful.
```

En el explorador de bloques, podemos ver la [transacción](https://explorer.solana.com/tx/JuRnJo4kHiiPqCwL3syosVU2qEZFNxpM9W6CSRkfGJbMWGxnQ8sAeq2Qunoc3cYf6QyQHFvAegZZ8ZWWoB5Yp5p?cluster=devnet) **que se ha ejecutado para crear el token y la propia información del token**. Además en _Phantom_, podemos ver que ha aparecido el _NFT_, con su imagen, descripción y propiedades.

De momento solo tenemos uno, si [queremos](https://explorer.solana.com/tx/5XYZEL5pomQaReTesSZdJeHsjPF25tUeHQM6mKsxjLeGpPK2pkGHCmA7Lyx41QtBBKwsmiwxmDcTPnBmf14ox7XJ?cluster=devnet) [mintear](https://explorer.solana.com/tx/4v5bsqGRqzc91P2Z586NiuQQCnhgPc57CKqZdoJhQ2AdGXjmnwkCTZkUdMy37atek7LA8oZCaLhwgvyGRnZ5bsKc?cluster=devnet) [todos](https://explorer.solana.com/tx/56sUCqCUB4mcZC9sWFxZvmdAYfu7ZZ63KzAT7UQDzFKyeCebtqL7AyYeGeRDTDuApBhxQRZrVGHjqtudMKmh8mdU?cluster=devnet), lo podemos indicar en el comando, en este caso solo quedan 3 más:

```jsx
sugar mint -n 3
[1/2] 🔍 Loading candy machine
Candy machine ID: 2T6pATgSAYdF6oBbjYb2y3B5YkUfgZrzkjctgkF5WDfR
▪▪▪▪▪ Done

[2/2] 🍬 Minting from candy machine

Minting to Gh4Su8dV9gpSFaFMLD8mzHwncQEBNwBPH9nQyhj5icLe
[00:00:04] █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 3/3

✅ Command successful.
```

En el explorador de bloques, podemos observar también la página de la [colección](https://explorer.solana.com/address/C7fkm76B696nD1dZSa3K9WRXtjn7Vii7m2g4CjWxNM8Z?cluster=devnet) **con todas sus transacciones** y en la billetera de _Phantom_ veremos también que han aparecido todos los **NFTs**.

Estos **NFTs**, **no los podemos listar a la venta porque estamos en la Devnet** pero sí que podemos [enviarlos](https://explorer.solana.com/tx/8JqupHHYyVWRCiX17D3ubBpbCxFXPbNk8cK2AsmZVbjcqux6J8mcu6HzZoK5ACcTPenEwvA1KdSCpNQbp8MxSCC?cluster=devnet) a cualquier otra dirección.
