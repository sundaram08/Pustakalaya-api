const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null

        const response =  await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        console.log("File uploaded successfully",response.url);
        fs.unlinkSync(localFilePath)
        return response.url
    } catch (error) {
        fs.unlinkSync(localFilePath) // to remove the file from the local as the operation got failed
    }
  }

module.exports =  {uploadOnCloudinary}