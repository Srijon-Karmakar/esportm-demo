// utils/multer.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'tmp_uploads/'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});

const allowed = new Set([
  'image/jpeg', 'image/png', 'image/webp',
  'video/mp4', 'video/webm', 'video/ogg'
]);

const fileFilter = (_req, file, cb) => {
  if (allowed.has(file.mimetype)) cb(null, true);
  else cb(new Error('Unsupported file type'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB
});

export default upload;
