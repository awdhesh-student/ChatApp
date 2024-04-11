const conversationSchema = require("../models/conversationModel");
const messageSchema = require("../models/messageModel");
const { getRecieverId, io } = require("../socket/socket");

const sendMessageController = async (req, res) => {
  try {
    const { message: messages } = req.body;
    if (!messages) {
      return res.status(400).json({ error: "Messages field is required" });
    }
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationSchema.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await conversationSchema.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await messageSchema({
      senderId,
      recieverId,
      messages,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()])
    
    const receiverSocketId = getRecieverId(recieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in controller:", error);
    return res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
    });
  }
};


const getMessageController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationSchema
      .findOne({
        participants: {
          $all: [senderId, userToChatId],
        },
      })
      .populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.log("error in controller:", error);
    return res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  sendMessageController,
  getMessageController,
};
