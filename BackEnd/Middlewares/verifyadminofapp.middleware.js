import Blog from "../Models/Blogs.models.js";
// check on any edit delete opration that the person who is sending the req is application admin or not 
async function verifyapplicationadmin(req, res, next) {
    const _id = req.params.id; // Assuming you're capturing the ID from the request params
    
    try {
        const blog = await Blog.findById(_id); // Directly search by ID
        if (!blog) {
            return res.status(404).json({"MSG": "Blog not found"});
        }
        if(!blog.role === "ADMIN"){
            return res.status(404).json({"MSG": "Not a Admin Req"});
        }
        next(); // Move to the next middleware
    } catch (error) {
        console.error("Error in verifyadmin middleware:", error);
        res.status(500).json({"MSG": "Internal Server Error"});
    }
}

export default verifyapplicationadmin;
