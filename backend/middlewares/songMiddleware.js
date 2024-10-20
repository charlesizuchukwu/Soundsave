const { musicArtists } = require("../models/artistModel");
const GridFile = require("../models/gridfile.model");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const path = require("path");

// UPLOAD SONG
const uploadSong = async (req, res, next) => {
  const id = req.user;

  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "User id must be provided." });
  }

  try {
    const foundUser = await musicArtists.findOne({ _id: id }).lean();
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid user." });
    }

    // let fileName;

    if (req.files) {
      const promises = req.files.map(async (file) => {
        console.log(file);

        const fileStream = fs.createReadStream(file.path);
        // const fileStream = fs.createReadStream(path.join(__dirname, 'attachment.pdf'))

        const gridFile = new GridFile();
        gridFile.filename = file.originalname;
        gridFile.aliases = foundUser._id;

        await gridFile.upload(fileStream);

        file.userId = foundUser._id;

        fs.unlinkSync(file.path);
      });

      await Promise.all(promises);
      return res.status(201).json({ message: `File uploaded successfully` });
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
    // const sg = songFile.fileStream(res);
    return songFile.downloadStream(res);
  } catch (error) {
    throw new Error(error);
  }
};

// LISTEN TO SONG
const streamSong = async (req, res, next) => {
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
    // const sg = songFile.
    // return true;
    // const upload = songFile.getUploadStream(res);
    return res.send("it worked");

    // const options = {
    //   root: path.join(__dirname),
    // };
    // filepath = path.join(
    //   __dirname,
    //   "../uploads",
    //   path.normalize(upload.filename)
    // );
    // return res.sendFile(filepath);

    // return res.status(200).json({ dt: "sent" });
    // return res.sendFile(path.join(__dirname, "../public", "main.html"));
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

const getSpecificArtistSong = asyncHandler(async (req, res, next) => {
  // return res.send(req.params);
  // const { id } = req.params;
  const id = req.user;
  // console.log(id);

  if (!id) {
    return res.status(400).json({ message: "User id must be provided." });
  }

  // return res.status(200).json({ id });

  const foundUser = await musicArtists.findOne({ _id: id });
  if (!foundUser) return res.status(400).json({ message: "User not found." });

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
  throw new Error(error);
  return res.status(500).json({ err: error });
});

module.exports = {
  uploadSong,
  getAllSongs,
  downLoadSong,
  deleteSong,
  getSpecificArtistSong,
  streamSong,
};

// 66869780cb47fb1ae9864f73

// {"_id":{"$oid":"6687c9686ec54d35023e06b1"},"fullName":"user8user8","email":"user8@gmail.com","password":"$2b$10$QjbvALOxM8DtO86WxpHCW.dwxc8ShAK2NadJ56AsahF97TSgU91ca","stageName":"","bio":"","album":"","country":"","releaseDate":"","songNames":[],"createdAt":{"$date":{"$numberLong":"1720174952119"}},"updatedAt":{"$date":{"$numberLong":"1720174952119"}},"__v":{"$numberInt":"0"}}
