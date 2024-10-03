import jwt from "jsonwebtoken";
import { ENV_VAR } from "../utils/envVar.js";

export const GenerateToken = (id) => {
  if (!id || !ENV_VAR.JWT_EXPIRES_IN || !ENV_VAR.JWT_SECRET_KEY) {
    throw new Error("Invalid Env variables");
  }

  const payload = { userId: id };

  const token = jwt.sign(payload, ENV_VAR.JWT_SECRET_KEY, {
    expiresIn: ENV_VAR.JWT_EXPIRES_IN,
  });
  return token;
};
