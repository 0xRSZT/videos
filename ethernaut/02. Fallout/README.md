# Fallout

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=8QaVQq59cN4">
    <img src="https://img.youtube.com/vi/8QaVQq59cN4/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## Análisis

Lo primero que podemos observar es que la versión de _Solidity_ es antigua, así que es más probable que haya fallos.
El objetivo principal es convertirse en el dueño del contrato así que vamos a centrarnos en esta variable:

```solidity
address payable public owner;
```

Esta variable se establece en la función que viene marcada como `constructor`. En versiones anteriores de Solidity, no existía la palabra reservada para el `constructor` y se utilizaba una función que **debía tener el mismo nombre que el contrato**.

En la función del constructor se asigna el `owner` al `msg.sender` es decir a la persona que despliega el contrato. Vamos a comprobar quien es el `owner` actual:

```jsx
> await contract.owner()
'0x0000000000000000000000000000000000000000'
```

Vaya! No hay ninguna dirección porque **el nombre del constructor y del contrato no coinciden**. No se ha ejecutado el `constructor`! Cualquiera que ejecute esta función se convertirá en el `owner`.

Vamos a llamar a esta función pasando por parámetro el valor de **10** `wei` para convertirnos en el `owner` del contrato!

```jsx
await contract.Fal1out({ value: "10" });
```

Cuándo finalice la transacción, comprobamos de nuevo quién es el `owner` del contrato:

```jsx
await contract.owner();
```

¡Bien! Ahora somos el `owner` del contrato, vamos a entregar el nivel para finalizar.
Este fué un [caso real](https://blog.blockmagnates.com/the-hacking-of-rubixi-smart-contract-23d339213bbe) dónde **Rubixi** cambió de nombre **pero no renombraron** el `constructor` y esto permitió al atacante llamar al `constructor` viejo y proclamarse **owner** para robar los fondos.
