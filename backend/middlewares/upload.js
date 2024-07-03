import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      callback(null, true);
    } else {
      console.log("Only jpg and png format are supported");
      callback(null, false);
    }
  },

  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export default upload;
