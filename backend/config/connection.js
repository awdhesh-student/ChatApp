const mongoose = require("mongoose");

const connection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = connection
