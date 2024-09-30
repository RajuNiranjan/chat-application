import dotenv from "dotenv";

dotenv.config();

export const ENV_VAR = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};
