import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: { type: String, require: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", messageSchema);
