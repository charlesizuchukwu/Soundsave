import express from "express";
import artistController from "../controllers/artistController.js";
// import upload from "../middlewares/upload.js";

const router = express.Router();

router.route("/register").post(artistController.register);
router.route("/uploadimage").post(artistController.uploadImage);

export default router;
