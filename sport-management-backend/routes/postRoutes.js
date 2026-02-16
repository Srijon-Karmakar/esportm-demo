import express from "express";
import { protectPlayer } from "../utils/authPlayer.js";
import {
  createPost,
  getFeed,
  toggleLike,
  addComment,
  deletePost,
} from "../controllers/Post.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // use Cloudinary for prod

router.post("/create", protectPlayer, upload.single("media"), createPost);
router.get("/feed", protectPlayer, getFeed);
router.put("/like/:id", protectPlayer, toggleLike);
router.post("/comment/:id", protectPlayer, addComment);
router.delete("/:id", protectPlayer, deletePost);

export default router;
