const express = require("express");
const { Login, Register, Logout } = require("../controller/authController");

const router = express.Router();

router.post("/login", Login);

router.post("/signup", Register);

router.post("/logout", Logout);

module.exports = router;
