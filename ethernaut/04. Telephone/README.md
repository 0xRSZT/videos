# Telephone

> Estas son las instrucciones en las que se basan este vídeo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=zztfv7ktRNU">
    <img src="https://img.youtube.com/vi/zztfv7ktRNU/hqdefault.jpg" alt="Link al video de Youtube">
  </a>
</p>

Para completar este nivel, **tenemos que convertirnos en los dueños**. Como siempre, creamos una nueva instancia del contrato confirmando la transacción en nuestra billetera de _MetaMask_ y mientras se despliega, copiamos el código del contrato y lo pegamos en **Remix**.

## Análisis

Como el objetivo es convertirse en los _dueños_, nos vamos a centrar en la variable `owner`. Esta variable se establece en el `constructor` a la dirección que despliega el contrato.

Luego, está la función `changeOwner` que recibe **como parámetro la dirección del nuevo dueño**. Dentro de esta función hay una **condición** para que solo se pueda cambiar el dueño si el `tx.origin` **no es el mismo que el** `msg.sender`. ¿Qué diferencia hay?

`tx.origin` **es la dirección que inicia la transacción** y `msg.sender` **es la dirección intermediaria que ha llamado a la función**. Por ejemplo: Si creamos un contrato intermediario que ejecute esta función, el `tx.origin` sería nuestra dirección que ha iniciado la transacción, pero el `msg.sender` sería el contrato atacante.

## Solución

Vamos a crear un nuevo contrato en este mismo archivo llamado `TelephoneAttack` y guardamos la dirección del contrato como una variable inmutable:

```solidity
contract TelephoneAttack {
	Telephone private immutable target;
}
```

Luego, en el `constructor`, estableceremos la dirección del contrato original:

```solidity
constructor(address _target) {
		target = Telephone(_target);
}
```

Ahora, crearemos la función que vamos a usar para hackear el contrato:

En esta función llamaremos a la función `changeOwner()` con nuestra dirección.

```solidity
function hack(address newOwner) public {
        target.changeOwner(newOwner);
    }
```

De esta manera, _nosotros estaremos iniciando la transacción pero el contrato que queremos hackear, verá la dirección de este contrato como msg.sender_.

## Ataque

Una vez hayamos terminado de programar nuestro contrato, lo compilamos y vamos a desplegarlo. Seleccionamos el entorno de _MetaMask_ y pegamos la dirección del contrato objetivo. Confirmamos la transacción para crear el contrato en la _Blockchain_.

Vamos a comprobar la dirección del _owner_ antes y ahora que esté desplegado, utilizamos la función `hack()` para **hackear** el contrato confirmando la transacción en _MetaMask_.

Cuando se confirme la transacción, comprobamos de nuevo quien es el _owner_ y vemos que ha cambiado a la nuestra.

Como nos indica **Ethernaut**, el uso de `tx.origin` y `msg.sender` **puede ser confuso** y se pueden hacer ataques de estilo _phising_ **dónde un atacante usa un contrato malicioso** y la dirección de la víctima se utiliza como `tx.origin` para robarle sus fondos.
