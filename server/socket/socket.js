import express from "express";
import http from "http";
import { ENV_VAR } from "../utils/envVar.js";
import { Server } from "socket.io";

export const app = express();

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ENV_VAR.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connect", (socket) => {
  console.log("New client connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    socket.userId = userId;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);

    if (socket.userId) {
      delete userSocketMap[socket.userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
