const express = require("express");
const {
  getMessageController,
  sendMessageController,
} = require("../controller/messageController");
const protectedRoutes = require("../middlewares/protectedRoutes");

const router = express.Router();

router.post("/sendmessage/:id", protectedRoutes, sendMessageController);

router.get("/:id", protectedRoutes, getMessageController);

module.exports = router;
