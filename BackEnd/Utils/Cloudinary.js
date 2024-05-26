import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import { configDotenv } from "dotenv"
import path from "path";

configDotenv({
    path: "./.env"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("Local file path is required");
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Ensure local file is deleted even if upload fails
        if (fs.existsSync(localFilePath)) {
            // fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

export { uploadOnCloudinary };
