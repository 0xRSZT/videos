# Cómo crear un token en Solana

Lo primero que tenemos que entender es que no vamos a crear una **CRIPTOMONEDA**, vamos a crear un **TOKEN**. ¿Qué diferencia hay? Una criptomoneda es la moneda **NATIVA** de una **BLOCKCHAIN**, por ejemplo la criptomoneda de Ethereum es el **ETHER** _(\$ETH)_ y para Solana el $SOL pero sobre estas Blockchains podemos crear _tokens_ como vamos a hacer ahora.

## ¿Qué necesitamos?

- Una máquina Linux, como puede ser una máquina virtual, un contenedor de **Docker**, o en mi caso voy a utilizar el subsistema de Linux para Windows (WSL2).
- Una wallet de Solana, como [Phantom](https://phantom.app/) y $SOL para poder pagar las comisiones.

## Wallet de Solana en la terminal

- Primero tenemos que instalar la herramienta de **CLI** de [Solana](https://docs.solana.com/cli/install-solana-cli-tools):

```jsx
sh -c "$(curl -sSfL https://release.solana.com/v1.17.16/install)"
```

- Reiniciamos la terminal y generamos una nueva _wallet_ con el comando:

```jsx
solana-keygen new --force
// 2ba8kzZtNxbvTWHwtfF6mvQ9nTXWLp4ttQjHCPS2ULMP
```

- Introducimos una contraseña y podemos ver dónde se ha guardado el par de claves de nuestra _wallet_ y la dirección de nuestra **CLAVE PÚBLICA**.
- Además, copiaremos las 12 palabras en un lugar seguro por si queremos recuperar esta _wallet_ en algún momento.
- Vemos el balance de nuestra _wallet_ con el comando:

```jsx
solana balance
```

- Como es nueva, no tenemos fondos, así que deberíamos [mandarnos](https://solana.fm/tx/2x4GsLGKdeH93oGpBzHhshunLPzaN7dehr88YohqwyjPMnHjiGvu5NhsHCWvnpSfMEauXtk24iQVoq16EMogBTTw?cluster=mainnet-alpha) algo de $SOL.

### Importar _Wallet_ a **Phantom**

- Si queremos utilizar la _wallet_ que hemos creado desde la _CLI_, en una interfaz gráfica como _Phantom_, podemos imprimir la clave privada que se ha guardado en el equipo.

```jsx
$ cat /home/raul/.config/solana/id.json
```

- Esta clave privada es un grupo de números separados por comas, tenemos que **copiar TODOS** incluyendo los corchetes.
  - Por ejemplo:
    - _[14, 03 … 31, 24]_
- En _Phantom_, añadiremos una nueva _wallet_ con la **clave privada**, le damos un nombre y pegamos los números de antes.
- De esta forma podemos manejar nuestros fondos de una manera más sencilla.

## Instalar Rust

- Actualizamos los paquetes de nuestra máquina Linux:

```jsx
sudo apt update
```

- Instalamos [Rust](https://www.rust-lang.org/learn/get-started) seleccionando la opción por defecto.

```jsx
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Instalar Librerias

- Por último, antes de comenzar a crear el token, es necesario que tengamos estas librerías instaladas en nuestra máquina.

```jsx
sudo apt install libudev-dev libssl-dev pkg-config build-essential
```

## SPL Token

- Siguiendo la [guía](https://spl.solana.com/token#reference-guide) oficial, tenemos que instalar la utilidad **CLI** para crear _tokens_ _SPL_:

```jsx
cargo install spl-token-cli
```

- La configuración de _spl-token_ es compartida con la _CLI_ de Solana:

```jsx
$ solana config get
Config File: ${HOME}/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: ${HOME}/.config/solana/id.json
```

## Creación del token

- Ahora sí, crearemos un token con este simple comando: _(puede tardar porque se está ejecutando en la Blockchain)_

```jsx
$ spl-token create-token
Creating token EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L
Decimals:  9

Signature: 2xxYmnLQZSVRpYrh6xaQcQTh7p7xyke4NpwQeLJaPm7eRpeL8gLyeHpzDrEP4j2hdLmBvChoWWwYLFxEszyqrbw
```

- Veremos que aparece un identificador del [token](https://solana.fm/address/EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L?cluster=mainnet-alpha) y la [firma](https://solana.fm/tx/2xxYmnLQZSVRpYrh6xaQcQTh7p7xyke4NpwQeLJaPm7eRpeL8gLyeHpzDrEP4j2hdLmBvChoWWwYLFxEszyqrbwY?cluster=mainnet-alpha) del bloque dónde se ha generado. De momento no hay _tokens_ en circulación:

```jsx
$ spl-token supply EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L
0
```

- Ahora que tenemos un _token_, necesitamos una cuenta que pueda tener el balance. Esto [creará](https://solana.fm/tx/8p8tpNrpDDmmVpSB7t2E3BX2Th2HqoCskCfpBtrCFFo5xdsNAdC4YoxYEzog6DKgJ13Ak6pMq1UzBJpLLyx3RjX?cluster=mainnet-alpha) en nuestra _wallet_ una especie de **subcuenta** para este token. Es cómo si en nuestro banco normal y corriente, tenemos un **IBAN** que identifica la cuenta pero podemos tener subcuentas para otras monedas:

```jsx
$ spl-token create-account EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L
Creating account BC67ivXE8NQg73McCLXBuTcBkWM2wZj6NfoqFaM5d2gj

Signature: 8p8tpNrpDDmmVpSB7t2E3BX2Th2HqoCskCfpBtrCFFo5xdsNAdC4YoxYEzog6DKgJ13Ak6pMq1UzBJpLLyx3RjX
```

- **[Minteamos](https://solana.fm/tx/51JrbtRzzSN2FZcULt6fS5cKGRxAz8MHVPQkkQARF57xoQaw2TCUgS1rhiucqUHWxutq6o46CxAxep9N8sNMtagt?cluster=mainnet-alpha)** nuevos _tokens_ que recibirá la cuenta que acabamos de crear:

```jsx
$ spl-token mint EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L 1000000
Minting 1000000 tokens
  Token: EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L
  Recipient: BC67ivXE8NQg73McCLXBuTcBkWM2wZj6NfoqFaM5d2gj

Signature: 51JrbtRzzSN2FZcULt6fS5cKGRxAz8MHVPQkkQARF57xoQaw2TCUgS1rhiucqUHWxutq6o46CxAxep9N8sNMtagt
```

- Ahora podemos ver cuantos _tokens_ existen y cuántos tenemos:

```jsx
$ spl-token supply EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L
1000000

$ spl-token balance EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L
1000000
```

- También podemos ver cuántas **cuentas** tenemos dentro de nuestra _wallet_:

```jsx
$ spl-token accounts
Token                                         Balance
------------------------------------------------------------
EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L  1000000
```

- Ya hemos hecho todo lo necesario desde la terminal, tenemos un millón de _tokens_ en nuestra _wallet_ pero no tienen información. Vamos a cambiarlo!

## Modificar los Metadatos

- Lo primero que tenemos que hacer es crear un logo para nuestro _token_, es recomendable que no pese más de _200KB_ y subirlo a un sitio web público como un repositorio de [GitHub](https://github.com/0xRSZT/videos/tree/main/como-crear-un-token-en-solana), copiamos la **URL** de nuestra [imagen](https://raw.githubusercontent.com/0xRSZT/videos/main/como-crear-un-token-en-solana/logo.png).

- Luego, descargamos este [repositorio](https://github.com/0xRSZT/videos/tree/main) desde la terminal para usar el código:

```jsx
git clone git@github.com:0xRSZT/videos.git
```

- Cambiamos de directorio:

```jsx
cd como-crear-un-token-en-solana
```

- Instalamos las dependencias de [npm](https://www.npmjs.com/) para este proyecto.

```js
npm install
```

- Nos aseguraremos de instalar la dependencia [ts-node](https://typestrong.org/ts-node/docs/installation) de forma **global** para evitar errores:

```jsx
npm install -g ts-node
```

- Antes de ejecutar el archivo `mpl_metadata.ts`, tenemos editar el directorio dónde se encuentra nuestra clave privada y la dirección de nuestro token _(41)_.

- Además, personalizamos los **metadatos** de nuestro _token_, escribiendo un nombre largo y otro breve junto con la dirección **URL** de nuestro logo.

- Una vez hayamos hecho todo esto, estamos preparados para ejecutar el archivo y [modificar](https://solana.fm/tx/3NomdH3Y45e95VVNwxjJsW8JZk9vbKm3A55wN4kzjWznyMjQ77hSWcApGrCDhG2tKD2FEG3LfrNeprGx9Z9hMNoC?cluster=mainnet-alpha) los datos de nuestro _token_ en la Blockchain:

```ts
ts-node mpl_metadata.ts
```

---

[https://app.meteora.ag/pools/HM4J2ce3CwtgZjs4nqbcfmt2ywrsn4DoJL9H46XbYbZ2](https://app.meteora.ag/pools/HM4J2ce3CwtgZjs4nqbcfmt2ywrsn4DoJL9H46XbYbZ2)

[https://birdeye.so/token/EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L?chain=solana](https://birdeye.so/token/EvwA4oHnxqFhAtmNXDxu1wWyzE2R8jesyERxyrzPfT1L?chain=solana)
