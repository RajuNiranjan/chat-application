import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const SendMessage = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { id: receiverId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message should not be empty" });
    }

    let conversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ message: newMessage });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during sending message",
      error: error,
    });
  }
};

export const GetConversation = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { id: receiverId } = req.params;

    const conversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during getting messages",
      error: error,
    });
  }
};
