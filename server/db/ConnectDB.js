import mongoose from "mongoose";
import { ENV_VAR } from "../utils/envVar.js";

const ConnectDB = async (req, res) => {
  try {
    const dbUri = ENV_VAR.DB_URI;
    if (dbUri) {
      await mongoose
        .connect(dbUri)
        .then(() => console.log("server connected to database"))
        .catch((error) => console.log(error));
    } else {
      return res.status(400).json({ message: "Invalid Database url" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during connecting to Databse",
      error: error,
    });
  }
};

ConnectDB();
