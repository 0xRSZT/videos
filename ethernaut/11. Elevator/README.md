# Elevator

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=P79vxrFXcw8">
    <img src="https://img.youtube.com/vi/P79vxrFXcw8/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Este nivel nos dice que **el ascensor no nos dejará llegar a lo más alto del edificio**, así que el objetivo es conseguirlo. Ahora, obtenemos una nueva [instancia](https://sepolia.etherscan.io/tx/0x5b8e03513f439be4e23a6786feeb933f027eb8efd3b42b12365026910627e4ae) del contrato confirmando la transacción en nuestra billetera de _MetaMask_. Mientras se despliega, copiamos el código del contrato y lo pegamos en _Remix_.

## Análisis

Como el objetivo es llegar a la planta más alta, nos centramos en la variable _boolean_ `top` que tenemos que convertir de alguna manera a `true`.

La única **función** que podemos llamar es `goTo()` que recibe como parámetro un número de planta.

Después, para poder establecer la variable `top` a `true`, la **función** del edificio que comprueba si es la última planta en esta **interfaz** tiene que devolver `true`.

Así que llamaremos a esta **función** `goTo()` y para poder pasar esta condición, **primero tiene que devolver** `false` y luego `true`.

## Solución

Vamos a crear un nuevo contrato en este mismo archivo llamado `ElevatorAttack` y guardamos la dirección del contrato como una variable `inmutable`:

```solidity
contract ElevatorAttack {
	Elevator private immutable target;
}
```

Luego, en el `constructor`, estableceremos la dirección del contrato original:

```solidity
constructor(address _target) {
		target = Elevator(_target);
}
```

Ahora, crearemos la función que vamos a usar para _hackear_ el contrato:

En esta función llamaremos a la función `goTo()` con un número cualquiera y nos aseguramos de que es el `top`.

```solidity
function hack() external {
	target.goTo(1);
	require(target.top(), "fail");
}
```

Una vez hayamos llamado a la función `goTo()`, el `msg.sender` será nuestro contrato atacante, y llamará a la función `isLastFloor()` **dos veces**, así que vamos a crear esta función. **Que primero devuelve un** `false` **y después un** `true`.

```solidity
function isLastFloor(uint) external returns (bool) {
	count++;
	return count > 1;
}
```

Para hacer esto, `**creamos una variable contador**`. De esta forma la primera vez que se le llame devolverá un `false` y la segunda vez un `true`.

```solidity
uint private count;
```

## Ataque

Una vez hayamos terminado de programar nuestro contrato, lo compilamos y vamos a [desplegarlo](https://sepolia.etherscan.io/tx/0xb0e91643a871a4f224f8c40719402b0175dcbdeb3c9df4b0ae8806d8abbb2359). Seleccionamos el entorno de **MetaMask** y pegamos la dirección del contrato objetivo. Confirmamos la transacción para crear el contrato en la **Blockchain**.

Ahora que esté desplegado, utilizamos la función `hack()` para [hackear](https://sepolia.etherscan.io/tx/0xdb609ae13de4e87a5942d189d9bfdfcca94342c76b85fe0c7ebcb33f6e9677e4) el contrato confirmando la transacción en **MetaMask**.

Cuando se confirme la transacción, podemos [entregar](https://sepolia.etherscan.io/tx/0x399d427ec51d4ec332733d0ef7a3b403aa847679a8a0aaef2bf4cbdd2fca498a) este nivel como completado.

Como nos indica _Ethernaut_, **es muy importante usar los modificadores de funciones para prevenir que se modifique el estado**. En este caso la función `goTo()` era **pública** y tendría que ser `pure` o `view`.
