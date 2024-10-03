import express from "express";

export const MessageRoute = express.Router();

MessageRoute.post("/send/:id");
