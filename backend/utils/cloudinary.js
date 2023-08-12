const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const fs = require("fs");

const getThumbnail = (originalUrl) => {
  // Extract the transformation part of the URL (the section after "/upload/")
  const parts = originalUrl.split('/upload/');
  const basePart = parts[0] + '/upload/';
  // Add the transformation parameters to the URL
  const thumbnailUrl = `${basePart}c_thumb,w_100/${parts[1]}`;
  return thumbnailUrl;
}

// upload file to cloudinary 
async function uploadToCloudinary(locaFilePath, subFolderName, width) {
    return cloudinary.uploader
        .upload(locaFilePath, { 
            folder: `mern-socialmedia/${subFolderName}`,
            width: width
        })
        .then(result => {
            // Image has been successfully uploaded on cloudinary, so remove local image file 
            fs.unlinkSync(locaFilePath);
            return {
                message: "Success",
                image: {
                    url: result.secure_url,
                    public_id: result.public_id,
                    thumbnail: getThumbnail(result.secure_url)
                },
            }
        })
        .catch(error => {
            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { 
                message: "Fail",
            }
        })  
}


async function removeFromCloudinary(picture) {
    return await cloudinary.uploader.destroy(picture.public_id)
}


module.exports = {
    uploadToCloudinary,
    removeFromCloudinary
};