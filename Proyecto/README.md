# API REST del proyecto final

Base tomada de `Parcial2/Servidor`: API de usuarios con Express, validación con Zod,
autenticación JWT, registro de peticiones con Morgan y documentación JSDoc.

## Ejecutar

```powershell
cd Proyecto
pnpm install
Copy-Item .env.example .env # Solo si todavía no existe .env
pnpm dev
```

Configura `PORT` y `JWT_SECRET` en `.env`.
El secreto JWT debe tener al menos 32 caracteres. La copia local ya incluye las
variables necesarias del servidor original; `.env` queda fuera de Git.

El servidor escucha en `http://localhost:3000` de forma predeterminada.
Para iniciar sin modo de vigilancia, usa `pnpm start`.

## Rutas

| Método | Ruta | Uso |
| --- | --- | --- |
| POST | `/api/auth/register` | Registro público de un usuario |
| POST | `/api/auth/login` | Inicio de sesión con `email` y `password` |
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/:id` | Consultar un usuario |
| DELETE | `/api/users/:id` | Eliminar un usuario |

El registro y el login son públicos. Las demás rutas requieren `Authorization: Bearer <accessToken>`.
El registro recibe `name`, `email`, `password`, `age` y opcionalmente `phone`.
Devuelve 201 con el usuario creado, sin contraseña ni hash. Después del registro,
inicia sesión con ese correo y contraseña para obtener el JWT.
El login devuelve `accessToken`, firmado con HS256 y válido durante una hora.
`Bearer` es el formato del encabezado que transporta el JWT.

Las cuentas se crean únicamente mediante el registro. La creación de usuarios desde
`/api/users` queda pendiente para cuando se incorporen roles y permisos.

Para registrarse son obligatorios `name`, `email`, `password` y `age`; `phone` es opcional.
La contraseña debe tener entre 8 y 128 caracteres. Los correos son únicos; un correo
duplicado devuelve 409. Las contraseñas se guardan como hashes con sal mediante
`scrypt` y nunca se incluyen en las respuestas de la API.

Usuarios de ejemplo para desarrollo:

| Correo | Contraseña |
| --- | --- |
| `alice@example.com` | `Alice123!` |
| `bob@example.com` | `Bob12345!` |

Puedes registrarte sin JWT o iniciar sesión con uno de estos usuarios de ejemplo.
Cada usuario nuevo puede iniciar sesión con su propio correo y contraseña.
Los usuarios se guardan en memoria y se restablecen al reiniciar el servidor.
Las peticiones de ejemplo están en `requests.http`.

## Documentación

La documentación interactiva de Swagger está en `http://localhost:3000/api-docs/`.
El documento OpenAPI está disponible en `/api-docs/openapi.json`.

En Swagger puedes probar registro y login sin autenticación. Para consultar o
eliminar usuarios, copia el `accessToken` del login, pulsa **Authorize** y pega
solo el token, sin el prefijo `Bearer`.

`swagger-jsdoc` genera la documentación desde los comentarios `@swagger` de las rutas.
Los modelos y respuestas compartidos se declaran directamente en OpenAPI en
`src/schemas/swagger.js`, en comentarios `@swagger`, y las rutas los reutilizan
mediante `$ref`. Estas definiciones se mantienen manualmente, sin generarlas desde Zod.
Los esquemas Zod de validación están en `src/schemas`.
`swagger-ui-express` sirve la interfaz dentro del servidor HTTP.

Ejecuta `pnpm doc` para generar la documentación en `docs/`.

## Pruebas

Ejecuta `pnpm test` para verificar el registro, login, JWT, contraseñas y creación de usuarios.
