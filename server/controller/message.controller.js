import { ConversationModel } from "../model/conversation.model.js";
import { MessageModel } from "../model/message.model.js";

export const SendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.userId;
    const { message } = req.body;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new ConversationModel({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    return res.status(201).json({ message: newMessage });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during sending message" });
  }
};