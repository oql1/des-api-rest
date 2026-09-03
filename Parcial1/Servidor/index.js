import express from "express";
import usersRoute from "./routes/userRoutes.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use(usersRoute);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
