# King

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=HjWKmr-Lr9s">
    <img src="https://img.youtube.com/vi/HjWKmr-Lr9s/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Este nivel se trata de un juego simple, **dónde quien mande una cantidad** de _ether_ mayor que la actual **se convierte en el rey**. El rey anterior recibirá la cantidad de _ethers_ que mande el nuevo, **es un juego bastante ponzi**.

Nuestro **objetivo es romper este juego para ganar y que nadie nos pueda superar**. Cuándo entreguemos este nivel, _ethernaut_ intentará proclamarse rey así que **nos tenemos que asegurar que nadie pueda hacerlo después de nosotros**.

Ahora, obtenemos una nueva [instancia](https://sepolia.etherscan.io/tx/0xd5e3033c059d5639f696032f8cc584e35e672b0146d9aeb69bea743adb07d392) del contrato confirmando la transacción en nuestra billetera de _MetaMask_. Mientras se despliega, copiamos el código del contrato y lo pegamos en _Remix_.

## Análisis

En este contrato, podemos ver que **se establecen tres variables**, con **la dirección del rey**, la **cantidad del premio** y la **dirección** del `owner`.

Después, tenemos la función `receive` que se ejecutará al mandar fondos ya que es la función `fallback`, dónde tenemos una **condición**:

- **Mandar más cantidad que el premio actual**
- **O si somos los dueños** del contrato

Si pasamos este requerimiento, **la cantidad se enviará al rey anterior y nos convertiremos en el rey** y el premio cambiará a la cantidad que hayamos enviado.

Por último, tenemos también la función _\_king()_ que n**os permite consultar la dirección del rey actual**.

En el caso de que nos convirtamos en el rey, **¿Cómo podemos evitar que nadie nos gane?**

Cómo está usando la función `transfer` para enviar los fondos al rey anterior, **podemos hacer que la dirección del rey actual, deniegue todas las transferencias de entrada**, de esta manera **la ejecución del código fallará** y no podrá ganarnos nadie.

## Solución

Vamos a crear un nuevo contrato en este mismo archivo llamado `KingAttack`. En este contrato, crearemos un `constructor` que va a recibir la dirección del contrato objetivo y será `payable` ya que vamos a mandar fondos.

```solidity
contract KingAttack {
	constructor(address payable target) payable {}
}
```

Dentro del `constructor`, consultaremos el premio actual llamando a la variable pública del contrato y la guardaremos en una variable de tipo `uint`.

Después, crearemos una variable de tipo `boolean` que llamará a la función `fallback` **del contrato con el valor del premio y con una cadena de texto vacía para que se ejecute la función** `fallback`.

Por último, nos aseguraremos de que solo se ejecute una vez.

Para denegar todas las transferencias a este contrato **basta con NO tener ninguna función** `fallback` o `receive`, **de esta manera todas las transacciones entrantes se revertiran**.

```solidity
constructor(address payable target) payable {
		uint prize = King(target).prize();
		(bool ok,) = target.call{value: prize}("");
		require(ok, "llamada fallida");
}
```

Antes de comenzar con el ataque, **vamos a consultar quien es el rey actual desde la consola**:

```jsx
> await contract._king()
0xd5E8BfC33cd71bcf99F000bAA7A2D2Ed4642aed0
```

También, vamos a consultar cual es el premio actual y como nos lo devuelve en `wei`, lo convertimos a **ether** usando la librería **web3**.

```jsx
> balance = await web3.eth.getBalance(instance)
'1000000000000000' // wei

> web3.utils.fromWei(balance, 'ether');
'0.001' // eth
```

## Ataque

Una vez hayamos terminado de programar nuestro contrato, lo compilamos y vamos a desplegarlo. Seleccionamos el entorno de _MetaMask_, con un valor mayor que el premio actual, en este caso voy a poner **1 ETH y pegamos la dirección del contrato objetivo**. Confirmamos la transacción para crear el contrato en la _Blockchain_.

Una vez se haya desplegado el contrato, podemos consultar en el [explorador de bloques](https://sepolia.etherscan.io/tx/0x9c745ad2e64492b19ac27b96a8aa1af14dd1837854321f64e2055aeb41b9859d) que se han transferido los fondos al contrato objetivo.

Vamos a volver a **comprobar quien es el rey** y veremos que ha cambiado:

```jsx
> await contract._king()
0x642233e342122EFaF5869C6302a0e7D3EB080e32
```

Por lo que ya podemos [entregar](https://sepolia.etherscan.io/tx/0xc41eb6f5af70cba8e5fb948587afe41bcb1baf97409a296a4cd00e8e076aa4c2) esta instancia del contrato. _Ethernaut_ intentará proclamarse el rey **pero como nuestro contrato de ataque y el actual rey no acepta transacciones entrantes no va a poder**.
