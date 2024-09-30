import express from "express";
import { ENV_VAR } from "./config/EnvVar.js";
import cors from "cors";
import "./db/connectDB.js";

const app = express();
const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ENV_VAR.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: `server is running at port no: ${PORT}` });
});

app.listen(PORT, () => console.log(`server is running at port no: ${PORT}`));
