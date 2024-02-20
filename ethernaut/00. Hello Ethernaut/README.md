# Hello Ethernaut

En este primer nivel aprenderemos cómo funciona la plataforma. Lo primero que tendremos que hacer será crear una _wallet_ de [Metamask](https://metamask.io/) en el caso de que no tengamos una aún para poder conectarnos al sitio web y luego abrir la consola del navegador.

En esta consola podemos utilizar funciones como `player` para ver la dirección de nuestra _wallet_ o `await getBalance(player)` para ver la cantidad de fondos que tenemos.

Para limpiar la consola presionamos `CTRL + L` y vemos todos los comandos disponibles con la función `help()`

Otras funciones que podemos utilizar son para ver el contrato principal: `ethernaut` y acceder a sus métodos como al owner: `await ethernaut.owner()`

Si todavía no tenemos _ETH_ de prueba, lo podemos solicitar en un **faucet** como el de [Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) o [Infura](https://www.infura.io/faucet/sepolia).

### ¿Cómo empezamos?

Ahora que sabemos cómo funciona este juego, creamos una nueva instancia del contrato para nosotros y esperaremos a que se despliegue en la _Blockchain_.

Después, inspeccionaremos el contrato utilizando la función `contract`.

Veremos que hay un método llamado info: `await contract.info()` y continuamos jugando:

```jsx
> await  contract.info()
'You will find what you need in info1().'
> await  contract.info1()
'Try info2(), but with "hello" as a parameter.'
await  contract.info2("hello")
'The property infoNum holds the number of the next info method to call.'
> await contract.infoNum()
words:
Array(2)
0:42
> await contract.info42()
'theMethodName is the name of the next method.'
> await contract.theMethodName()
'The method name is method7123949.'
> await contract.method7123949()
'If you know the password, submit it to authenticate().'
```

No sabemos la contraseño de momento, pero hay un método que igual nos la indica:

```jsx
> await contract.password()
'ethernaut0'
```

Ahora que ya sabemos la contraseña, vamos a autenticarnos:

```jsx
> await contract.authenticate("ethernaut0")
```

Por último, entrega el nivel completado y felicidades: ¡Has solucionado tu primer nivel de Ethernaut!
