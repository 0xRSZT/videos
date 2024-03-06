# Necesitas Conocer HYPERLEDGER!

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=-Jf7LdgzX6s">
    <img src="https://img.youtube.com/vi/-Jf7LdgzX6s/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## ¿Qué es Hyperledger?

[Hyperledger](https://www.hyperledger.org/) es un proyecto de código abierto que se centra en proyectos **DLT** (_Distributed Ledger Technology_) en español **Tecnologías de libro mayor distribuido** creado por la [Linux Fundation](https://www.linuxfoundation.org/) con un grupo de empresas grandes como [IBM](https://www.ibm.com/), [Oracle](https://www.oracle.com/) o [Microsoft](https://www.microsoft.com/) que estaban interesadas en aplicar la tecnología **Blockchain** a sus actividades comerciales [para ganar en confianza y seguridad](https://www.microsoft.com/).

Se podría definir como una cadena de bloques **para el mundo empresarial** en sectores como el **financiero**, **logístico** o incluso **IoT el** _Internet de las cosas_.

[Hyperledger]() como tal **es una fundación** que tiene diferentes proyectos, los más conocidos en este momento son Hyperledger [Fabric](https://www.hyperledger.org/projects/fabric) o Hyperledger [Besu](https://www.hyperledger.org/projects/besu) que son una **red privada** y **permisionada** que a diferencia de otras Blockchains que conocemos como Ethereum, **todas las identidades de los que participan en la red son conocidas** ya que es muy importante en un entorno empresarial.

Son plataformas creadas para que sean **escalables** y **adaptables** para que puedan **afrontar mucho tráfico de datos** y **capaces de adaptarse a cualquier necesidad**. Estas cadenas de bloques son muy flexibles en cuanto al **protocolo de consenso y lenguajes de programación, podemos programar en**: _Go_, _Java_, _JS_ y _Solidity_ porque **son compatibles con la máquina virtual de Ethereum** (**EVM**)

## [Quorum](https://github.com/ConsenSys/quorum-dev-quickstart)

### Prerrequisitos

Antes de comenzar a desplegar nuestra Blockchain, tendremos que tener instalado **Docker** para los contenedores, Node.js y una wallet para interactuar con la Blockchain. En este canal puedes encontrar vídeos de cómo hacerlo en tu equipo Windows.

### Instalación

Una vez tengamos todo listo, lo único que tenemos que ejecutar es el siguiente comando para iniciar nuestro proyecto:

```bash
npx quorum-dev-quickstart
```

Se iniciará un asistente, en el que seleccionaremos que queremos ejecutar el cliente **Hyperledger Besu**. Indicaremos que no queremos usar mas herramientas para no sobrecargar el servidor y finalizará la instalación.

Luego, accederemos a la carpeta que se ha creado y ejecutaremos el *script* `run.sh` y esperaremos a que se inicie la red.

En la aplicación de **Docker Desktop**, podemos observar todos los contenedores que se están ejecutando, por ejemplo podemos acceder al explorador de bloques por el puerto **25000**.

Podemos parar la red ejecutando el script `stop.sh` y si queremos volver a iniciarla el archivo `resume.sh`. Para listar todos los _endpoints_ disponibles podemos usar el `list.sh`.

### Metamask

Ahora, en _Metamask_, añadiremos esta red con los siguientes parámetros:

- Nombre de la red: Hyperledger Besu
- Dirección URL de RPC: `http://localhost:8545`
- Identificador de cadena: **1337**
- Símbolo de moneda: _ETH_

Si hemos hecho todo bien, ahora podremos cambiar entre redes y aparecerá con un *tick* verde.

### Importar cuenta

Después de añadir la red, importaremos una cuenta nueva a esta *wallet*.

Pegaremos una **clave privada** que nos da la [documentación oficial](https://besu.hyperledger.org/en/stable/private-networks/tutorials/quickstart/#create-a-transaction-using-metamask).

En esta *wallet* tendremos **90.000 Ethers de prueba.** Solo son válidos en nuestra red local.

### Transferir *tokens*

Desde esta cuenta, podemos transferir *tokens* a la otra cuenta que tenemos.

Seleccionamos la cuenta que va a recibir los _tokens_.

Le vamos a enviar **10 Ethers**.

Confirmaremos la transacción.

En el explorador veremos que se ha creado la transacción en un bloque.

En la cuenta de destino, ahora tendremos **10 Ethers** en esta red..

En la cuenta que hemos importado, veremos en la actividad se han enviado.

### Conectarse al explorador

Otra manera de transferir *tokens* sería conectándonos al explorador con **Metamask**. Seleccionaremos la cuenta principal y continuaremos.

Una vez hayamos conectado la cuenta , pegaremos la dirección de la cuenta de destino para enviarle **100 Ethers**.

Confirmaremos la transacción desde la extensión de _Metamask_.

Aparecerá una ventana emergente, donde veremos el número del bloque donde se ha almacenado la transacción.

Consultaremos de nuevo la cuenta de destino, y veremos que ahora tiene **110 Ethers**.

## Despliegue de *Smart Contract*

Después, usaremos [Remix IDE](https://remix.ethereum.org/) para desplegar un **contrato inteligente** que almacenará un número en la *blockchain* y luego lo podremos consultar. Así que lo primero será compilarlo.

Luego, lo desplegaremos en nuestro entorno de la red privada conectándonos con la cuenta 2 en **Metamask**.

Confirmaremos la transacción para implementar el contrato.

Una vez lo hayamos desplegado, podremos usarlo. En la ventana de la izquierda veremos un registro con la transacción de la implementación verificada.

Para poder almacenar un número, llamaremos a la función del *contrato* con el número 17. Confirmaremos la transacción (el coste de procesamiento).

Observaremos que se ha registrado el número en la *blockchain* y luego, llamaremos a la función para consultarlo.

## Grafana

Por último, comprobaremos el estado de nuestra red usando *Grafana*.

Veremos todas las métricas que nos ofrece de manera predeterminada.
