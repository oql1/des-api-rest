# Métodos de autenticación en una API REST

La **autenticación** permite comprobar la identidad de quien realiza una solicitud a una API. La **autorización** determina qué recursos o acciones puede utilizar. Los siguientes mecanismos participan en la protección del acceso, aunque cumplen funciones distintas.

## 1. Básica (Basic)

El cliente envía su nombre de usuario y contraseña en el encabezado `Authorization`, unidos como `usuario:contraseña` y codificados en Base64. El servidor verifica esas credenciales en cada solicitud protegida. Es fácil de implementar, pero **Base64 no cifra los datos**, por lo que debe utilizarse HTTPS. [Referencia: RFC 7617](https://www.rfc-editor.org/rfc/rfc7617.html).

Ejemplo de encabezado para las credenciales ficticias `usuario:clave`:

```http
Authorization: Basic dXN1YXJpbzpjbGF2ZQ==
```

## 2. Digest

El servidor envía un desafío que incluye un valor llamado *nonce*. El cliente responde con un resumen criptográfico calculado a partir de la contraseña, el desafío y datos de la solicitud. Así, no transmite directamente la contraseña. Requiere más intercambio y cálculo que Basic y no sustituye a HTTPS, pues no cifra toda la comunicación. [Referencia: RFC 7616](https://www.rfc-editor.org/rfc/rfc7616.html).

## 3. Bearer

El cliente presenta un token de acceso en el encabezado `Authorization`. El servidor lo valida antes de permitir el acceso. **Quien posea un token válido puede utilizarlo**, por lo que debe protegerse y enviarse mediante HTTPS. Bearer define cómo se presenta el token; este puede ser una cadena opaca o tener un formato como JWT. [Referencia: RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html).

```http
Authorization: Bearer <token_de_acceso>
```

## 4. API Key

Una **clave de API** es un valor que el proveedor entrega a una aplicación para identificarla y controlar su acceso. Suele enviarse en un encabezado cuyo nombre depende de la API. Es sencilla para integrar servicios, pero por sí sola no identifica necesariamente al usuario final. Debe mantenerse secreta y transmitirse mediante HTTPS. [Referencia: documentación de Swagger](https://swagger.io/docs/specification/v3_0/authentication/api-keys/).

```http
X-API-Key: <clave_de_la_aplicacion>
```

## 5. JSON Web Token (JWT)

JWT es un **formato de token** que contiene declaraciones (*claims*), como la identidad del usuario y una fecha de expiración. En su forma firmada habitual tiene tres partes: encabezado, contenido y firma. La API verifica la firma y las declaraciones pertinentes antes de aceptar el token, que puede enviarse mediante Bearer. **La firma no oculta el contenido**: un JWT firmado no está necesariamente cifrado y no debe incluir secretos. [Referencia: RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html).

Estructura habitual de un JWT firmado:

```text
encabezado.contenido.firma
```

## 6. OAuth

**OAuth 2.0** es un marco de autorización que permite a una aplicación obtener acceso limitado a una API sin recibir la contraseña del usuario. Un servidor de autorización emite un token de acceso con permisos definidos, llamados *scopes*, y la aplicación lo presenta ante la API. Por ejemplo, un usuario puede autorizar a una aplicación a consultar sus archivos. OAuth por sí solo no define la autenticación del usuario; para el inicio de sesión se utiliza una capa como OpenID Connect. [Referencia: RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html).
