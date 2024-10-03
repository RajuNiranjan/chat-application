import express from "express";
import { verifyToken } from "../config/verifyToeken.js";
import { GetAllUsers, Me } from "../controllers/user.controller.js";

export const UserRouter = express.Router();

UserRouter.get("/me", verifyToken, Me);
UserRouter.get("/all", GetAllUsers);
