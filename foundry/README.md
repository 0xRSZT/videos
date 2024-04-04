# Foundry

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=48dcaGfubcI">
    <img src="https://img.youtube.com/vi/48dcaGfubcI/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

---

[Foundry](https://github.com/foundry-rs/foundry) es un entorno de desarrollo **Blockchain** nuevo que nos proporciona un **kit de herramientas** para crear e implementar _Smart Contracts_ de una forma muy sencilla desde la línea de comandos. Es muy parecido a otras herramientas que hemos visto como [Truffle Ganache](https://archive.trufflesuite.com/) y [HardHat](https://hardhat.org/).

Una de las mayores ventajas de **Foundry** es su excelente [documentación](https://book.getfoundry.sh/) que nos ofrece para aprender como trabajar con este _framework_.

## Herramientas

Foundry está compuesto de **4 herramientas** de _CLI_:

- [Forge](https://book.getfoundry.sh/forge/): Podemos compilar, testear y desplegar Contratos Inteligentes.
- [Cast](https://book.getfoundry.sh/cast/): Interactuamos con la Blockchain para enviar transacciones.
- [Anvil](https://book.getfoundry.sh/anvil/): Es el nodo local de Ethereum, similar a Ganache o HardHat.
- [Chisel](https://book.getfoundry.sh/chisel/): Es el entorno de programación dónde podemos testear código en Solidity.

## Instalación

Para instalarlo en nuestro equipo, iremos a la [documentación](https://book.getfoundry.sh/getting-started/installation) oficial y copiamos el comando en nuestra terminal:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

## Uso

Para iniciar un nuevo proyecto, creamos una carpeta nueva y este comando para iniciar:

```bash
forge init --force
```

Veremos que se han creado varias carpetas y archivos:

- `lib`: Es nuestra “**librería**” para las dependencias de nuestro proyecto.
- `src`: Aquí tendremos nuestros **Smart Contracts**.
- `test`: Aquí estarán los **Smart Contracts** para hacer los tests.
- `script`: Aquí están los **Smart Contracts** con los _scripts_ de **despliegues**.
- `gitmodules`: Aparecerán los **módulos** que vayamos instalando.
- `foundry.toml`: En este archivo tendremos la configuración de nuestro proyecto tal y como tendríamos el `hardhat.config`

Vamos a analizar los contratos que nos proporciona por defecto:

- El contrato `src/Counter.sol` es un simple **contador** dónde se establece un número que podemos definir con la función `setNumber()` e incrementar con la función `increment()`.
- El contrato `test/Counter.t.sol` son los **tests** para cada función del contrato anterior.
  - Primero se **instancia** el contrato con el valor cero.
  - Luego se testea la función de **incrementar**, llamando a la función para después comprobar que el número es igual a 1.
  - Después se establece un número y **se comprueba si es el mismo.**
- El contrato `script/Counter.s.sol` es para el **despliegue** de nuestro contrato a la _Blockchain_. Aquí se **instancia** el contrato y se utiliza la función `run()` para crear el contrato.

Ahora vamos a compilar todos los contratos con el siguiente comando:

```bash
forge build --force
```

Esto creará dos nuevos directorios:

- `out`: En esta carpeta estarán todos los ABI de los contratos:
- `cache`: En esta carpeta hay un archivo que utiliza forge para solo compilar lo necesario.

## Tests

Una vez hayamos compilado los contratos, vamos a testear que las funciones están programadas correctamente con el siguiente comando:

```jsx
forge test
```

Comprobaremos que hemos pasado las dos pruebas.

## Despliegue

Ya tenemos nuestro contrato compilado y testeado, es hora de desplegarlo a la red. Vamos a iniciar la red local con el comando `anvil`:

```jsx
anvil;
```

Esto creará una Blockchain dónde tendremos 10 cuentas con **10.000 Ethers** cada una. Copiamos la primera clave privada para guardarla como variable de entorno, de esta forma no tenemos que estar copiando y pegando la clave privada.

```jsx
export KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Ahora sí, desplegamos nuestro contrato a la red.

```jsx
forge create --private-key $KEY src/Counter.sol:Counter
```

En el nodo local veremos que se ha migrado el contrato.

```jsx
eth_sendRawTransaction

    Transaction: 0x290a2f1dfaedf20a8e3316567770e23cabe095f50915feb831a824125dcb2fb5
    Contract created: 0x5fbdb2315678afecb367f032d93f642f64180aa3
    Gas used: 106737

    Block Number: 1
    Block Hash: 0x6478b98bc880d0760cf1f7a1a9b46a38d33a610ba6318e125265e874a3b79056
    Block Time: "Mon, 11 Mar 2024 19:29:39 +0000"
```

Vamos a guardar la dirección del contrato en una variable de entorno también:

```jsx
export COUNTER=0x5fbdb2315678afecb367f032d93f642f64180aa3
```

### Cast

Para interactuar con nuestro contrato vamos a usar cast. Primero vamos a consultar que número hay establecido llamando a la variable **number** ya que es una variable **pública**:

```jsx
$ cast call $COUNTER "number()"
0x0000000000000000000000000000000000000000000000000000000000000000
```

Nos devuelve el número cero expresado en hexadecimal, así que vamos a establecer nosotros un número llamando a la función `setNumber()` junto con nuestra clave, ya que vamos a mandar una transacción y la tenemos que firmar.

```jsx
$ cast send $COUNTER "setNumber(uint256)" "8" --private-key $KEY

blockHash               0xb750cac98cf1addc3ba5f56561bc6fb8f3522ff018da4791da4ee9751471081c
blockNumber             2
contractAddress
cumulativeGasUsed       43494
effectiveGasPrice       3875889475
gasUsed                 43494
logs                    []
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
root
status                  1
transactionHash         0x346b5e585acafa27c1fe5c34c967d16dfc3578271b71e854c04c10eff666c785
transactionIndex        0
type                    2
```

Nos devuelve los datos de la transacción. Vamos a volver a consultar que número tiene:

```jsx
$ cast call $COUNTER "number()"
0x0000000000000000000000000000000000000000000000000000000000000008
```

Ha cambiado! Para terminar, vamos a llamar a la otra función para incrementar el número en uno:

```jsx
$ cast send $COUNTER "increment()" --private-key $KEY

blockHash               0x0d1e050e30608edc001bdc1d502cfca6e29700d0ff95a100456a49dd6bfde570
blockNumber             3
contractAddress
cumulativeGasUsed       26304
effectiveGasPrice       3766720757
gasUsed                 26304
logs                    []
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
root
status                  1
transactionHash         0x2ad60c392adc9cec0160ed994d04af05b71d138b56445d5cfe0df200b1ab9aff
transactionIndex        0
type                    2
```

Ahora el número ha aumentado a nueve:

```jsx
$ cast call $COUNTER "number()"
0x0000000000000000000000000000000000000000000000000000000000000009
```

## Token ERC-20

Vamos a programar un nuevo contrato inteligente. Para ello, lo primero que vamos a hacer es, instalar el paquete de [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master) para tener acceso a los contratos:

```bash
forge install Openzeppelin/openzeppelin-contracts
```

Veremos en la carpeta `lib` la nueva dependencia. Ahora, tenemos que crear un archivo llamado `remappings.txt` para indicar a **_forge_** dónde puede encontrar los paquetes:

```jsx
@openzeppelin/=lib/openzeppelin-contracts/
```

De esta forma, cada vez que encuentre `@openzeppelin`, lo buscará en la ruta indicada.

Ahora vamos a desplegar el **token** **ERC-20** que hicimos en otro video. Lo primero que vamos a hacer es crear un archivo llamado _`Token.sol`_ y pegar el código:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor(
        address initialOwner
    ) ERC20("Raul", "RSZT") Ownable(initialOwner) ERC20Permit("Raul") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

Después compilamos los **Smart Contracts** de nuevo:

```solidity
forge build --force
```

Como este contrato espera la dirección del `owner`, vamos a guardar la cuenta en como variable de entorno también.

```jsx
export OWNER=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

Ahora, usamos este comando, dónde indicamos la clave privada, el contrato y le pasamos la dirección del `owner` como argumento al **constructor**:

```jsx
$ forge create --private-key $KEY src/Token.sol:MyToken --constructor-args $OWNER
Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Transaction hash: 0x6560d614ae567194300a73b5aec2bf739095b1ac4142c226915511c90243b023
```

Vamos a guardar la **dirección** del contrato para usarlo ahora:

```jsx
export TOKEN=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Cast

Tal y como hicimos en el otro vídeo, vamos a ver el _supply_ de nuestro _token_:

```jsx
$ cast call $TOKEN "totalSupply()(uint256)"
0
```

Todavía no hay _tokens_ en circulación así que vamos a crear **1.000** usando el método `mint()` indicando la dirección que los va a recibir:

```jsx
cast send $TOKEN "mint(address, uint256)" $OWNER 1000000000000000000000 --private-key $KEY
```

Ahora volvemos a consultar cuántos tokens hay en circulación:

```jsx
$ cast call $TOKEN "totalSupply()(uint256)"
1000000000000000000000
```

Antes de transferir tokens a otra cuenta, vamos a guardar la dirección del destinatario:

```jsx
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

De esta manera, podemos utilizar el método `transfer` del contrato para enviar **10 tokens** a nuestro amigo _Bob_.

```jsx
cast send $TOKEN "transfer(address, uint256)" $BOB 10000000000000000000 --private-key $KEY
```

Ahora comprobamos cuantos _tokens_ tenemos nosotros y **Bob** utilizando el método `balanceOf()`.

```jsx
$ cast call $TOKEN "balanceOf(address)(uint256)" $OWNER
990 000000000000000000

$ cast call $TOKEN "balanceOf(address)(uint256)" $BOB
10 000000000000000000
```
