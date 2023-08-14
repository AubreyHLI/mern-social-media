const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 2, 
        max: 30,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        select: false,
    },
    imageUrl: {
        url: String,
        public_id: String,
        thumbnail: String,
    },
    bio: {
        type: String,
        default: "",
    },
    location: String,
    coverImage: {
        url: String,
        public_id: String,
        thumbnail: String,
    },
    followings: [ {
        type: mongoose.Types.ObjectId,
        ref: "User"
    } ],
    followers: [ {
        type: mongoose.Types.ObjectId,
        ref: "User"
    } ],
    collects: [ {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    } ],
    newNotifCount: { 
        type: Number, 
        default: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);