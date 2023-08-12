const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const verifyToken = asyncHandler( async(req, res, next) => {
    try{
        let token = req.header("Authorization");
        // console.log('token:', token);
        if(!token) {
            return next(new CustomErrorClass(403, 'Access Denied'));
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
        next();
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
})

const canEditDeletePost = asyncHandler( async(req, res, next) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(req.user.id != post.author) {
            return  next(new CustomErrorClass(402, 'UnAuthorized Access'));
        } else {
            next();
        }
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
})

const canEditDeleteComment = asyncHandler( async(req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(req.user.id != comment.author) {
            return  next(new CustomErrorClass(402, 'UnAuthorized Access'));
        } else {
            next();
        }
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
})

module.exports = { 
    verifyToken,
    canEditDeletePost,
    canEditDeleteComment,
}