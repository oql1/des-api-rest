# Definiciones API, REST y RESTful

## 1. ¿Qué es una API?

Una **API** (Application Programming Interface) es un conjunto de reglas, métodos y especificaciones que permite que diferentes programas o componentes de software puedan comunicarse entre sí. Puede entenderse como un contrato de comunicación: una aplicación ofrece determinadas funciones y otra aplicación puede utilizarlas siguiendo las reglas establecidas por la API.

Por ejemplo, una aplicación de clima puede utilizar una API para solicitar a un servidor información como:

- Temperatura actual.
- Humedad.
- Velocidad del viento.
- Pronóstico del tiempo.

La aplicación no necesita conocer cómo se almacenan o calculan esos datos internamente. Solamente necesita utilizar correctamente la interfaz que proporciona la API.

---

## 2. ¿Qué es REST?

**REST** (Representational State Transfer) es un estilo arquitectónico para diseñar sistemas distribuidos. Fue definido por Roy Fielding en su tesis doctoral Architectural Styles and the Design of Network-based Software Architectures, publicada en el año 2000.

Es importante aclarar que REST no es un protocolo, como HTTP, ni es un lenguaje de programación. Es un conjunto de principios y restricciones arquitectónicas que pueden utilizarse para diseñar sistemas de comunicación entre componentes de software.

REST busca, entre otras cosas, favorecer sistemas:

- Escalables.
- Simples.
- Con interfaces uniformes.
- Independientes entre cliente y servidor.
- Adecuados para sistemas distribuidos.

### Principales características de REST

1. **Cliente-servidor:** el cliente y el servidor tienen responsabilidades separadas.
2. **Stateless (sin estado):** cada solicitud debe contener la información necesaria para procesarla; el servidor no debe depender de un estado de sesión almacenado entre solicitudes.
3. **Cacheable:** las respuestas pueden indicar si pueden almacenarse en caché.
4. **Interfaz uniforme:** los recursos deben exponerse mediante una interfaz consistente y estandarizada.
5. **Sistema en capas:** un cliente no necesariamente necesita conocer si está comunicándose directamente con el servidor o con un intermediario.

### REST y los recursos

Un concepto fundamental de REST es el de **recurso**.

Un recurso puede representar cualquier elemento que pueda ser identificado dentro del sistema, por ejemplo:

- Un usuario.
- Un producto.
- Una fotografía.
- Una publicación.
- Un pedido.

Estos recursos pueden identificarse mediante una URI o URL.

Por ejemplo:

```http
GET /usuarios/25
```

Podría solicitar el recurso correspondiente al usuario con identificador `25`.

La representación del recurso podría devolverse en formato JSON:

```json
{
  "id": 25,
  "nombre": "Juan",
  "correo": "juan@example.com"
}
```

Es importante distinguir entre el **recurso** y su **representación**. El servidor puede tener internamente un objeto o registro de usuario, pero al cliente puede entregarle una representación de ese recurso, por ejemplo en JSON.

---

## 3. ¿A qué se refiere el término RESTful?

El término **RESTful** se utiliza para describir un sistema, servicio o API que sigue los principios y restricciones del estilo arquitectónico REST.

En otras palabras: REST es el estilo arquitectónico mientras que RESTful describe aquello que implementa o sigue ese estilo.

Por ejemplo, podemos tener una API HTTP que maneje usuarios:

```http
GET    /usuarios
GET    /usuarios/25
POST   /usuarios
PUT    /usuarios/25
DELETE /usuarios/25
```

Una API diseñada siguiendo los principios REST puede considerarse **RESTful**.
