import express from "express";
import { SendMessage } from "../controller/message.controller.js";
import { VerifyToken } from "../utils/verifyToken.js";

export const MessageRouter = express.Router();

MessageRouter.post("/send/:id", VerifyToken, SendMessage);
