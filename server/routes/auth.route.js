import express from "express";
import { LogIn, Register } from "../controllers/auth.controller.js";

export const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", LogIn);
