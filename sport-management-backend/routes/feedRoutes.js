// import express from 'express';
// import { createPost, getAllPosts, reactToPost, commentOnPost } from '../controllers/Feed.controllers.js';
// import { protectPlayerOrManager } from '../utils/authCommon.js'; // unified middleware
// import upload from '../utils/multer.js'; // for photo/video uploads

// const router = express.Router();

// router.post('/create', protectPlayerOrManager, upload.single('media'), createPost);
// router.get('/', protectPlayerOrManager, getAllPosts);
// router.put('/react/:id', protectPlayerOrManager, reactToPost);
// router.post('/comment/:id', protectPlayerOrManager, commentOnPost);
// // routes/feedRoutes.js
// router.put('/:id', protectPlayerOrManager, upload.single('media'), updatePost);   // edit caption/media
// router.delete('/:id', protectPlayerOrManager, deletePost);                        // owner-only delete
// // router.get('/', protectPlayerOrManager, getAllPosts); // already present (add page,limit)


// export default router;







import express from 'express';
import {
  createPost,
  getAllPosts,
  reactToPost,
  commentOnPost,
  updatePost,
  deletePost,
} from '../controllers/Feed.controllers.js';

import { protectPlayerOrManager } from '../utils/authCommon.js';
import upload from '../utils/multer.js';

const router = express.Router();

// 🟢 Create Post
router.post('/create', protectPlayerOrManager, upload.single('media'), createPost);

// 🟢 Get All Posts (with pagination)
router.get('/', protectPlayerOrManager, getAllPosts);

// 🟢 React to Post
router.put('/react/:id', protectPlayerOrManager, reactToPost);

// 🟢 Comment on Post
router.post('/comment/:id', protectPlayerOrManager, commentOnPost);

// 🟡 Edit Post (caption/media)
router.put('/:id', protectPlayerOrManager, upload.single('media'), updatePost);

// 🔴 Delete Post (owner only)
router.delete('/:id', protectPlayerOrManager, deletePost);

export default router;
