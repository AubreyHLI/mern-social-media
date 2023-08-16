const express = require('express');
const router = express.Router();

// controllers 
const {
    createUser,
    loginUser,
    getCurrentUser,
    getCollectedPosts,
    getUserFollowings,
    getUserFollowers,
    addOrRemoveFollowing,
    removeFollower,
    getProfileInfo,
    updateUserInfo,
    generateSuggestedUsers,
} = require('../controllers/userController');

const {
    getUserNotifications,
} = require('../controllers/notificationsController');

// middlewares
const { upload, fieldSizeLimitErrorHandler } = require('../middlewares/multer');
const { verifyToken } = require('../middlewares/auth');

router.post("/register", upload.none(), fieldSizeLimitErrorHandler, createUser);
router.post("/login", loginUser);
router.get("/currentUser", verifyToken, getCurrentUser);
router.get("/collectedPosts", verifyToken, getCollectedPosts);
router.get("/notifications", verifyToken, getUserNotifications);
router.get("/:userId/followings", verifyToken, getUserFollowings);
router.get("/:userId/followers", verifyToken, getUserFollowers);
router.get("/:userId/profileInfo", verifyToken, getProfileInfo);
router.patch("/editProfileInfo", verifyToken, upload.none(), fieldSizeLimitErrorHandler, updateUserInfo);
router.patch("/followings/:followingId", verifyToken, addOrRemoveFollowing);
router.patch("/followers/remove/:followerId", verifyToken, removeFollower);
router.get("/suggestedUsers", verifyToken, generateSuggestedUsers);


module.exports = router;