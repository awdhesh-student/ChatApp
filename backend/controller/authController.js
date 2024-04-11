const userSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndCookies = require("../utils/jsonWebToken");

const Register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existUser = await userSchema.findOne({ username });

    if (existUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyPic = `https://avatar.iran.liara.run/public/boy?username=[${username}]`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=[${username}]`;

    const newUser = new userSchema({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyPic : girlPic,
    });

    if (newUser) {
      await generateTokenAndCookies(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        username: newUser.username
      });
    } else {
      res.status(400).json({
        error: "Failed to create a new User!",
      });
    }
  } catch (error) {
    console.error(`Error in register: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.findOne({ username });
    const isPassword = bcrypt.compareSync(password, user?.password || "");

    if (!user || !isPassword) {
      return res.status(400).json({ error: "Missing username or password." });
    }
    // Generate token and set it into the cookies for future requests
    await generateTokenAndCookies(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(`Error in login: ${error}`);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const Logout = (req, res) => {
  try {
    // Clear all the cookies from client side
    res.cookie("jwt", {}, { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error in logout: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports = {
  Login,
  Register,
  Logout,
};
