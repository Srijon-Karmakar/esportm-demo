// utils/uploader.js
import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const kind = file.fieldname === "avatar" ? "avatars" : "banners";
    const dir = path.join(process.cwd(), "uploads", kind);
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});

export const uploadProfileMedia = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg","image/png","image/webp","image/jpg"].includes(file.mimetype);
    cb(ok ? null : new Error("Only jpg/png/webp allowed"), ok);
  }
}).fields([{ name: "avatar", maxCount: 1 }, { name: "banner", maxCount: 1 }]);
