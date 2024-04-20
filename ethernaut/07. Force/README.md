# Force

<!-- > Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=X1VWUQW675w">
    <img src="https://img.youtube.com/vi/X1VWUQW675w/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p> -->

Este nivel nos dice que **algunos contratos simplemente no aceptarán nuestro dinero**. El objetivo de este nivel es hacer que el b**alance del contrato sea mayor a cero**.

Vamos a crear una nueva [instancia](https://sepolia.etherscan.io/tx/0xc98fb491d32f900ef73be02813a1bcfde1736e726561304f22460b813cf73e70) del contrato confirmando la transacción en nuestra billetera de _MetaMask_. Mientras se despliega, vamos a [investigar](https://docs.soliditylang.org/en/latest/contracts.html#receive-ether-function) sobre cómo podemos enviar dinero a un contrato.

## Recibir Fondos

Hay varias formas por las cuales un contrato puede recibir fondos:

- Si tiene al menos una **función** `payable`
- Si tiene una **función** `receive`
- Si tiene una **función** fallback `payable`
- A través de la **función** `selfdestruct()`

## Análisis

En este caso, podemos ver en el código que **el contrato está vacío**. Es decir, que **no tiene ni siquiera una función**.

La única manera de que este contrato pueda recibir fondos es utilizando la función `selfdestruct()`. Esta [función](https://solidity-by-example.org/hacks/self-destruct/) **nos permite destruir un contrato** y si indicamos una dirección, esta **recibirá los fondos del contrato que se haya destruido**.

Entonces lo que tenemos que hacer es, **crear otro contrato, mandarle fondos y destruirlo** indicando la dirección del contrato objetivo para que reciba dinero.

## Solución

Primero, vamos a crear un **nuevo contrato** en este mismo archivo llamado `Hack`.

```solidity
contract Hack {

}
```

Luego, en el `constructor`, estableceremos la dirección del contrato objetivo como `payable` y el `constructor` también será `payable`.

Además dentro del `constructor`, llamaremos a la función `selftdestruct()` para destruir este contrato **y enviar todos los fondos al contrato objetivo**.

```solidity
constructor(address payable _target) payable {
		selfdestruct(_target);
}
```

De esta forma, lo que estamos haciendo es **desplegar un nuevo contrato y justo después se autodestruirá**.

## Ataque

Una vez hayamos terminado de programar nuestro contrato, **lo compilamos** y vamos a [desplegarlo](https://sepolia.etherscan.io/tx/0x26b16adb479356c15e22fbbcdb34a0e06ec4258933e1315eeee5f662c664050c).
Seleccionamos el entorno de _MetaMask_ e indicamos que **vamos a enviar 1 wei** para que tenga fondos nada más se cree y pegamos la dirección del [contrato objetivo](https://sepolia.etherscan.io/address/0xa4b8cbbbc94c7fc359d6b76775e75a1ebb581d0a).

Después confirmamos la transacción para crear el contrato en la _Blockchain_.

Nada más se haya creado, se ha [destruido](https://sepolia.etherscan.io/address/0x9710040d1ee97aa76ff4e7c8843269033e4360e5#internaltx) **mandando los fondos que tenía al contrato objetivo**.

En el explorador de bloques podemos ver lo que ha pasado en detalle en la [transacción](https://sepolia.etherscan.io/tx/0x26b16adb479356c15e22fbbcdb34a0e06ec4258933e1315eeee5f662c664050c):

- Primero **se ha creado el contrato**.
- Después **se ha enviado 1 wei al contrato objetivo**…
- Por último **se ha destruido el contrato que acabamos de crear**.

Este contrato **no ha durado ni una transacción**!

En el explorador de bloques podemos confirmar que el [contrato objetivo](https://sepolia.etherscan.io/address/0xa4b8cbbbc94c7fc359d6b76775e75a1ebb581d0a) **tiene un balance mayor a cero** por lo que ya podemos [enviar](https://sepolia.etherscan.io/tx/0xd9321c75ddfd1822e741a884d6797a6b14b8b4a24df9bb11e31d0055e3952a69) este nivel!

Como nos dice _Ethernaut_, para que un contrato pueda recibir _ether_, la función `fallback` tiene que ser `payable`. Pero aún así **no hay forma de evitar que un atacante envíe dinero destruyendo otro contrato**.
