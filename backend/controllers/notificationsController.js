const User = require('../models/User');
const Notification = require('../models/Notification');
const asyncHandler = require("../middlewares/asyncHandler");
const CustomErrorClass = require("../utils/CustomErrorClass");


const getUserNotifications = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const currentDate = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        // get read notifications 
        const readNotifications = await Notification.find({to: userId, isRead: true, createdAt: { $gte: thirtyDaysAgo }})
            .populate({ path: 'from', select: '_id username imageUrl'})
            .sort({ createdAt: -1, });

        const categorizedNotifs = {
            followType: { newNotifs: [], sevenDays: [], thirtyDays: [] },
            commentOrLikeType: { newNotifs: [], sevenDays: [], thirtyDays: [] },
        };
    
        readNotifications.forEach(n => {
            const age =  n.createdAt >= sevenDaysAgo ? 'sevenDays' : 'thirtyDays';
            const type = n.notifyType === 'follow' ? 'followType' : 'commentOrLikeType';
            categorizedNotifs[type][age].push(n);
        });

        // get new notifications
        const newNotifications = await Notification.find({to: userId, isRead: false })
            .populate({ path: 'from', select: '_id username imageUrl'})
            .sort({ createdAt: -1, });
    
        const notifIds = newNotifications.map(n => {
            if(n.notifyType === 'follow') categorizedNotifs['followType']['newNotifs'].push(n);
            else categorizedNotifs['commentOrLikeType']['newNotifs'].push(n);
            return n._id
        });

        await Notification.updateMany({ _id: { $in: notifIds } }, { $set: { isRead: true } });
        
        res.status(200).json({
            success: true,
            categorizedNotifs
        });
    } catch(error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


module.exports = {
    getUserNotifications,
}