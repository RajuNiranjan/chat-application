import express from "express";
import { ENV_VAR } from "./config/EnvVar.js";
import cors from "cors";
import "./db/connectDB.js";
import { AuthRoute } from "./routes/auth.route.js";
import { UserRoute } from "./routes/user.route.js";
import { MessageRouter } from "./routes/message.route.js";

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
  res.status(200).json({ message: `server is running at port no: ${PORT}` });
});

app.get("/api/", (req, res) => {
  res.status(200).json({ message: `server is running at port no: ${PORT}` });
});

app.use("/api/auth", AuthRoute);
app.use("/api", UserRoute);
app.use("/api/message", MessageRouter);

app.listen(PORT, () => console.log(`server is running at port no: ${PORT}`));
