import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/EnvVar.js";

export const VerifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token is required and must be in the correct format",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, ENV_VAR.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decodedToken;
    next();
  });
};
