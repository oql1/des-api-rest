import { readFileSync } from "node:fs";
import { createServer } from "node:https";
import express from "express";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getUsers } from "./data/users.js";
import apiKeyRoutes from "./routes/auth/apikey.js";
import basicRoutes from "./routes/auth/basic.js";
import bearerRoutes from "./routes/auth/bearer.js";
import jwtRoutes from "./routes/auth/jwt.js";
import apiRoutes from "./routes/shared/apiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(currentDirectory, "views"));

// Cada prefijo aplica un solo método; las rutas de recursos vienen del mismo módulo compartido.
app.use("/api/public", apiRoutes);
app.use("/api/auth/basic", basicRoutes);
app.use("/api/auth/apikey", apiKeyRoutes);
app.use("/api/auth/bearer", bearerRoutes);
app.use("/api/auth/jwt", jwtRoutes);

app.get("/", (req, res) => {
  res.render("index", { users: getUsers() });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error(err);

  return res.status(status).json({
    error: status === 401 ? "Unauthorized" : "Internal server error",
  });
});

const httpsOptions = {
  key: readFileSync(path.join(currentDirectory, "ssl", "key.pem")),
  cert: readFileSync(path.join(currentDirectory, "ssl", "cert.pem")),
};

createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`API running at https://localhost:${PORT}`);
  console.log("Routes ready: /api/public, /api/auth/basic, /api/auth/apikey, /api/auth/bearer, /api/auth/jwt");
});
