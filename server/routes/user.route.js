import express from "express";
import { verifyToken } from "../config/verifyToeken.js";
import { Me } from "../controllers/user.controller.js";

export const UserRouter = express.Router();

UserRouter.get("/me", verifyToken, Me);
