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
    getUserNewNotifications,
} = require('../controllers/notificationsController');

// middlewares
const { upload } = require('../middlewares/multer');
const { verifyToken } = require('../middlewares/auth');

router.post("/register", upload.single("picture"), createUser);
router.post("/login", loginUser);
router.get("/currentUser", verifyToken, getCurrentUser);
router.get("/collectedPosts", verifyToken, getCollectedPosts);
router.get("/newNotifications", verifyToken, getUserNewNotifications);
router.get("/:userId/followings", verifyToken, getUserFollowings);
router.get("/:userId/followers", verifyToken, getUserFollowers);
router.get("/:userId/profileInfo", verifyToken, getProfileInfo);
router.patch("/editProfileInfo", verifyToken, upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "cover", maxCount:1}
]), updateUserInfo);
router.patch("/followings/:followingId", verifyToken, addOrRemoveFollowing);
router.patch("/followers/remove/:followerId", verifyToken, removeFollower);
router.get("/suggestedUsers", verifyToken, generateSuggestedUsers);


module.exports = router;