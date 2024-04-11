const jwt = require("jsonwebtoken");

const generateTokenAndCookies = async (userId, res) => {
  // Generate JSON Web Token (JWT) for user authentication.
  // open git bash in terminal
  // type - openssl rand base64 32
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //prevent XSS attacks cross site scripting
    maxAge: 1000 * 60 * 60 * 24 * 7, // one week
    sameSite: "strict", // CSRF attacks request
  });
};

module.exports = generateTokenAndCookies;
