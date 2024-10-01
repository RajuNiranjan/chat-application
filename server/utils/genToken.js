import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/EnvVar.js";

export const GenToken = (id) => {
  if (!ENV_VAR.JWT_EXPIRES_IN || !ENV_VAR.JWT_SECRET_KEY) {
    throw new Error("Invalid ENV_VAR");
  }
  const payload = { userId: id };

  const token = jwt.sign(payload, ENV_VAR.JWT_SECRET_KEY, {
    expiresIn: ENV_VAR.JWT_EXPIRES_IN,
  });
  return token;
};
