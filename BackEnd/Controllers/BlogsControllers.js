import Blog from "../Models/Blogs.models.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

async function handleaddblogs (req, res) {
    try {
        // Check if profile image file exists
        const profileImgPath = req.files?.profileimg?.[0]?.path;
        // console.log(req.files)
        const {title,body} = req.body

        if (!profileImgPath) {
            return res.status(400).json({ "msg": "Profile image is required" });
        }
        // Upload image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(profileImgPath);
        if (!uploadedImage) {
            return res.status(500).json({ "msg": "Failed to upload image" });
        }

        const blog = await Blog.create({
            title,
            body,
            coverImageURL : uploadedImage.url,
            createdBy : {
                _id: req.user._id,
                username : req.user.email
            },
        });

        if(!blog) return res.status(501).json({"MSG":"Something want wrong while posting blogs"})
        
        return res.status(201).json(blog)

    } catch (error) {
        console.error(error);
        res.status(500).json({ "msg": "Server error", "error": error.message });
    }
}

async function getblogsbasic (req,res){
    const {q , limit } = req.query;
    let sortOption = {};
    if(q=== "newestfirst"){
        sortOption = { createdAt : -1 };
    }else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }

    const limitOptions = parseInt(limit) || 10 ; // default will be 10 im case url not will hit 

    try {
        const blogs = await Blog.find().sort(sortOption).limit(limitOptions);
        res.status(200).json(blogs)

    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
}

export {
    handleaddblogs,
    getblogsbasic,

}