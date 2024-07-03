import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: ["Please provide your fullname."] },
    email: {
      type: String,
      required: ["Email must be provided."],
      unique: ["Email already exists."],
    },
    password: { type: String, required: ["Password must be provided"] },
    stageName: { type: String, default: "" },
    bio: { type: String, default: "" },
    album: { type: String, default: "" },
    country: { type: String, default: "" },
    releaseDate: { type: String, default: "" },
    songs: { type: String },
    profilePhoto: { type: String },
  },
  { timestamps: true }
);

export const musicArtists =
  mongoose.models.musicArtists || mongoose.model("musicArtists", artistSchema);
