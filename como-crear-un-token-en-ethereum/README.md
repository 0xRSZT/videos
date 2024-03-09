# Cómo crear un TOKEN ERC-20 en ETHEREUM DESDE CERO

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=-VRQEfDNXTqI">
    <img src="https://img.youtube.com/vi/-VRQEfDNXTqI/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Un token **ERC-20** no es más que un **Smart Contract** que cuenta con una estructura de datos ya preestablecida para facilitar la implementación de diversas funcionalidades. Todos los _tokens_ siguen un conjunto de reglas comunes que permiten su **intercambio** y **transferencia** entre diferentes proyectos y plataformas que admiten el estándar **ERC-20**. Estas reglas estandarizadas facilitan la interoperabilidad entre _tokens_ y la integración con diversas aplicaciones descentralizadas (_dApps_) y plataformas de intercambio.

Algunas de las funciones básicas que un token ERC-20 debe implementar incluyen la capacidad de **transferir tokens entre direcciones**, **obtener el saldo de un titular de tokens**, y **aprobar o revocar la aprobación de transferencias por parte de terceros**.

## ¿Cómo se crea un ERC-20?

Vamos a usar la **interfaz de programación** que nos ofrece [OpenZeppelin](https://www.openzeppelin.com/). Esta empresa nos proporciona **Smart Contracts seguros y auditados** para que podamos programar usando los estándares o incluso añadir funcionalidades extra.

En su [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts) podemos ver todos los contratos, los de **acceso**, **interfaces**, **seguridad** y _tokens_ entre otros. En este caso vamos a entrar en la carpeta **token**, **ERC20** dónde podemos ver que hay un contrato de ejemplo y otro que corresponde a su **Interfaz** junto con otras **utilidades** y **extensiones**.

## Remix IDE

En vez de copiar y pegar todo el código lo vamos a hacer de una manera mucho más sencilla, nos vamos al editor de código [Remix IDE](https://remix.ethereum.org/) y creamos un nuevo espacio de trabajo, dónde vamos a seleccionar una plantilla de _OpenZeppelin_ para `ERC20`.

Podemos customizar la plantilla dependiendo de las características que queramos añadir a nuestro _token_, en este caso voy a añadir **_Mintable_** y **_Burnable_** para que podamos **crear** y **destruir _tokens_**.

Creamos el entorno y veremos que nuestro **Smart Contract** es muy sencillo ya que se han cargado todas las funcionalidades a base de la herencia de otros contratos.

## Análisis

Vamos a analizar este código, las primeras líneas se corresponden a la licencia de nuestro contrato y la versión de _Solidity_ que vamos a usar para compilarlo.

Después, **se importan varios contratos** como el **estándar**, y **las extensiones** para que se pueda **quemar** y **permitir aprobaciones externas**. Además se importa `Ownable` para poder **definir el dueño del contrato** (`owner`).

Luego, **se define el contrato que hereda todos los demás** que hemos importado y le vamos a cambiar el nombre de _MyToken_ a **0xRSZT**.

Dentro del contrato, se define el `constructor` que recibe como entrada la dirección del dueño y establece el nombre y símbolo. La función `Ownable` recibe la dirección que le hemos dado antes y lo convierte en `**owner**`. Vamos a cambiar aquí el nombre y símbolo de nuestro token **ERC20**.

La última función que tenemos es la de **mintear**. Gracias a esta función podemos crear todos los **tokens** que queramos **siempre que seamos los dueños**.

## Despliegue

Una vez hayamos terminado de programar nuestro _Smart Contract_, vamos a **compilarlo**. En _Metamask_, vamos a **seleccionar la red en la que lo queremos desplegar**, por el momento, vamos a seleccionar **Sepolia** ya que estamos testeando. Desplegar un contrato en la red principal de **Ethereum** puede costarnos bastante dinero ahora mismo.

En Remix nos dirigimos a la sección de despliegue y seleccionamos _Metamask_ como proveedor. De esta forma **vamos a desplegarlo en la red que hayamos seleccionado en la _wallet_**.

Seleccionamos nuestro contrato para desplegarlo y pegamos nuestra dirección para ser el `owner` del contrato. Lo [desplegamos](https://sepolia.etherscan.io/tx/0x21001d9ebea5824ecaccc1f8e248bbc2b27deefc0f60079ed6001e7242e784cc) pagando las _fees_ de la transacción para crear el contrato en _Metamask_ y esperamos a que se confirme en la **Blockchain**…

## Uso

Cuando se haya desplegado, en la parte izquierda **podemos ver todos los métodos que podemos usar**. Lo primero que vamos a hacer es **crear** o [mintear](https://sepolia.etherscan.io/tx/0xb8f51ce9769203f723926e162546397d8c72623670f0df76985eb142519a69d4) un _supply_ ya que por el momento NO hay _tokens_ en circulación, para ello **escribimos la cantidad que queremos crear** y **18 CEROS** porque este _token_ tiene **18 decimales preestablecidos**.

```solidity
// 10.000 + 18 ceros
10000 000000000000000000
```

Mientras finaliza la transacción para crear los _tokens_, vamos a **copiar la dirección del contrato para importar este token a nuestra billetera de Metamask**. Ahora veremos en nuestra _wallet_ los _tokens_ que hemos creado y le podemos [enviar](https://sepolia.etherscan.io/tx/0xd737430410cfe39406598a6ade02f769743899456b10acdd2f80d486f8978d0c) unos pocos a otra _wallet_.

Desde el panel de la izquierda de Remix podemos ver el _total supply_, el **símbolo**, la dirección del `owner`, nombre, sus decimales e incluso el balance de una cuenta.

Estos métodos: `allowance`, `transferFrom`, `transfer`, `permit` los podemos utilizar para **hacer transferencias** de nuestros _tokens_ de una cuenta a otra en aplicaciones descentralizadas por ejemplo.

Si queremos [quemar](https://sepolia.etherscan.io/tx/0x39cd786d655514d57676270a67a1952b731c1280ba1dd359e6930c3b31a5819b) tokens, usamos el método `burn` para **indicar la cantidad que queremos quitar de la circulación** con **18 CEROS**, de la misma forma que al crearlos. Confirmamos la transacción y cuando finalice, podemos volver a consultar el _total supply_ para ver que ha disminuido.

Por último, podemos transferir este _token_ a otra _wallet_ **para cambiar de dueño o renunciar a ser dueño para que nadie pueda crear o quemar tokens nunca más y de esta forma sea un contrato más confiable**. Así que vamos a [renunciar](https://sepolia.etherscan.io/tx/0xfbe3b17d0068507358eb6811dc1f88e6bad858c47d4ced69cd17a9a64b4159de) a este contrato confirmando la transacción y ahora si consultamos quien es el dueño, veremos que este contrato no le pertenece a nadie.

Si ahora intentamos [crear](https://sepolia.etherscan.io/tx/0x79f2b832d07ae2580bcfb33c550432c160dc10764af134ec5c2db61577c3a1b8) más _tokens_ nos dará un _error_ porque ya _NO_ somos los dueños.

Por último, en el explorador de bloques [Eherscan](https://sepolia.etherscan.io/token/0x0cdc1099aa597d8cc0a1a9fd9d4cc55afb3d8024), podemos consultar toda la información sobre nuestro _token_, como el _supply_ total, el número de _holders_, y todas las transacciones que se han efectuado.
