const { musicArtists } = require("../models/artistModel");

const isArtist = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User data must be provided. " });
    }

    const foundUser = await musicArtists.findById({ _id: id });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid user." });
    }

    req.userId = foundUser._id;
    next();
    // console.log(data);
    // const foundUser = await musicArtists.findOne();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isArtist;
