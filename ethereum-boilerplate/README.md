# 🛹 ¿CÓMO SE CREA UNA DAPP?

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=ZlXjuUdBLaA">
    <img src="https://img.youtube.com/vi/ZlXjuUdBLaA/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Vamos a crear nuestra primera Aplicación Descentralizada utilizando una plantilla de **NextJS** que podemos utilizar como base para nuestros proyectos que sean compatibles con la `Ethereum Virtual Machine` o incluso con `Solana`!

Una **Aplicación Descentralizada no es más que una página web que nos permite interactuar con una Blockchain** a través de un proveedor de servicios como **Moralis** y una **Wallet** como pasarela para acceder a nuestros activos en dicha cadena de bloques.

## Preparaciones

Antes de comenzar, nos tenemos que asegurar de que tenemos una **wallet** como **MetaMask** configurada. Además, tenemos que tener instalado _Node.JS_ y su gestor de paquetes `npm` en nuestro sistema para poder desplegar esta **dApp**.

Para poder obtener datos de las **Blockchains**, necesitamos un proveedor. En otros vídeos hemos utilizado _Alchemy_ o _Infura_ pero en este caso vamos a utilizar **Moralis**. Esta plataforma nos permite hacer consultas a muchas **Blockchains** de una manera muy sencilla.

Así que nos dirigimos a su página web y n**os registramos de forma totalmente gratuita**. Una vez nos hayamos creado una cuenta y la hayamos verificado, podemos ver todas las opciones que tenemos, pero que iremos descubriendo en próximos videos.

## Descarga

Ahora, nos dirigimos al [repositorio](https://github.com/ethereum-boilerplate/ethereum-boilerplate) original de este proyecto dónde podemos ver toda su documentación que nos aporta, el código con sus cambios y si tenemos algún problema podemos crear una incidencia para que nos la resuelvan o proponer cambios.

En su documentación podemos ver los pasos que vamos a hacer a continuación para descargar y poner en marcha este proyecto y además nos explica cómo podemos utilizar los diferentes componentes de _Ethereum_ para sacar el balance de _NFTs_, el _balance de Tokens_ de una forma muy sencilla. Lo podemos utilizar como un **framework** que seguro nos ahorrará mucho trabajo y código!

En este caso solo vamos a clonar este repositorio, copiando su dirección de esta manera.

En la terminal, utilizaremos el comando `git clone` para descargar este repositorio directamente a nuestro entorno de trabajo.

```jsx
$ git clone git@github.com:ethereum-boilerplate/ethereum-boilerplate.git
```

Una vez se haya descargado, vamos a entrar a la carpeta con el siguiente comando:

```jsx
$ cd ethereum-boilerplate
```

## Análisis

En nuestro editor de código, podemos ver cómo está hecha esta aplicación. Es muy sencilla, **se divide en páginas que contienen componentes de una forma muy modular**.

Estos componentes se encuentran en la carpeta `src`, dónde podemos observar que se dividen en elementos, módulos, plantillas y utilidades.

## Configuración

Lo último que nos queda hacer para que funcione, es **editar el archivo .env.local**. En este archivo tenemos que introducir nuestra `API_KEY` de la cuenta que hemos creado antes en **Moralis**. Para conseguirla, nos dirigimos a la sección `API Keys` y veremos que solo tenemos una por defecto, así que la copiamos y pegamos en nuestro archivo.

Además, **tenemos que crear un secreto** por lo que vamos a hacer como nos indica, pegando esta dirección web en nuestro navegador **para que nos genere una clave de 64 bits segura**. La pegamos en nuestro archivo y ya estamos listos!

## Despliegue

Para desplegar esta aplicación, lo primero que tenemos que hacer es **instalar los paquetes de Node** con este comando:

```jsx
$ npm install
```

Una vez se hayan instalado todos los paquetes necesarios, **lo desplegaremos con el siguiente comando**:

```jsx
$ npm run dev
```

Tardará un poco en cargar, pero podremos acceder a través de nuestro navegador por la dirección **localhost** y el puerto **3000**.

## Uso

Podemos usar esta aplicación como inicio para cualquier aplicación descentralizada que se nos ocurra ya que tiene integradas muchas funcionalidades como la autenticación de **Moralis**, **presentación de las transacciones**, **transferencias de tokens ERC20**, **NFTs** y soporta muchas cadenas.

Por ejemplo, vamos a conectar nuestra billetera utilizando el botón que tenemos en la parte superior derecha, hacemos _clic_ y firmamos el mensaje para conectarnos.

En la sección de las **transacciones**, podemos ver que aparecen todas las **transacciones** que hemos hecho con esta cuenta en la red _Sepolia_, ya que es con la que estoy conectado. Nos imprimirá por pantalla el _Hash_ de la transacción, el remitente y destinatario de las **transacciones** , el gas usado y la fecha.

Luego, podemos ver las transferencias de tokens **ERC-20** o tokens **NFTs** que nos muestran tanta información como hemos visto anteriormente.

Por último podemos ver todos nuestros balances de estos tokens. Tanto tokens **ERC-20** como **NFTs** que corresponden con tokens **ERC-721** y **ERC-1151**
