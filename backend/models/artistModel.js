const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: ["Fullname must be provided"] },
    email: {
      type: String,
      unique: ["Email already exists."],
      required: ["Email must be provided."],
    },
    password: { type: String, required: ["Password must be provided"] },
    stageName: { type: String, default: "" },
    bio: { type: String, default: "" },
    album: { type: String, default: "" },
    country: { type: String, default: "" },
    instagram: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },

    releaseDate: { type: String, default: "" },
    songNames: [String],
    profilePhoto: { type: String },
    secretQuestion: { type: String, default: "" },
    secretAnswer: { type: String, default: "" },
  },
  { timestamps: true }
);

const musicArtists =
  mongoose.models.musicArtists || mongoose.model("musicArtists", artistSchema);

module.exports = { musicArtists };
