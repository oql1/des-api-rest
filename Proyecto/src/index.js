import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import docsRoutes from "./routes/docs.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

// El registro y el login son públicos; los recursos requieren un JWT válido.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api-docs", docsRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error(err);

  return res.status(status).json({
    error: status === 401 ? "Unauthorized" : "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log("Routes ready: /api/auth, /api/users");
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs/`);
});
