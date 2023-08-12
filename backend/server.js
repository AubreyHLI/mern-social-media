// connect to db
require('dotenv').config();
require('./db/dbConnection');

const app = require('./app');

// create server 
const http = require('http');
const httpServer = http.createServer(app);
const PORT = process.env.PORT | 5002;


// connect socket io
const { instrument } = require("@socket.io/admin-ui");
const socketIo = require('./utils/socketIo');
const io = socketIo.getIo(httpServer);
instrument(io, {
    auth: false
});

httpServer.listen(PORT, () => {
    console.log('listening to port', process.env.PORT);
});

