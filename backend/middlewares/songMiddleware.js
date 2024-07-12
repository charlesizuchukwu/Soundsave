// const {
//   default: SongUploadUi,
// } = require("../../frontend/soundsave-frontend/src/pages/fragments/ui/SongUploadUi");
const { musicArtists } = require("../models/artistModel");
const GridFile = require("../models/gridfile.model");
const fs = require("fs");

// UPLOAD SONG
const uploadSong = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email must be provided." });
  }

  // const userId = req.userId;
  // console.log(userId);
  // return res.json({ msg: userId });
  try {
    const foundUser = await musicArtists.findOne({ email }).lean();
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid user." });
    }

    // let fileName;

    if (req.files) {
      const promises = req.files.map(async (file) => {
        const fileStream = fs.createReadStream(file.path);

        const gridFile = new GridFile({
          filename: file.originalname,
          aliases: foundUser._id,
        });
        await gridFile.upload(fileStream);

        file.userId = foundUser._id;
        fs.unlinkSync(file.path);
      });

      await Promise.all(promises);
      return res.status(201).json({ message: `File uploaded successfully` });
    } else {
      return res.status(400).json({ message: "Please choose upload a file" });
    }
  } catch (error) {
    next(error);
  }
};

// utility func

const songFilter = (arr, id) => {
  let container = [];
  arr.map((data) => {
    if (data?.aliases[0] == id) {
      container.push(data);
    }
  });

  return container;
};

// LIST ALL UPLOADED SONGS
const getAllSongs = async (req, res, next) => {
  try {
    const allSongFile = await GridFile.find({});

    if (allSongFile.length === 0) {
      return res.status(400).json({ message: "No song available " });
    }

    return res.status(200).json({ allSongFile });
  } catch (error) {
    throw new Error(error);
  }
};

// DOWNLOAD SONG VIA URL
const downLoadSong = async (req, res, next) => {
  try {
    const { id, name } = req.params;

    if (!id || !name) {
      return res.status(400).json({ message: "Id and Name must be provided." });
    }
    const songFile = await GridFile.findById(id);
    if (!songFile) {
      return res.status(400).json({ message: "Song not found. " });
    }

    res.attachment(name);
    return songFile.downloadStream(res);
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE A SONG FILE
const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Song data must me provided" });
    }

    const foundSong = await GridFile.findById(id);
    if (!foundSong) {
      return res.status(400).json({ message: "Song not found." });
    }

    const deletedSong = await GridFile.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
};

// GET SPECIFIC ARTIST SONGS

const getSpecificArtistSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id must be provided." });
    }

    const foundUser = await musicArtists.findById(id);
    if (!foundUser) {
      return res.status(400).json({ message: "User not found." });
    }

    const userId = foundUser._id;

    const allSongFile = await GridFile.find({});

    if (allSongFile.length === 0) {
      return res.status(400).json({ message: "Empty song list." });
    }

    const songs = songFilter(allSongFile, userId);

    if (songs.length === 0) {
      return res.status(400).json({ message: "Empty song list." });
    }

    return res.status(200).json({ songs });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  uploadSong,
  getAllSongs,
  downLoadSong,
  deleteSong,
  getSpecificArtistSong,
};

// 66869780cb47fb1ae9864f73

// {"_id":{"$oid":"6687c9686ec54d35023e06b1"},"fullName":"user8user8","email":"user8@gmail.com","password":"$2b$10$QjbvALOxM8DtO86WxpHCW.dwxc8ShAK2NadJ56AsahF97TSgU91ca","stageName":"","bio":"","album":"","country":"","releaseDate":"","songNames":[],"createdAt":{"$date":{"$numberLong":"1720174952119"}},"updatedAt":{"$date":{"$numberLong":"1720174952119"}},"__v":{"$numberInt":"0"}}
