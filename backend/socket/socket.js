// const socketIO = require("socket.io");
// const http = require("http");
// const express = require("express");

// const app = express();

// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] }, // enable CORS
// });


// const userSocketMap = {};
// const getRecieverId = (receiverId) => {
//   return userSocketMap[receiverId];
// };
// // Set up socket listeners
// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (!userId != "undefined") userSocketMap[userId] = socket.id;

//   io.emit("onlineUsers", Object.keys(userSocketMap)); ////used to send events to all online users

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("onlineUsers", Object.keys[userSocketMap]);
//   });
// });

// module.exports = { app, io, server, getRecieverId };

const socketIO = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] }, // enable CORS
});

const userSocketMap = {};

const getRecieverId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Set up socket listeners
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined && userId !== "undefined") // corrected condition
    userSocketMap[userId] = socket.id;

  io.emit("onlineUsers", Object.keys(userSocketMap)); // used to send events to all online users

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId !== undefined && userId !== "undefined") {
      delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    }
  });
});

module.exports = { app, io, server, getRecieverId };