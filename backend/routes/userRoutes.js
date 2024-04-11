const express = require("express");
const { getUserSidebar } = require("../controller/userController");
const protectedRoutes = require("../middlewares/protectedRoutes");

const router = express.Router();

router.get("/", protectedRoutes, getUserSidebar)

module.exports = router;
