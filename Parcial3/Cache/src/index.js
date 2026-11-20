import express from "express";
import { createClient } from "redis";

const app = express();
const redis = createClient();
await redis.connect();

app.get("/numero", async (req, res) => {
  try {
    let numero = await redis.get("numero");
    const cacheado = numero !== null;

    if (numero === null) {
      numero = String(Math.floor(Math.random() * 100) + 1);
      await redis.set("numero", numero, { EX: 15 });
    }

    res.json({ numero: Number(numero), cacheado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo consultar Redis" });
  }
});

app.listen(3000, () => console.log("API disponible en http://localhost:3000"));
