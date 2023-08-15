const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const CustomErrorClass = require("../utils/CustomErrorClass");
const { uploadToCloudinary, removeFromCloudinary } = require("../utils/cloudinary");


// REGISTER
const createUser = asyncHandler(async (req, res, next) => {
    try {
        const {username, email, password, location, picture} = req.body;
        const existUser = await User.findOne({ email });

        if(existUser) {
            return next(new CustomErrorClass(400, '该邮箱已被注册，请填写新邮箱'));
        }

        // else
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            bio: `Hi, 我是 ${username}!`,
            location,
            followings: [],
            followers: [],
            collects: [],
        });
        
        if(picture) {
            const cloudinaryResult = await uploadToCloudinary(picture, `avatars/${newUser._id}`, 240); 
            newUser.imageUrl = cloudinaryResult.image;
        }
        await newUser.save();
        res.status(201).json({
            success: true,
        })
    } catch (error) {
        return next(new CustomErrorClass(500, error.message));
    }
})


// LOGIN
const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const existUser = await User.findOne({ email }).select('+password');
        // 1. 服务端验证：用户是否存在
        if(!existUser) {
            return next(new CustomErrorClass(400, '该用户不存在'));
        }
        // 2. 密码是否正确
        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch) {
            return next(new CustomErrorClass(400, '密码错误'));
        }
        // 3. 通过用户的邮件（唯一的），找到相应的Id，并根据id，使用jwt。sign，返回一个签名的 token 给客户端
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN,
        });
        delete existUser.password;  // don't sent password to frontend
        res.status(200).json({
            success: true,
            token,
        })
    } catch (error) {
        return next(new CustomErrorClass(500, error.message));
    }
})

// According token to get user
const getCurrentUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// GET ALL COLLECTED POST OF A USER
const getCollectedPosts = asyncHandler( async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('collects');
        const userDetails = await User.findById(req.user.id).select('collects')
            .populate({
                path: 'collects',
                populate: {
                    path: 'author',
                    select: '_id username imageUrl'
                }
            });
        res.status(200).json({
            success: true,
            collects: user.collects,
            collectedPosts: userDetails.collects
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// 获取关注列表
const getUserFollowings = asyncHandler(async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
            .select('followings username')
            .populate({
                path: 'followings',
                select: '_id username imageUrl bio'
            });

        res.status(200).json({
            success: true,
            followings: user.followings,
            profilename: user.username
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// 获取粉丝列表
const getUserFollowers = asyncHandler(async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
            .select('followers username')
            .populate({
                path: 'followers',
                select: '_id username imageUrl bio'
            });

        res.status(200).json({
            success: true,
            followers: user.followers,
            profilename: user.username
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


const addOrRemoveFollowing = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { followingId } = req.params;
        const user = await User.findById(userId);

        let updatedUser;
        if(user.followings.includes(followingId)) {
            // remove the following from followings list of user
            updatedUser = await User.findOneAndUpdate({_id: userId}, {$pull: {followings: followingId}}, {new: true});
            // meanwhile, remove user from follower list of removed following(互删)
            await User.findOneAndUpdate({_id: followingId}, {$pull: {followers: userId}});
        } else {
            updatedUser = await User.findOneAndUpdate({_id: userId}, {$push: {followings: followingId}}, {new: true});
            await User.findOneAndUpdate({_id: followingId}, {$push: {followers: userId}});
        }
        
        res.status(200).json({
            success: true,
            followings: updatedUser.followings,
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


const removeFollower = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { followerId } = req.params;
        const user = await User.findById(userId);

        let updatedUser;
        if(user.followers.includes(followerId)) {
            updatedUser = await User.findOneAndUpdate({_id: userId}, {$pull: {followers: followerId}}, {new: true});
            await User.findOneAndUpdate({_id: followerId}, {$pull: {followings: userId}}, {new: true});
        } 

        res.status(200).json({
            success: true,
            followers: updatedUser.followers,
        });
    } catch(error) {
        return next(new CustomErrorClass(400, error.message));
    }
})


const getProfileInfo = asyncHandler(async (req, res, next) => {
    try {
        const profile = await User.findById(req.params.userId).select('-collects');
        res.status(200).json({
            success: true,
            profile
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


const updateUserInfo = asyncHandler(async (req, res, next) => {
    try {
        const { bio, location, username, avatar, cover } = req.body;
        const user = await User.findById(req.user.id);
        user.username = username;
        user.bio = bio;
        user.location = location;
        if(avatar){
            if(user.imageUrl && user.imageUrl.public_id) {
                await removeFromCloudinary(user.imageUrl)
            }
            const cloudinaryResult = await uploadToCloudinary(avatar, `avatars/${user._id}`, 240);
            user.imageUrl = cloudinaryResult.image;
        } 
        if(cover) {
            if(user.coverImage && user.coverImage.public_id) {
                await removeFromCloudinary(user.coverImage)
            }
            const cloudinaryResult = await uploadToCloudinary(cover, `covers/${user._id}`, 800); 
            user.coverImage = cloudinaryResult.image;
        } 
        await user.save();
        res.status(200).json({
            success: true,
            updatedUser: user
        })
    } catch(error) {
        return next(new CustomErrorClass(400, error.message));
    }
})

// SUGGEATION USERS
const generateSuggestedUsers = asyncHandler(async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        let followings = user.followings;
        followings.push(user._id);
        const suggestedUsers = await User.find({_id: { $nin: followings}}).limit(5);
        res.status(200).json({
            success: true,
            suggestedUsers
        })
    } catch(error) {
        return next(new CustomErrorClass(400, error.message));
    }
})





// exports
module.exports = {
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
}