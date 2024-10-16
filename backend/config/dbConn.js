const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbConn = async () => {
  try {
    return await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { dbConn };
