import express from "express";
import { SignUp } from "../controller/auth.controller.js";

export const AuthRoute = express.Router();

AuthRoute.post("/register", SignUp);
