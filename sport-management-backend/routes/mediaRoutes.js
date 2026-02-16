import express from "express";
import { uploadProfile } from "../controllers/Media.controller.js";
import { uploadProfileMedia } from "../utils/uploader.js";
import { protectPlayer } from "../utils/authPlayer.js"; // or any auth—user must be logged in

const router = express.Router();
router.post("/profile", protectPlayer, uploadProfileMedia, uploadProfile);

export default router;
