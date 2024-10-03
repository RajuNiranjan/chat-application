import "./db/ConnectDB.js";
import express from "express";
import { ENV_VAR } from "./utils/envVar.js";
import cors from "cors";
import { AuthRouter } from "./routes/auth.route.js";

const app = express();
const PORT = ENV_VAR.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ENV_VAR.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) =>
  res.json({ message: `server is running at port no: ${PORT}` })
);

app.get("/api", (req, res) =>
  res.json({ message: `server is running at port no: ${PORT}` })
);

app.use("/api/auth", AuthRouter);

app.listen(PORT, () => console.log(`server running at port no: ${PORT}`));
