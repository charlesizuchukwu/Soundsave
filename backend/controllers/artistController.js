import { musicArtists } from "../models/artistModel.js";
import bcrypt from "bcrypt";
import { validate } from "email-validator";
import mongodb from "mongodb";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConn } from "../config/dbConn.js";
import fs from "fs";

dotenv.config();

const register = async (req, res) => {
  const { email, fullName, password } = req.body;
  if (!email || !fullName || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (fullName.length > 50) {
    return res
      .status(400)
      .json({ message: "Please choose a shorter form of name." });
  }

  if (!validate(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  const duplicateEmail = await musicArtists
    .findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicateEmail) {
    return res.status(400).json({ message: "User exists already" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = new musicArtists({
    fullName,
    email,
    password: hashedPwd,
  });

  const savedUser = await newUser.save();

  if (!savedUser) {
    return res.status(400).json({ message: "Invalid user data recieved." });
  } else {
    return res.status(201).json({ message: "Artists created successfully." });
  }
};

const uploadImage = async (req, res) => {
  //   const fileName = req.file;
  let file;
  try {
    if (!req.files) {
      return res.status(400).json({ message: "File must be provided" });
    }

    file = req.files;
    // return res.status(200).json({ dt: file?.undefined?.name });
    // const foundArtist = await musicArtists.findOne({ email }).lean();
    // const conn = mongoose.createConnection(process.env.DB_URI);
    const db = mongoose.connection.db;

    const bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream(file?.undefined?.name).pipe(
      bucket.openUploadStream(file?.undefined?.name, {
        chunkSizeBytes: 1048576,
        metadata: { field: "myfield", value: "myvalue" },
      })
    );

    const cursor = bucket.find({});

    return res.status(200).json({ msg: cursor });

    // Grid.mongo = mongoose.mongo;

    // console.log("connecting....");
    // console.log("connected");
    // mongoose.connection.once("open", function () {
    //   const gfs = Grid(conn.db);
    //   const writestream = gfs.createWriteStream({
    //     filename: file,
    //   });

    //   return res.status(200).json({ msg: writestream });
    // });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  register,
  uploadImage,
};

// const Recipient = require("mailersend").Recipient;
// const EmailParams = require("mailersend").EmailParams;
// const MailerSend = require("mailersend");

// const mailersend = new MailerSend({
//     apiKey: "key",
// });

// const recipients = [new Recipient("recipient@email.com", "Recipient")];

// const emailParams = new EmailParams()
//     .setFrom("info@domain.com")
//     .setFromName("Your Name")
//     .setRecipients(recipients)
//     .setSubject("Subject")
//     .setHtml("Greetings from the team, you got this message through MailerSend.")
//     .setText("Greetings from the team, you got this message through MailerSend.");

// mailersend.send(emailParams);
