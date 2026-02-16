import Post from "../models/Post.model.js";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPost = async (req, res) => {
  try {
    const file = req.file;
    const { caption } = req.body;
    if (!file) return res.status(400).json({ message: "Media file required" });

    const upload = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);

    const newPost = await Post.create({
      player: req.user._id,
      caption,
      mediaUrl: upload.secure_url,
      mediaType: upload.resource_type === "video" ? "video" : "image",
    });
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeed = async (_req, res) => {
  const posts = await Post.find()
    .populate("player", "name position")
    .populate("comments.player", "name")
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const alreadyLiked = post.likes.includes(req.user._id);
  if (alreadyLiked) {
    post.likes.pull(req.user._id);
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  res.json({ message: "Like status updated", likes: post.likes.length });
};

export const addComment = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.comments.push({ player: req.user._id, text });
  await post.save();
  res.json({ message: "Comment added", comments: post.comments });
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.player.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
