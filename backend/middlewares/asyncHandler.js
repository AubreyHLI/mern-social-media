// handle the exceptions inside of async express routes and pass them to my express error handlers
const asyncHandler = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(next);
    }
}

module.exports = asyncHandler;