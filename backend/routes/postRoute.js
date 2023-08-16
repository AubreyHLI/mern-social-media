const express = require('express');
const router = express.Router();

// controllers 
const {
    createPost,
    getAllPosts,
    getUserPosts,
    getSinglePost,
    likePost,
    collectPost,
    deletePost,
} = require('../controllers/postController');

const {
    createComment,
    getPostComments,
    likeComment,
    deleteComment,
} = require('../controllers/commentController');

// middlewares
const { upload, fieldSizeLimitErrorHandler } = require('../middlewares/multer');
const { verifyToken, canEditDeletePost, canEditDeleteComment } = require('../middlewares/auth');

router.post("/createPost", verifyToken, upload.none(), fieldSizeLimitErrorHandler, createPost);
router.get("/allPosts", verifyToken, getAllPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", verifyToken, getSinglePost);
router.patch("/:postId/like", verifyToken, likePost);
router.patch("/:postId/collect", verifyToken, collectPost);
router.delete("/:postId/delete", verifyToken, canEditDeletePost, deletePost);

router.post("/:postId/createComment", verifyToken, upload.none(), fieldSizeLimitErrorHandler, createComment);
router.get("/:postId/comments", verifyToken, getPostComments);
router.patch("/:postId/:commentId/like", verifyToken, likeComment);
router.delete("/:postId/:commentId/delete", verifyToken, canEditDeleteComment, deleteComment);

module.exports = router;