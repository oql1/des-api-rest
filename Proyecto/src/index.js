import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log("Routes ready: /api/auth, /api/users");
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs/`);
});
