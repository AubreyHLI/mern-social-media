const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const url = require('url');
const errorHandler = require('./middlewares/errorHandler');

// configuration
require('dotenv').config();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({
    origin: [process.env.CLIENT_URL_LOCAL, process.env.CLIENT_URL,],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));

// route for fetch images 
app.use("/", express.static(path.join(__dirname, './public/assets')))

// import routes
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

app.use('/user', userRoute);
app.use('/post', postRoute);

// error handling
app.use(errorHandler);

module.exports = app;