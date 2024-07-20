const { musicArtists } = require("../models/artistModel.js");
bcrypt = require("bcrypt");
validator = require("email-validator");
mongodb = require("mongodb");
Grid = require("gridfs-stream");
dotenv = require("dotenv");
mongoose = require("mongoose");
const { dbConn } = require("../config/dbConn.js");
fs = require("fs");
// const asyncHandler = require("express-async-handler");

dotenv.config();

// UTILITY FUNCTION
const editor = (prev, rec) => {
  return prev === "" && rec === "None" ? prev : rec;
};

const register = async (req, res) => {
  const { email, fullName, password, secretQuestion, secretAnswer } = req.body;
  if (!email || !fullName || !password || !secretQuestion || !secretAnswer) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (fullName.length > 50) {
    return res
      .status(400)
      .json({ message: "Please choose a shorter form of name." });
  }

  if (!validator.validate(email)) {
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
  const trimedSecQuest = secretQuestion.trim().toLowerCase();
  const trimedSecAns = secretAnswer.trim().toLowerCase();

  const newUser = new musicArtists({
    fullName,
    email,
    secretAnswer: trimedSecAns,
    secretQuestion: trimedSecQuest,
    password: hashedPwd,
  });

  const savedUser = await newUser.save();

  if (!savedUser) {
    return res.status(400).json({ message: "Invalid user data recieved." });
  } else {
    return res.status(201).json({ message: "Artists created successfully." });
  }
};

const profileSettings = async (req, res) => {
  const {
    stageName,
    country,
    instagramAccount,
    facebookAccount,
    twitterAccount,
    whatsappAccount,
  } = req.body;
  const id = req.user;

  if (!id) {
    return res.status(400).json({ message: "User id must be provided." });
  }

  try {
    const foundUser = await musicArtists.findById(id).exec();
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    foundUser.instagram = editor(foundUser.instagram, instagramAccount);
    foundUser.facebook = editor(foundUser.facebook, facebookAccount);
    foundUser.whatsapp = editor(foundUser.whatsapp, whatsappAccount);
    foundUser.twitter = editor(foundUser.twitter, twitterAccount);
    foundUser.country = editor(foundUser.country, country);
    foundUser.stageName = editor(foundUser.stageName, stageName);

    const updatedUserData = await musicArtists.findByIdAndUpdate(
      { _id: foundUser._id },
      {
        instagram: foundUser.instagram,
        facebook: foundUser.facebook,
        twitter: foundUser.twitter,
        whatsapp: foundUser.whatsapp,
        stageName: foundUser.stageName,
        country: foundUser.country,
      }
    );

    if (updatedUserData) {
      return res.status(200).json({ message: "data updated successfully." });
    } else {
      return res.status(400).json({ message: "Invalid user data recieved." });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAllArtist = async (req, res) => {
  try {
    const allArtists = await musicArtists.find({}).lean();
    if (!allArtists || allArtists.length === 0) {
      return res.status(400).json({ message: "No Artist " });
    } else {
      return res.status(200).json({ allArtists });
    }
  } catch (error) {
    return res.status(error?.statusCode).json({ error });
  }
};

// const getSpecificArtistSong = asyncHandler(async (req, res) => {
//   return res.send(req.params);
// const data = req.params;

// if (!data) {
//   return res.status(400).json({ message: "User id must be provided." });
// }

// return res.status(200).json({ data });

// const foundUser = await musicArtists.findOne({ _id: id });
// if (!foundUser) return res.status(400).json({ message: "User not found." });

// const userId = foundUser._id;

// const allSongFile = await GridFile.find({});

// if (allSongFile.length === 0) {
//   return res.status(400).json({ message: "Empty song list." });
// }
// const songs = songFilter(allSongFile, userId);

// if (songs.length === 0) {
//   return res.status(400).json({ message: "Empty song list." });
// }

// return res.status(200).json({ songs });
// throw new Error(error);
// return res.status(500).json({ err: error });
// });

// const uploadImage = async (req, res) => {};

module.exports = {
  register,
  profileSettings,
  getAllArtist,
};
// getSpecificArtistSong,

// const Recipient = require("mailersend").Recipient;
// const EmailParams = require("mailersend").EmailParams;
// const MailerSend = require("mailersend");

// const mailersend = new MailerSend({
//     apiKey: "key",
// });

// const recipients = [new Recipient("recipient@email.com", "Recipient")];

// const emailParams = new EmailParams()
//     .set(require("info@domain.com")
//     .setNrequire(ame("Your Name")
//     .setRecipients(recipients)
//     .setSubject("Subject")
//     .setHtml("Greetings  require(the team, you got this message through MailerSend.")
//     .setText("Greetings  require(the team, you got this message through MailerSend.");

// mailersend.send(emailParams);
