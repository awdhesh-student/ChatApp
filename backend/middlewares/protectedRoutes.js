const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");

const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).send({ message: "unauthorised-no token" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded)
      return res.status(401).json({ message: "unauthorised-invalid token" });

   const user = await userSchema.findById(decoded.userId).select("-password");
    if (!user)
      return res.status(401).json({ message: "User not found!" });
    
    //add to request object so it can be accessed in the subsequent middleware functions
    req.user = user;
    next();
  } catch (error) {
    console.log("error in middleware: ", error);
    return res.status(500).json({ error: "No token provided." });
  }
};

module.exports = protectedRoutes