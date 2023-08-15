const Post = require('../models/Post');
const Comment = require('../models/Comment');
const asyncHandler = require("../middlewares/asyncHandler");
const CustomErrorClass = require("../utils/CustomErrorClass");
const { uploadToCloudinary, removeFromCloudinary } = require("../utils/cloudinary");


// Comments
const createComment = asyncHandler( async(req, res, next) => {
    try {
        const { postId } = req.params;
        const { commentText, picture } = req.body;

        const newComment = new Comment({
            author: Object(req.user.id),
            postId,
            commentText,
        });
        if(picture) {
            const cloudinaryResult = await uploadToCloudinary(picture, `comments/${postId}`, 400); 
            newComment.commentPicture = cloudinaryResult.image;
        }
        await newComment.save();

        const post = await Post.findById(postId);
        post.comments.unshift(newComment._id);
        await post.save();

        const updatedPost = await Post.findById(postId).populate('author');
        res.status(201).json({
            success: true,
            updatedPost,
            newComment: {
                id: newComment._id,
                text: newComment?.commentText,
                withImage: newComment.commentPicture.url ? true : false
            },
        })
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
})

// GET ALL COMMENTS OF A POST
const getPostComments = asyncHandler( async(req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId: postId })
            .populate({
                path: 'author',
                select: '_id username imageUrl'
            })
            .sort({ createdAt: -1, });
        res.status(200).json({
            success: true,
            comments
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// LIKE A COMMENT
const likeComment = asyncHandler( async(req, res, next) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const comment = await Comment.findById(commentId).populate({
            path: 'author',
            select: '_id username imageUrl'
        })
        if( comment.likes.has(userId) ) {
            comment.likes.delete(userId)
        } else {
            comment.likes.set(userId, true)
        }
        comment.save();
        res.status(200).json({
            success: true,
            updatedComment: comment
        })
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// DELETE A COMMENT OF CERTAIN POST
const deleteComment = asyncHandler( async(req, res, next) => {
    try {
        const { commentId, postId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);

        if(comment.commentPicture && comment.commentPicture.public_id) {
            await removeFromCloudinary(comment.commentPicture)
        }

        const updatedPost = await Post.findOneAndUpdate({_id: postId}, {$pull: {comments: commentId}}, { new: true });

        res.status(200).json({
            success: true,
            updatedComments: updatedPost.comments
        })
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


module.exports = {
    createComment,
    getPostComments,
    likeComment,
    deleteComment,
}