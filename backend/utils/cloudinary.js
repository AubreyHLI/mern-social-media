const cloudinary = require('cloudinary').v2;
const { Readable } = require("stream");

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


// upload file to cloudinary 
/*
async function uploadToCloudinary(base64File, subFolderName, width) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(base64File, { 
            folder: `mern-socialmedia/${subFolderName}`,
            width: width
        }, (error, result) => {
            if(result && result.secure_url) {
                return resolve({
                    image: {
                        url: result.secure_url,
                        public_id: result.public_id,
                        thumbnail: getThumbnail(result.secure_url)
                    }
                });
            } else {
                console.log(error.message);
                reject({ message: error.message });
            }
        })
    })
}*/


// upload buffer file to cloudinary 
async function uploadStreamToCloudinary(buffer, subFolderName, width ) {
    return new Promise((resolve, reject) => {
        const theTransformStream = cloudinary.uploader.upload_stream(
            { 
                folder: `mern-socialmedia/${subFolderName}`,
                width: width
            },
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
        let str = Readable.from(buffer);
        str.pipe(theTransformStream);  // pipe the readable stream into writable stream
    });
}


async function removeFromCloudinary(picture) {
    return await cloudinary.uploader.destroy(picture.public_id)
}


const getCloundinaryThumbnail = (originalUrl) => {
    // Extract the transformation part of the URL (the section after "/upload/")
    const parts = originalUrl.split('/upload/');
    const basePart = parts[0] + '/upload/';
    // Add the transformation parameters to the URL
    const thumbnailUrl = `${basePart}c_thumb,w_100/${parts[1]}`;
    return thumbnailUrl;
}


module.exports = {
    removeFromCloudinary,
    uploadStreamToCloudinary,
    getCloundinaryThumbnail
};