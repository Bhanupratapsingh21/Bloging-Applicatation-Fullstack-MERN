import mongoose from "mongoose";
import Blog from "../Models/Blogs.models.js";
// check on any edit delete opration that the person who is sending the req is owner admin or not of that post 
async function verifyadmin(req, res, next) {
    const _id = req.params.id; // Assuming you're capturing the ID from the request params
    const ObjectId = mongoose.Types.ObjectId;
    try {
        const blog = await Blog.findById(_id); // Directly search by ID
        if (!blog) {
            return res.status(404).json({"MSG": "Blog not found"});
        }

        // Convert both IDs to ObjectId for comparison
        const userId = new ObjectId(req.user._id);
        const blogOwnerId = new ObjectId(blog.createdBy._id);

        // Use the .equals() method to compare ObjectIDs
        if (!userId.equals(blogOwnerId)) {
            return res.status(401).json({"MSG": "You Are Not The Owner Of This Blog"});
        
        }
        next(); // Move to the next middleware
    } catch (error) {
        console.error("Error in verifyadmin middleware:", error);
        res.status(500).json({"MSG": "Internal Server Error"});
    }
}

export default verifyadmin;
