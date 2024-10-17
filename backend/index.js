const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.js");
const corsOptions = require("./config/corsOptions.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { dbConn } = require("./config/dbConn.js");
const cors = require("cors");
const artistRoute = require("./routes/artistRoutes.js");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const path = require("path");
const GridFile = require("./models/gridfile.model.js");
const {
  uploadSong,
  getAllSongs,
  downLoadSong,
  deleteSong,
  getSpecificArtistSong,
  streamSong,
} = require("./middlewares/songMiddleware.js");
const fs = require("fs");

const verifyJwt = require("./middlewares/verifyJwt.js");
const isArtist = require("./middlewares/isArtist.js");
// const dotenv = require("dotenv");
// const { uploadSong } = require("./middlewares/songMiddleware.js");

// const  { fileURLToPath } = require("url")

const app = express();
// const url = process.env.DB_URI

dotenv.config();

// console.log(dbConn.db);
// let connection;
// let storage;
// const dbConnection = async () => {
//   try {
//     connection = await mongoose.connect(process.env.DB_URI);
//     storage = new GridFsStorage({ db: connection });
//     console.log(connection);
//   } catch (error) {
//     throw new Error(error);
//   }22
// };

dbConn();

// const start = async () => {
//   // connect to a mongo database
//   const mongodb = new MongoMemoryServer()
//   const connectionUri = await mongodb.getUri()
//   await mongoose.connect(
//     connectionUri, { useNewUrlParser: true, useUnifiedTopology: true }
//   )}

// const mongoUri = mongoose.connect(process.env.DB_URI);

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const port = process.env.PORT || 4000;

// const upload = multer({ dest: "uploads" }); // Store files in 'uploads' directory

app.use(cors(corsOptions));

app.use(express.json());
// app.use(fileUpload());
app.use(cookieParser());
// app.use(multer({ dest: path.join(__dirname, ".") }));

app.use(artistRoute);

// app.post("/upload", verifyJwt, upload.single("song"), uploadSong);
// app.post("/upload", verifyJwt, upload.single("song"), uploadSong);

app.post("/upload", verifyJwt, upload.any(), uploadSong);
app.get("/getallsongs", getAllSongs);
app.get("/downloadsong/:id/:name", downLoadSong);
app.get("/streamsong/:id/:name", streamSong);
app.get("/getsingleartistsongs", verifyJwt, getSpecificArtistSong);
app.delete("/deletesong/:id", verifyJwt, deleteSong);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    return res.json({ error: "Resource not found" });
  } else {
    return res.type("txt").send("Resource not found");
  }
});

// app.use(errorHandler);

mongoose.connection.on("open", () => {
  app.listen(
    port,
    console.log(`Server connected to db and listening on port ${port}...`)
  );
});

mongoose.connection.on("error", (err) => {
  throw new Error(err);
});
