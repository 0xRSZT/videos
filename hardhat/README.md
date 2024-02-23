# HardHat

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=sFnoDAWJ9oY">
    <img src="https://img.youtube.com/vi/sFnoDAWJ9oY/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

[HardHat](https://hardhat.org/) es un entorno de desarrollo para _Ethereum_. Tiene diferentes componentes que nos permite editar, compilar, depurar y desplegar nuestros _Smart Contracts_ y aplicaciones descentralizadas.

De esta forma los desarrolladores podemos probar nuestro código antes de desplegarlo a la Blockchain de _Ethereum_ o sus derivadas.

Funciona de una manera muy similar a [Truffle](https://trufflesuite.com/) o [Ganache](https://trufflesuite.com/ganache/) como vimos en otro [vídeo](https://youtu.be/GPtu2sfh1Q4?feature=shared), ya que también nos ofrece un nodo **Blockchain local** y más funcionalidades similares.

## Instalación

Para instalar esta herramienta tenemos que tener instalado [Node.js](https://nodejs.org/en) y su gestor de paquetes [NPM](https://www.npmjs.com/). En una carpeta nueva y siguiendo su [documentación](https://hardhat.org/hardhat-runner/docs/getting-started#installation) oficial, pegamos este comando para instalar:

```jsx
npm install --save-dev hardhat
```

Una vez lo tengamos instalado, iniciamos un nuevo proyecto de npm y de **HardHat** con estos comandos:

```jsx
npm init -y

npx hardhat init
```

Nos preguntará que tipo de proyecto queremos crear y en este caso vamos a elegir uno de **JS,** la carpeta raíz del proyecto y si queremos instalar más dependencias, le damos a todo que sí…

Se crearán una carpetas al igual que con _Truffle_ y tendremos una carpeta para los _Smart Contracts_, otra de `scripts` para los despliegues y de _tests_ para probar que todo funciona bien y como debería.

Además en el archivo `hardhat.config.js` tenemos toda la [configuración](https://hardhat.org/hardhat-runner/docs/config) de **HardHat** para este proyecto como las redes, la versión de **Solidity** y las rutas de las carpetas.

## Nodo Local

Al igual que en _Truffle_, podemos iniciar un nodo local en nuestra terminal para generar una blockchain local con una bateria de direcciones con saldo ficticio.

Una vez tengamos este nodo en ejecución vamos a añadir esta red a la configuración de nuestro proyecto editando el archivo `hardhat.config.js`.

```jsx
defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545"
    },
```

## Lock

**HardHat** nos proporciona un contrato inteligente llamado `Lock.sol` como ejemplo. Este contrato permite a un propietario (`owner`) bloquear ciertos fondos hasta una fecha y hora específicas (`unlockTime`).

Para compilar este contrato, utilizaremos el siguiente comando:

```jsx
npx hardhat compile
```

Una vez se haya compilado, comprobaremos que funciona correctamente al ejecutar el **test**:

```jsx
npx hardhat test
```

Por último, para desplegarlo a la red utilizaremos este comando que ejecuta el _script_ de migración:

```jsx
npx hardhat run scripts/deploy.js
```

Si volvemos a la terminal dónde se está ejecutando nuestra _blockchain_, veremos que ha aparecido una nueva transacción que crea el contrato inteligente.

## Consola

Por último, podemos iniciar una [consola](https://hardhat.org/hardhat-runner/docs/guides/hardhat-console) para ejecutar comandos directamente:

```jsx
npx hardhat console
```

Aquí podemos ver la configuración completa de las carpetas, redes y _Solidity_:

```jsx
> config
```

O ver la configuración de otros _plugins_ como [ethers](https://docs.ethers.org/v6/):

```jsx
> ethers
```
