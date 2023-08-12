const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    location: String,
    postText: String,
    postPicture: {
        url: String,
        public_id: String,
        thumbnail: String,
    },
    postPictureThumbnail: {
        url: String,
        public_id: String,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });


// 'pre' middleware function 
PostSchema.pre('findOneAndDelete', async function (next) {
    try {
        const postId = this.getQuery()["_id"];
        // delete all comments of the selected post
        await mongoose.model("Comment").deleteMany({'postId': postId});

        // remove this post for collected posts of users
        await mongoose.model("User").updateMany({}, {$pull: {collects: {$in: postId}}}, {new: true})
        console.log('success');
        next();
    } catch (err) {
        console.log(`[error] ${err}`);
        next(err);
    }  
})


module.exports = mongoose.model("Post", PostSchema);
