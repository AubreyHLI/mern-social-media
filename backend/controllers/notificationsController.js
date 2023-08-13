const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const asyncHandler = require("../middlewares/asyncHandler");
const CustomErrorClass = require("../utils/CustomErrorClass");


const getUserNewNotifications = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const followType = await Notification.find({to: userId, notifyType: 'follow', isRead: false })
            .populate({
                path: 'from',
                select: '_id username imageUrl'
            })
            .sort({ createdAt: -1, });
        const commentOrLikeType = await Notification.find({to: userId, notifyType: {$nin: 'follow'},  isRead: false })
            .populate({
                path: 'from',
                select: '_id username imageUrl'
            })
            .sort({ createdAt: -1, });
        res.status(200).json({
            success: true,
            newNotifications: {
                followType,
                commentOrLikeType,
            }
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})

const readAllNewNotifications = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {'newNotifications.followType': [], 'newNotifications.commentOrLikeType': []})
        
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})

module.exports = {
    getUserNewNotifications
}