const multer = require('multer');
const path = require('path');
const CustomErrorClass = require('../utils/CustomErrorClass');

const MAX_IMAGE_SIZE = 3 * 1024 * 1024

const fieldSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
        return next(new CustomErrorClass(413, '图片不能大于3M, 请重新上传'));
    } else {
        next()
    }
}

// const storage = multer.diskStorage({
//     destination: function(req, res, cb) {
//         cb(null, path.join(__dirname, '../public/assets'));
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         const filename = file.originalname.split(".")[0];
//         cb(null,filename + "-" + uniqueSuffix + ".png");
//     }
// })

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { fieldSize: MAX_IMAGE_SIZE }  });

module.exports = {
    fieldSizeLimitErrorHandler,
    upload,
}