const userSchema = require("../models/userModel");

const getUserSidebar = async (req, res) => {
  try {
    let userLoggedIn = req.user._id;

    const filterAllUsers = await userSchema
      .find({
        _id: { $ne: userLoggedIn },
      })
      .select("-password"); // Get all users except the logged in
    // const allUsers = await userSchema.find().select("-password"); // Get all users the logged in (self also)

    return res.status(200).json(filterAllUsers);
  } catch (error) {
    console.log("Error in getting user sidebar : ", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
};

module.exports = {
  getUserSidebar,
};
