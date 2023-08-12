class CustomErrorClass extends Error {
    constructor(code, message, errorName='CustomErrorClass') {
        super(message);
        this.statusCode = code;
        this.name=errorName;
        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = CustomErrorClass;