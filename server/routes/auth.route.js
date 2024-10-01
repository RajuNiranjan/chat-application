import express from "express";
import { LogIn, SignUp } from "../controller/auth.controller.js";

export const AuthRoute = express.Router();

AuthRoute.post("/register", SignUp);
AuthRoute.post("/login", LogIn);
