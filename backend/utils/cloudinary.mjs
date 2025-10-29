import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image"
        })
        console.log(`Image is uploaded on cloudinary: ${result}`)
        return result;
    } catch (error) {
        fs.unlink(localFilePath, (err) => {
            console.log(`Error removing file from local server`)
            return null;
        })
        return null;
    }
}

const removeFromCloudinary = async (public_id) => {
    try {
        if (!public_id) {
            return null;
        }
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image"
        })
        console.log(`Image is removed from cloudinary: ${result}`);
        return result;
    } catch (error) {
        console.log(`Error removing image from cloudinary: ${error.message}`)
        return null;
    }
}

export {
    uploadOnCloudinary,
    removeFromCloudinary
}