import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConn } from "./config/dbConn.js";
import cors from "cors";
import artistRoute from "./routes/artistRoutes.js";
import fileUpload from "express-fileupload";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

const app = express();

dotenv.config();

dbConn();
// console.log(dbConn.db);
const port = process.env.PORT || 4000;
// get resolved path to the file
// const __fileName = fileURLToPath(import.meta.url);
// get the name of the directory
// const __dirname = path.join(__fileName);

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
// app.use(multer({ dest: path.join(__dirname, ".") }));

app.use(artistRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    return res.json({ error: "Resource not found" });
  } else {
    return res.type("txt").send("Resource not found");
  }
});

app.use(errorHandler);

mongoose.connection.on("open", () => {
  app.listen(
    port,
    console.log(`Server connected to db and listening on port ${port}...`)
  );
});

mongoose.connection.on("error", (err) => {
  throw new Error(err);
});
