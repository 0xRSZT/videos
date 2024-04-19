# Delegation

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=X1VWUQW675w">
    <img src="https://img.youtube.com/vi/X1VWUQW675w/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Nuestro objetivo en este nivel es convertirnos en el **owner** de la instancia que nos dan. Nos dan varias pistas:

- Primero, tenemos que entender como funciona la función a bajo nivel de solidity llamada [delegatecall](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-and-libraries).
- Métodos _fallback_
- _Identificadores_ de métodos

Vamos a obtener una nueva [instancia](https://sepolia.etherscan.io/tx/0xf4102e55b6fda3d50091a234af51473cef46c21522de9f67acab2714bbf1b6ca) del contrato confirmando la transacción en nuestra billetera de _MetaMask_ y mientras se despliega, investigamos en la documentación las pistas que nos han dado.

## delegatecall

Esta [función](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-and-libraries) a bajo nivel nos permite que un contrato llame a una función de otro contrato y ejecute el código de ese contrato en el contexto del contrato que ha llamado. Esto significa que el contrato que realiza la llamada **`delegatecall`** tiene acceso a todas las variables de estado y a las funciones internas del contrato llamado.

## Método Fallback

El método [fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) es una función especial que **se activa** cuando se envía una transacción a un contrato para una función que no existe o cuando se envía _ether_ directamente al contrato sin especificar una función. Es decir, es una función que se ejecuta cuando el contrato recibe una llamada que no coincide con ninguna función existente en el contrato.

## Identificadores de métodos

Cada función en un contrato, se identifica con un [selector](https://solidity-by-example.org/function-selector/) de función de **4 bytes**. Si queremos llamar a una función a bajo nivel, tenemos que saber su identificador.

## Análisis

El contrato que se ha desplegado es `Delegation`, y como el objetivo es convertirnos en los dueños, nos vamos a centrar en la variable `owner`. Esta variable se establece en el `constructor` a la dirección que ha desplegado el contrato.

También tenemos la función `fallback` que llama al otro contrato con un `delegatecall` y pasándole los datos de la transacción.

En el contrato **Delegate** tenemos la función `pwn()` que cambia el `owner` a la dirección que envíe la transacción. Entonces nos podemos aprovechar de que se está utilizando `delegatecall` para cambiar el `owner` del contrato objetivo utilizando la función de **Delegate**.

## Ataque

Vamos a comenzar con el ataque, y lo primero que vamos a hacer es comprobar quien es el `owner` del contrato:

```jsx
> await contract.owner()
'0x73379d8B82Fda494ee59555f333DF7D44483fD58'
```

Si queremos llamar a la función `pwn()` del contrato **Delegate** a través de la función **fallback**, tenemos que saber **cual es su identificador**. Hay muchas maneras de obtenerlo y en este caso vamos a utilizar la librería `web3` para consultarlo:

```jsx
> web3.eth.abi.encodeFunctionSignature("pwn()");
'0xdd365b8b'
```

Una vez tengamos este identificador, solo queda [enviar](https://sepolia.etherscan.io/tx/0x234196eb51802246ca4d6783eb6f899d8679dd18394247682a7ca585c9ed745f) una transacción al contrato desde nuestra dirección, llamando a la función `pwn()`.

```jsx
> await web3.eth.sendTransaction({from:player, data:"0xdd365b8b", to:instance})
```

De esta forma, se ejecutará la función `fallback`, que llamará a la función `pwn()` del otro contrato para modificar el dueño en este.

Cuando se haya confirmado la transacción, comprobaremos de nuevo quien es el dueño y veremos que ha cambiado a la nuestra.

```jsx
> await contract.owner()
```

Ya podemos [enviar](https://sepolia.etherscan.io/tx/0x0711365845bfab512efcab801724af5bad17a8320140b8289df3ec8867fa4c04) este nivel! Como dice _Ethernaut_, esta función ha sido el vector de ataque de muchos **hackeos**. Ya que estamos diciendole a otro contrato o librería, haz lo que quieras con mi estado o contexto. Uno de los **hackeos** más grandes fué el de la wallet multifirma de [Parity](https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7) dónde se robaron **150.000 Ethers** que ha día de [hoy](https://coinmarketcap.com/es/converter/) serían [más](https://etherscan.io/address/0xb3764761e297d6f121e79c32a65829cd1ddb4d32) de **500 MILLONES DE DÓLARES**.
