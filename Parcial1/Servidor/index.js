import express from "express";
import usersRoute from "./routes/userRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

// Middleware de Logs
app.use(morgan("dev"));

let counter = 0;

// Middleware de Aplicacion
app.use((req, res, next) => {
  counter++;
  console.log(`Count: ${counter}`);
  next();
});

app.use(usersRoute);
app.use(uploadRoute);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
