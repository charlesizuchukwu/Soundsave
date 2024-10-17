const mongoose = require("mongoose");
const dotenv = require("dotenv");

let connection;
let storage;
dotenv.config();
const dbConn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    // storage = new GridFsStorage({ db: connection });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { dbConn };
