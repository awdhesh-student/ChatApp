const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookiesParser = require("cookie-parser");

const connection = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize the server and middleware.
const { app, server } = require("./socket/socket");

const __dir = path.resolve();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookiesParser());

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dir, "/frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dir, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connection();
  console.log(`Server is running on port ${PORT}`);
});
