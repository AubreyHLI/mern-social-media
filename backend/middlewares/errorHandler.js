const CustomErrorClass = require('../utils/CustomErrorClass');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    console.log('error.message:', err.message);
    console.log('error:', err);
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
    })
}

