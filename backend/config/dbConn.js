const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbConn = async () => {
  //   const db_url =
  //     "mongodb+srv://kizicharles001:Charles@&2023@cluster0.3sjiocg.mongodb.net/Soundsave?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(process.env.DB_URI);
    // console.log("Database connected.");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { dbConn };
