import { Router } from "express";
import Blog from "../Models/Blogs.models.js";
import { upload } from "../Middlewares/Multer.Middleware.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js"
const BlogRouter = Router();

BlogRouter.post("/addblog", upload.fields([
    { name: "profileimg", maxCount: 1 }
]), async (req, res) => {
    try {
        // Check if profile image file exists
        const profileImgPath = req.files?.profileimg?.[0]?.path;
        if (!profileImgPath) {
            return res.status(400).json({ "msg": "Profile image is required" });
        }
        // Upload image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(profileImgPath);
        if (!uploadedImage) {
            return res.status(500).json({ "msg": "Failed to upload image to Cloudinary" });
        }

        // Respond with the uploaded image details
        res.json({ "msg": "Image uploaded successfully", "url": uploadedImage.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "msg": "Server error", "error": error.message });
    }
});

export default BlogRouter