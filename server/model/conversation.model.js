import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const ConversationModel = mongoose.model(
  "Conversation",
  conversationSchema
);
