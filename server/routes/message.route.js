import express from "express";
import {
  GetConversation,
  SendMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../config/verifyToeken.js";

export const MessageRoute = express.Router();

MessageRoute.post("/send/:id", verifyToken, SendMessage);
MessageRoute.get("/:id", verifyToken, GetConversation);
