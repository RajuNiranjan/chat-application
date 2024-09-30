import mongoose from "mongoose";
import { ENV_VAR } from "../config/EnvVar.js";

const ConnectDB = async (req, res) => {
  try {
    const DB_URI = ENV_VAR.DB_URI;
    if (DB_URI) {
      await mongoose
        .connect(DB_URI)
        .then(() => console.log("server is connected to data base"))
        .catch((e) => console.log(e));
    } else {
      console.log("Invalid DB_URI");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error while connecting to Data Base" });
  }
};

ConnectDB();
