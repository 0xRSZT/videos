# 5 Herramientas que NECESITAS para el DESARROLLO BLOCKCHAIN

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=wZu1gKwz8V8">
    <img src="https://img.youtube.com/vi/wZu1gKwz8V8/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

## WSL2

La primera herramienta es el subsistema de Windows para Linux. **WSL2** es una característica de Windows que permite ejecutar un entorno Linux directamente en un sistema operativo Windows. ¿Para que lo necesitamos?:

- WSL2 mejora la compatibilidad con aplicaciones y herramientas específicas de Linux.
- Es compatible con Docker y permite ejecutar contenedores de Docker directamente en su entorno
- Facilita a los desarrolladores la creación de aplicaciones que funcionan en entornos tanto de Windows como de Linux, proporcionando una experiencia de desarrollo más consistente.

### Requisitos Previos

Antes de comenzar a [instalar](https://learn.microsoft.com/es-es/windows/wsl/install) esta herramienta en nuestro equipo, nos tenemos que asegurar de que nuestro sistema operativo sea Windows 10 u 11 versión 2004 o posterior. Para ello pulsamos **WIN + R** y escribimos `winver`. En este caso tenemos una versión superior. Además, tenemos que tener la virtualización habilitada en nuestra **BIOS**.

### Instalación

Después, abrimos una terminal de _PowerShell_ como administrador y ejecutamos el siguiente comando:

```powershell
wsl --install
```

De esta forma se instalarán las características necesarias y se descargará la distribución **Ubuntu** por defecto. Cuándo termine, debemos reiniciar el equipo para que se apliquen los cambios.

Después del reinicio, instalaremos la [Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?rtc=1&hl=es-es&gl=ES) de Windows desde la tienda. En esta aplicación abrimos **Ubuntu** y terminamos la instalación estableciendo una contraseña para nuestro usuario.

Para enumerar las distribuciones de Linux instaladas podemos utilizar el siguiente comando en PowerShell:

```powershell
wsl -l -v
```

### Docker

La segunda aplicación que vamos a necesitar es [Docker](https://www.docker.com/). Docker es una plataforma de virtualización a nivel de contenedores que simplifica el desarrollo, implementación y ejecución de aplicaciones al proporcionar un entorno aislado y portátil. En nuestro caso lo utilizaremos para desarrollar aplicaciones descentralizadas, ejecutar cadenas de bloques de forma local e incluso nuestro propio explorador de bloques.

### Instalación

Para instalarlo en Windows descargamos el instalador desde su [página web](https://www.docker.com/products/docker-desktop/) y lo ejecutamos para comenzar con la instalación.

Seleccionamos usar **WSL2** en vez de _Hyper-V_ y crear un acceso directo en la configuración inicial.

Esperamos a que finalice la instalación y cuándo termine tendremos que cerrar sesión o reiniciar el equipo.

## Node.js y NPM

La tercera herramienta fundamental es [Node.js](https://nodejs.org/) y su gestor de paquetes [NPM](https://www.npmjs.com/). **Node.js** proporciona un entorno de ejecución del lado del servidor para _JavaScript_, mientras que _NPM_ es una herramienta que facilita la gestión de dependencias y la distribución de paquetes de código en proyectos **Node.js**.

### Instalación

Lo más recomendable para instalar Node.js en Linux es instalar un **gestor de versiones** conocido como [nvm](https://github.com/nvm-sh/nvm). De esta manera podemos instalar y usar diferentes versiones en nuestros proyecto y evitar problemas de permisos.

Para instalarlo, seguiremos la [documentación](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) oficial dónde nos indica que tenemos que ejecutar su script de instalación. Este _script_ descargará el repositorio en nuestro equipo y creará unas variables de entorno en nuestro fichero `bashrc` para que podamos usar esta herramienta.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Es muy rápido y cuando termine tenemos cerrar y volver a abrir la terminal para que se ejecuten los cambios.

Ahora podemos [instalar](https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage) la versión **LTS** con el siguiente comando:

```bash
nvm install node
```

Podemos ver las versiones que tenemos instaladas listándolas con este comando:

```bash
nvm ls
```

O ver las versiones disponibles:

```bash
nvm ls-remote
```

Si queremos instalar la versión **18** por ejemplo:

```bash
nvm install 18
```

Se instalará y ahora usaremos esta versión. Y si queremos volver a cambiar a la última:

```bash
nvm use node
```

Al usar este gestor de versiones también tendremos [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) instalado.

## Visual Studio Code

La siguiente aplicación es fundamental para programar: Un **editor de código**. En este caso vamos a instalar [Visual Studio Code](https://code.visualstudio.com/) ya que es gratuito, multiplataforma y nos ofrece muchas herramientas, _plugins_ e _integraciones_ para mejorar nuestra experiencia.

### Instalación

Lo vamos a instalar en nuestro equipo descargando el instalador desde su [página web](https://code.visualstudio.com/Download). Cuando se haya descargado, lo ejecutamos para iniciar la instalación. Aceptamos los términos y seleccionamos todas las opciones. Esperamos a que se instale y lo iniciamos por primera vez.

Aparecerá una ventana que nos indica que si queremos utilizar el editor de código en nuestro **subsistema de Linux** tenemos que instalar la extensión de **WSL**. La instalamos y ahora haciendo clic abajo a la izquierda podemos cambiar de entorno y conectarnos a nuestro **Ubuntu**.

Desde la terminal también podemos iniciar este editor de código directamente utilizando el siguiente comando:

```bash
code .
```

De esta forma se iniciará el editor en nuestra **carpeta actual**.

## Metamask

Por último, ya tenemos casi todas las herramientas necesarias pero falta una de las más importantes. Una cartera o _wallet_ para interactuar con la **Blockchain**. [MetaMask](https://metamask.io/) es una extensión de navegador que permite a los usuarios acceder a aplicaciones descentralizadas basadas en tecnología blockchain de **Ethereum** y derivadas.

### Instalación

Para instalarla en nuestro navegador, nos dirigimos a su [página web](https://metamask.io/download/) para descargar esta extensión directamente. Cuando termine la instalación, se abrirá una nueva ventana dónde tendremos que aceptar los términos para crear un nuevo monedero.

Tendremos que introducir una contraseña para desbloquear esta cartera, solo en este navegador, de esta manera si alguien tiene acceso a nuestro equipo **NO** podrá robar nuestros fondos.

Después protegeremos nuestro monedero escribiendo las **12 palabras de seguridad en un sitio seguro** como en un papel o libreta. Estas palabras son muy importantes ya que en el caso de que queramos acceder a esta _wallet_ desde otro dispositivo es la única manera para entrar.

Cuándo hayamos terminado de escribir las palabras y las hayamos guardado en un sitio seguro, nos pedirá que escribamos unas cuantas para confirmar que las hemos respaldado correctamente y en orden.

Ya tendremos acceso a nuestra billetera para manejar nuestros fondos en la red principal de **Ethereum** y en las redes de prueba como **Sepolia** o **Goerli**.
