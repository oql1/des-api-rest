import { fileURLToPath } from "node:url";
import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API del proyecto final",
      version: "1.0.0",
      description: "Registro, inicio de sesión y administración de usuarios en memoria.",
    },
    servers: [{ url: "/" }],
    tags: [{ name: "Autenticación" }, { name: "Usuarios" }],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["../routes/*.js", "../schemas/swagger.js"].map((file) =>
    fileURLToPath(new URL(file, import.meta.url)).replaceAll("\\", "/"),
  ),
});
