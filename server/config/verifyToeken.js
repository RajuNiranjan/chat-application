import jwt from "jsonwebtoken";
import { ENV_VAR } from "../utils/envVar.js";

export const verifyToken = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token is required" });
    }

    const token = tokenHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, ENV_VAR.JWT_SECRET_KEY);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Token validation error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    return res.status(500).json({
      message: "Internal server error during token validation",
      error: error.message,
    });
  }
};
