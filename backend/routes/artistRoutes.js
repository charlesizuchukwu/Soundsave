const express = require("express");
const artistController = require("../controllers/artistController.js");
const artistAuthController = require("../controllers/artistAuthController.js");
import verify from "jsonwebtoken/verify.js";
// import upload from "../middlewares/upload.js";

const router = express.Router();

router.route("/register").post(artistController.register);
router.route("/settings").patch(verifyJwt, artistController.profileSettings);
router.route("/allartists").get(artistController.getAllArtist);

// router.route("/uploadimage").post(artistController.uploadImage);

// AUTHENTICATIONS => LOGIN | LOGOUT | REFRESH

router.route("/login").post(artistAuthController.login);
router.route("/refresh").get(artistAuthController.refresh);
router.route("/logout").get(artistAuthController.logout);

module.exports = router;
