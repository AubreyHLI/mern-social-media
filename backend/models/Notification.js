const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    from: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    to: { type: String, required: true },
    notifyType: { type: String, required: true, },
    targetPost: {  
        id: String,
        text: String,
        thumbnail: String,
    },
    targetComment: {  
        id: String,
        text: String,
        thumbnail: String,
    },
    commentContent: {
        id: String,
        text: String,
        thumbnail: String,
    },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date,  default: Date.now },
}, { timestamps: true });


module.exports = mongoose.model("Notification", NotificationSchema);