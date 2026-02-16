





import Feed from '../models/Feed.model.js';
import cloudinary from '../utils/cloudinary.js';

// ========================
// CREATE POST
// ========================
export const createPost = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;
    const user = req.user._id;
    const userType = req.role;

    let mediaUrl = '';
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: 'sportbit-feed',
        resource_type: mediaType === 'video' ? 'video' : 'image',
      });
      mediaUrl = upload.secure_url;
    }

    const post = await Feed.create({ user, userType, caption, mediaUrl, mediaType });
    const populated = await post.populate('user');
    res.status(201).json({ message: 'Post created successfully', post: populated });
  } catch (err) {
    console.error('createPost error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========================
// GET ALL POSTS (with pagination)
// ========================
export const getAllPosts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 30);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Feed.find()
        .populate('user')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Feed.countDocuments(),
    ]);

    res.json({
      items,
      total,
      hasMore: skip + items.length < total,
      page,
    });
  } catch (err) {
    console.error('getAllPosts error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========================
// REACT TO A POST
// ========================
export const reactToPost = async (req, res) => {
  try {
    const { reaction } = req.body;
    const user = req.user._id;
    const userType = req.role;

    const post = await Feed.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const existing = post.reactions.find(r => r.user.toString() === user.toString());
    if (existing) {
      existing.type = reaction;
    } else {
      post.reactions.push({ user, userType, type: reaction });
    }

    await post.save();
    const populated = await post.populate('user');
    res.json({ message: 'Reaction added', post: populated });
  } catch (err) {
    console.error('reactToPost error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========================
// COMMENT ON A POST
// ========================
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const user = req.user._id;
    const userType = req.role;

    const post = await Feed.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user, userType, text });
    await post.save();

    const populated = await post.populate('user');
    res.json({ message: 'Comment added', post: populated });
  } catch (err) {
    console.error('commentOnPost error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========================
// UPDATE POST (owner only)
// ========================
export const updatePost = async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to edit this post' });
    }

    if (req.body.caption !== undefined) post.caption = req.body.caption;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: 'sportbit-feed',
        resource_type: req.body.mediaType === 'video' ? 'video' : 'image',
      });
      post.mediaUrl = upload.secure_url;
      post.mediaType = req.body.mediaType || post.mediaType;
    }

    await post.save();
    const populated = await post.populate('user');
    res.json({ message: 'Post updated successfully', post: populated });
  } catch (err) {
    console.error('updatePost error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========================
// DELETE POST (owner only)
// ========================
export const deletePost = async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('deletePost error:', err);
    res.status(500).json({ error: err.message });
  }
};






















// import Feed from '../models/Feed.model.js';
// import cloudinary from '../utils/cloudinary.js';

// /* Small helper so we don’t repeat populate chains everywhere */
// const postPopulates = [
//   { path: 'user', select: 'name avatar' },
//   { path: 'comments.user', select: 'name avatar' },
// ];

// /* ========================
//    CREATE POST
//    ======================== */
// export const createPost = async (req, res) => {
//   try {
//     const { caption, mediaType } = req.body;
//     const user = req.user._id;
//     const userType = req.role;

//     let mediaUrl = '';
//     if (req.file) {
//       const upload = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'sportbit-feed',
//         resource_type: mediaType === 'video' ? 'video' : 'image',
//       });
//       mediaUrl = upload.secure_url;
//     }

//     const post = await Feed.create({ user, userType, caption, mediaUrl, mediaType });

//     // populate user (name, avatar) and comments' users (if any)
//     const populated = await Feed.findById(post._id).populate(postPopulates);
//     res.status(201).json({ message: 'Post created successfully', post: populated });
//   } catch (err) {
//     console.error('createPost error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ========================
//    GET ALL POSTS (with pagination)
//    ======================== */
// export const getAllPosts = async (req, res) => {
//   try {
//     const page = Math.max(parseInt(req.query.page) || 1, 1);
//     const limit = Math.min(parseInt(req.query.limit) || 10, 30);
//     const skip = (page - 1) * limit;

//     const [items, total] = await Promise.all([
//       Feed.find()
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .populate(postPopulates)
//         .lean(), // fast, read-only result
//       Feed.countDocuments(),
//     ]);

//     res.json({
//       items,
//       total,
//       hasMore: skip + items.length < total,
//       page,
//     });
//   } catch (err) {
//     console.error('getAllPosts error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ========================
//    REACT TO A POST
//    ======================== */
// export const reactToPost = async (req, res) => {
//   try {
//     const { reaction } = req.body;
//     const user = req.user._id;
//     const userType = req.role;

//     const post = await Feed.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     const existing = post.reactions.find(r => r.user.toString() === user.toString());
//     if (existing) {
//       existing.type = reaction;
//     } else {
//       post.reactions.push({ user, userType, type: reaction });
//     }

//     await post.save();

//     // return populated post
//     const populated = await Feed.findById(post._id).populate(postPopulates);
//     res.json({ message: 'Reaction added', post: populated });
//   } catch (err) {
//     console.error('reactToPost error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ========================
//    COMMENT ON A POST
//    ======================== */
// export const commentOnPost = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const user = req.user._id;
//     const userType = req.role;

//     const post = await Feed.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     post.comments.push({ user, userType, text });
//     await post.save();

//     // return populated post with comments.user populated
//     const populated = await Feed.findById(post._id).populate(postPopulates);
//     res.json({ message: 'Comment added', post: populated });
//   } catch (err) {
//     console.error('commentOnPost error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ========================
//    UPDATE POST (owner only)
//    ======================== */
// export const updatePost = async (req, res) => {
//   try {
//     const post = await Feed.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     if (post.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'You are not allowed to edit this post' });
//     }

//     if (req.body.caption !== undefined) post.caption = req.body.caption;

//     if (req.file) {
//       const upload = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'sportbit-feed',
//         resource_type: req.body.mediaType === 'video' ? 'video' : 'image',
//       });
//       post.mediaUrl = upload.secure_url;
//       post.mediaType = req.body.mediaType || post.mediaType;
//     }

//     await post.save();

//     const populated = await Feed.findById(post._id).populate(postPopulates);
//     res.json({ message: 'Post updated successfully', post: populated });
//   } catch (err) {
//     console.error('updatePost error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ========================
//    DELETE POST (owner only)
//    ======================== */
// export const deletePost = async (req, res) => {
//   try {
//     const post = await Feed.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     if (post.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'You are not allowed to delete this post' });
//     }

//     await post.deleteOne();
//     res.json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     console.error('deletePost error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
