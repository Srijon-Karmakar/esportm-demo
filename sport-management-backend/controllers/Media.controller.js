// controllers/Media.controller.js
export const uploadProfile = async (req, res) => {
  try {
    const files = req.files || {};
    const out = {};
    if (files.avatar?.[0]) {
      out.avatarUrl = `/uploads/avatars/${files.avatar[0].filename}`;
    }
    if (files.banner?.[0]) {
      out.bannerUrl = `/uploads/banners/${files.banner[0].filename}`;
    }
    return res.json(out);
  } catch (e) {
    return res.status(400).json({ message: e.message || "Upload failed" });
  }
};
