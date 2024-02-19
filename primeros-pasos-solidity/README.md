# ¿Cómo empezar a programar en Solidity?

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=GPtu2sfh1Q4">
    <img src="https://img.youtube.com/vi/GPtu2sfh1Q4/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## Remix IDE

En el editor de código [Remix IDE](https://remix.ethereum.org/), creamos un nuevo espacio de trabajo (workspace) básico y lo nombramos como queramos. Veremos varias carpetas y en este caso, crearemos un nuevo **Smart Contract** en la carpeta `contracts` llamado `4_primeros_pasos.sol`.

## Licencia

En primer lugar, tenemos que indicar la licencia ya que como el código siempre es visible podemos tener problemas legales respecto al _Copyright_ y se indica de esta manera:

```solidity
// SPDX-License-Identifier: MIT
```

## Versión

Ahora, vamos a hablar de la versión, cada _Smart Contract_ debe tener una versión establecida de esta manera:

```jsx
pragma solidity 0.8.24;
```

Esto especifica la versión del compilador y es muy importante. Además también se puede poner un rango de versiones de esta forma:

```jsx
pragma solidity >=0.60 < 0.8.0;
```

Eso significa que cualquier compilador qué esté dentro de este rango va a funcionar el código.

Cada vez que queramos compilar dicho código, tenemos que usar un compilador adecuado para ese código.

Veremos esta sentencia siempre en la primera línea de un contrato inteligente programado en Solidity.

## Comentarios

Solidity, como todos los lenguajes de programación nos permite **escribir comentarios para describir que hace o cómo funciona el código** que escribamos. Podemos comentar una única línea:

```jsx
// Comentario en una misma linea
```

También podemos hacer un comentario en diversas líneas utilizando las barras y asteriscos:

```jsx
/* Comentario
multilinea */
```

Cuándo queremos que se despliegue en producción, existe un formato estándar para los comentarios en _Solidity_ llamado [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html):

```solidity
/// @title <Título del contrato>
/// @author <Autor del contrato>
/// @notice <Explicar lo que hace el contrato>
/// @dev <Detalles adicionales sobre el contrato o función>
/// @param <nombre_parámetro> <Describir para que sirve el parámetro>
/// @return <valor_retorno> <Describir para que sirve el valor de retorno>
```

## Imports

Muchas veces nuestros Smart Contracts pueden necesitar **Importaciones. ¿Por qué?**

Si necesitamos crear un token **NFT** o un **ERC20** o simplemente queremos usar [otros contratos](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master) dentro del nuestro para usar funciones externas. ¿Cómo se importa un Smart Contract? De la siguiente forma:

```solidity
// Punto y barra (./): Mismo directorio
import "./Fallback.sol";
import {<contracts>} from "./Attack.sol";

// Usando un repositorio externo
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```

Este código puede cambiar y puede afectar al contrato que estemos programando. Lo que podemos hacer es **fijar** una versión en específico de esta forma:

```solidity
// Fijar una versión específica
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
```

## Creación de un Smart Contract

Para comenzar a crear un _Smart Contract_ necesitamos un bloque de construcción básico:

```solidity
contract PrimerosPasos {
	...
}
```

Empezaremos por la palabra reservada `contract` y le damos un nombre, sin espacios y lo más simple posible. Dentro de estas llaves, escribiremos todo el código del contrato.

## Herencia

La herencia se basa en **heredar funcionalidades de otros Smart Contracts**. Por ejemplo si tenemos un Contrato inteligente que se encarga de hacer operaciones de sumas, restas, multiplicaciones, divisiones y necesitamos hacer esas operaciones también en otro Smart Contract.

```solidity
contract PrimerosPasos is ERC721 {
	...
}
```

No hace falta copiar y pegar el código, ya que no tendría sentido. Lo que podemos hacer es importarlo como hemos visto antes, o heredarlo. Esta herencia nos va a servir para usar las propias funciones que están en el contrato heredado.

La herencia es algo muy sencillo, útil y lo veremos reflejado en muchos ejemplos.

## Variables

Dentro del _Smart Contract_ podemos definir variables de distintos tipos como ya veremos más adelante. En este caso vamos a definir una variable que almacene la **dirección del dueño del contrato** (`owner`) de esta forma:

```solidity
// Dirección del owner
address public owner;
```

## Constructor

Para acabar, cuando nosotros creemos un _Smart Contract_, normalmente se hace uso de lo que se llama un `constructor` de aquellas variables que vayamos a necesitar para construir dicho contrato. En este caso vamos a utilizar el constructor para definir el **nombre** y **símbolo** del **NFT** mediante parámetros y almacenar la dirección del `owner` con el `msg.sender`.

El `msg.sender` es una función interna que lo que hace es darme la **dirección que está ejecutando dicha función**.

```solidity
constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){
	owner = msg.sender;
}
```

El **constructor es una función especial que solo se puede usar una vez en cada contrato**. Esta función se ejecuta una vez al desplegarse a la red. Por ejemplo para indicar cuál es el nombre del _NFT_ o del token _ERC20_, cuántos _tokens_ queremos crear, quién es el dueño del contrato… etc.

¿Necesito un constructor siempre? La respuesta es **NO**, muchas veces no hace falta y no debemos usarlo, pero en la mayoría de casos sí que va a hacer falta.

## Despliegue

Ya tenemos nuestro primer _Smart Contract_ terminado, vamos a compilarlo para comprobar que todo está bien y a desplegarlo. Seleccionamos la red en la que lo queremos desplegar y la dirección que lo va a desplegar.

Seleccionamos nuestro contrato e introducimos los parámetros que hemos definido antes, un nombre y un símbolo: **Crypto**, **CP**.

Se generará una transacción y veremos que se ha desplegado el contrato dónde podemos interactuar con todas las funciones presentes gracias a la importación y la herencia.
