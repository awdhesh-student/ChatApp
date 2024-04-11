const mongoose = require("mongoose");

const conversationModel = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  { timestamp: true }
);

const conversationSchema = mongoose.model("Conversation", conversationModel);

module.exports = conversationSchema;
