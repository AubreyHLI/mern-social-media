const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    postId: { type: String },
    commentText: { type: String },
    commentPicture:  {
        url: String,
        public_id: String,
        thumbnail: String,
    },
    likes:  { 
        type: Map,
        of: Boolean,
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);