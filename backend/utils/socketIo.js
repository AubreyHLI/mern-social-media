/**
 * Server Side:
 * 1. send event to every client: io.emit( )
 * 2. send event to one client: io.to(socketId).emit( )
 * 3. take event from client: socket.on( )
 * 
 * Client Side:
 * 1. send event to server: socket.emit( )
 * 2. take event from server: socket.on( )
 */
const Notification = require('../models/Notification');
const User = require('../models/User');
const { Server } = require("socket.io");

const getIo = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [process.env.CLIENT_URL_LOCAL, "https://admin.socket.io"],
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    let onlineUsers = [];
    const addNewConUser = (userId, socketId) => {
        let hasUser = onlineUsers.some(u => u.userId === userId);
        if(!hasUser) onlineUsers.push({ userId, socketId });
    }
    const removeConUser = (socketId) => {
        onlineUsers = onlineUsers.filter(u => u.socketId !== socketId);
    }
    const getConUser = (userId) => {
        return onlineUsers.find(u => u.userId === userId);
    }


    /* Socket logic starts here */
    io.on("connection", (socket) => {
        console.log("Someone has connected socket.io:" + socket.id);

        socket.on("new-conUser", (userId) => {
            removeConUser(socket.id);
            addNewConUser(userId, socket.id);
            console.log(onlineUsers);
        });

        socket.on("remove-conUser", () => {
            removeConUser(socket.id);
            console.log(onlineUsers);
        })
        
        socket.on("send-notification", async ({ senderId, receiverId, type, targetPost, targetComment, commentContent }) => {
            try{
                if(senderId !== receiverId) {
                    const newNotification = new Notification({
                        from: senderId,
                        to: receiverId,
                        notifyType: type,
                        targetPost,
                        targetComment,
                        commentContent
                    });
                    await newNotification.save();
                    await User.updateOne({ _id: receiverId }, { $inc: { newNotifCount: 1 } });
                    const receiver = getConUser(receiverId);
                    if(receiver) {
                        io.to(receiver.socketId).emit('new-notification');
                    } 
                }
            } catch(error) {
                io.to('socket-error', error)
            }
        });

        socket.on("read-newNotifications", async (receiverId) => {
            try{
                await User.updateOne({ _id: receiverId }, { $set: { newNotifCount: 0 } });
            } catch(error) {
                io.to('socket-error', error)
            }
        })


        socket.on("disconnect", () => {
            console.log("disconnect socket.io:" + socket.id);
            removeConUser(socket.id);
            console.log(onlineUsers);
        });
    });

    return io;
}


module.exports = {
    getIo
}