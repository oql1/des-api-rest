import express from "express";
import morgan from "morgan";
import usersRoute from "./routes/userRoutes.js";
import { apiKeyAuth } from "@vpriem/express-api-key-auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

const API_KEY = process.env.API_KEY;
console.log("API Key:", API_KEY);
// @ts-ignore
app.use(apiKeyAuth([API_KEY]));

app.use(usersRoute);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
