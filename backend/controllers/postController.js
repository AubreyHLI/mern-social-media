const Post = require('../models/Post');
const User = require('../models/User');
const asyncHandler = require("../middlewares/asyncHandler");
const CustomErrorClass = require("../utils/CustomErrorClass");
const { uploadToCloudinary, removeFromCloudinary } = require("../utils/cloudinary");


// CREATE
const createPost = asyncHandler( async(req, res, next) => {
    try {
        const { postText, location, picture } = req.body;     
        const newPost = new Post({
            author: req.user.id,
            location,
            postText,
            likes: {},            
        });
        console.log('create 1')
        if(picture) {
            const cloudinaryResult = await uploadToCloudinary(picture, `posts/${req.user.id}`, 800); 
            newPost.postPicture = cloudinaryResult.image;
            console.log('create 2')
        }
        await newPost.save();
        console.log('create 3')

        const posts = await Post.find().populate('author').sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            posts
        })
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
})


// GET ALL POSTS
const getAllPosts = asyncHandler( async(req, res, next) => {
    try {
        const posts = await Post.find().populate('author').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            posts
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// GET ALL POST OF A USER
const getUserPosts = asyncHandler( async(req, res, next) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ author: userId }).populate('author').sort({ createdAt: -1, });
        res.status(200).json({
            success: true,
            posts
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})

// GET A SPECIFIC POST
const getSinglePost = asyncHandler( async(req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate('author');
        if(!post) return next(new CustomErrorClass(400, "Post doesn't exist!"));
        res.status(200).json({
            success: true,
            post
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// LIKE POST
const likePost = asyncHandler( async(req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const post = await Post.findById(postId);

        // check if the likes Map has the userId 
        if(post.likes.has(userId))  post.likes.delete(userId)
        else  post.likes.set(userId, true)

        // update the post 
        const updatedPost = await Post.findByIdAndUpdate(postId, 
            { likes: post.likes },
            { new: true }
        ).populate("author");
        res.status(200).json({
            success: true,
            updatedPost
        })
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// COLLECT POST
const collectPost = asyncHandler( async(req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const user = await User.findById(userId);

        let updatedUser;
        // check if the collects Array has the postId 
        if( user.collects.includes(postId) ) {
            updatedUser = await User.findOneAndUpdate({_id: userId}, {$pull: {collects: postId}}, { new: true });
        } else {
            updatedUser = await User.findOneAndUpdate({_id: userId}, {$push: {collects: postId}}, { new: true });
        }

        res.status(200).json({
            success: true,
            updatedCollects: updatedUser.collects,
        })
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// DELETE POST
const deletePost = asyncHandler( async(req, res, next) => {
    try {
        const { postId } = req.params;        
        const post = await Post.findOneAndDelete({_id: postId});
        
        if(post.postPicture && post.postPicture.public_id) {
            await removeFromCloudinary(post.postPicture)
        }

        const posts = await Post.find().populate('author').sort({ createdAt: -1, });
        res.status(200).json({
            success: true,
            posts
        })
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})



module.exports = {
    createPost,
    getAllPosts,
    getUserPosts,
    getSinglePost,
    likePost,
    collectPost,
    deletePost,
}