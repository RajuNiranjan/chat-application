import express from "express";
import { AllUsers, Me } from "../controller/user.controller.js";
import { VerifyToken } from "../utils/verifyToken.js";

export const UserRoute = express.Router();

UserRoute.get("/me", VerifyToken, Me);
UserRoute.get("/all", VerifyToken, AllUsers);
