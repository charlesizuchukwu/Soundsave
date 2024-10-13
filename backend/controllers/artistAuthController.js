const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const { musicArtists } = require("../models/artistModel");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const { jwtDecode } = require("jwt-decode");
const { findById } = require("../models/gridfile.model");

dotenv.config();

// ARTIST LOGIN LOGIC

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  const foundUser = await musicArtists.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(400).json({ message: "User not found." });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(400).json({ message: "Password does not match." });
  }

  const accessToken = jwt.sign(
    { id: foundUser._id, fullName: foundUser.fullName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    { id: foundUser._id, fullName: foundUser.fullName },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("jwt", refreshToken, {
    sameSite: "None",
    secure: true,
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ accessToken });
});

// REFRESH TOKEN LOGIC

const refresh = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (cookie?.jwt) return res.status(201).json({ message: "Unauthorized" });
  const refreshToken = cookie?.jwt;

  jwt.verify("jwt", refreshToken, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden." });
    const foundUser = await musicArtists.findById(decoded.id);
    if (!foundUser) return res.status(401).json({ message: "Unauthorized." });

    const accessToken = jwt.sign(
      { id: foundUser._id, fullName: foundUser.fullName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );
    return res.status(200).json({ accessToken });
  });
});

// LOGOUT LOGIC

const forgotPassword = asyncHandler(async (req, res) => {
  const { email, secretQuestion, secretAnswer } = req.body;
  const dt = { email, secretQuestion, secretAnswer };
  console.log(dt);
  if (!email || !secretAnswer || !secretQuestion) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const foundUser = await musicArtists.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ message: "User not found." });
  }

  if (
    foundUser?.secretQuestion.trim().toLowerCase() !==
      secretQuestion.trim().toLowerCase() ||
    foundUser?.secretAnswer.trim().toLowerCase() !==
      secretAnswer.trim().toLowerCase()
  ) {
    return res
      .status(400)
      .json({ message: "Wrong secret question or answer." });
  }

  return res.status(200).json({ success: true });
});

const resetPassowrd = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const foundUser = await musicArtists.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ message: "Invalid user" });
  }

  foundUser.password = await bcrypt.hash(password, 10);

  const savedUser = await musicArtists.findOneAndUpdate(
    { email: foundUser.email },
    { password: foundUser.password }
  );

  if (!savedUser) {
    return res.status(400).json({ message: "Invalid user data recieved" });
  }

  return res.status(200).json({ success: true });
});

// SAVE TOKEN
let user_id;

const saveToken = asyncHandler(async (req, res) => {
  const { recvToken } = req.body;

  if (!recvToken) {
    return res.status(401).json({ message: "Token is required!" });
  }

  const userData = jwtDecode(recvToken);
  const { id } = userData;
  user_id = id;
  const foundUser = await musicArtists.findById(id);

  if (!foundUser) {
    return res.status(400).json("User not found.");
  }

  const savedToken = await musicArtists.findByIdAndUpdate(
    { _id: foundUser._id },
    { uToken: recvToken }
  );

  if (savedToken) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(400).json({ message: "failed" });
  }
});

// GET TOKEN

const getToken = asyncHandler(async (req, res) => {
  if (!user_id || typeof user_id === "undefined" || user_id.length === 0) {
    return res.status(400).json({ tokenStatus: false });
  }

  const foundUser = await musicArtists.findById(user_id);
  if (!foundUser) {
    return res.status(400).json({ tokenStatus: false });
  }
  return res.status(200).json({ tokenStatus: true, token: foundUser.uToken });
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie) return res.sendStatus(204);
  res.clearCookie("jwt", { sameSite: "None", secure: true, httpOnly: true });
  return res.json({ message: "Cookie cleard" });
});

module.exports = {
  login,
  getToken,
  saveToken,
  refresh,
  logout,
  forgotPassword,
  resetPassowrd,
};
