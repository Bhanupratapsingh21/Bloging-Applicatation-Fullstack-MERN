import Blog from "../Models/Blogs.models.js";
import { deletefromcloudinary, uploadOnCloudinary } from "../Utils/Cloudinary.js";

async function handleaddblogs(req, res) {
    try {
        // Check if profile image file exists
        const profileImgPath = req.files?.profileimg?.[0]?.path;
        // console.log(req.files)
        const { title, body } = req.body

        if (!profileImgPath) {
            return res.status(400).json({ "MSG": "Profile image is required" });
        }
        // Upload image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(profileImgPath);
        if (!uploadedImage) {
            return res.status(500).json({ "MSG": "Failed to upload image" });
        }

        const blog = await Blog.create({
            title,
            body,
            coverImageURL: {
                url: uploadedImage.url,
                public_id : uploadedImage.public_id
            },
            createdBy: {
                _id: req.user._id,
                username: req.user.email,
                profileimg: req.user.profileImageURL,
            },
        });

        if (!blog) return res.status(501).json({ "MSG": "Something want wrong while posting blogs" })

        return res.status(201).json(blog)

    } catch (error) {
        console.error(error);
        res.status(500).json({ "MSG": "Server error", "error": error.message });
    }
}

async function getblogsbasic(req, res) {
    const { q, limit } = req.query;
    let sortOption = {};
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }

    const limitOptions = parseInt(limit) || 10; // default will be 10 im case url not will hit 

    try {
        const blogs = await Blog.find().sort(sortOption).limit(limitOptions);
        res.status(200).json(blogs)

    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateeditblogs(req, res) {
    const _id = req.params.id;
    try {
        const profileImgPath = req.files?.profileimg?.[0]?.path;
        const { title, body } = req.body;

        // Initialize blogsdata with the necessary fields
        const blogsdata = { 
            title,
            body,
            createdBy: {
                _id: req.user._id,
                username: req.user.email,
                profileimg: req.user.profileImageURL,
            }
        };

        if (profileImgPath) {
            const uploadedImage = await uploadOnCloudinary(profileImgPath);
            const lastblogimage = await Blog.findById(_id);
            if (lastblogimage && lastblogimage.coverImageURL && lastblogimage.coverImageURL.public_id) {
                await deletefromcloudinary(lastblogimage.coverImageURL.public_id);
            }

            if (!uploadedImage) {
                return res.status(500).json({ "MSG": "Failed to upload image" });
            }

            blogsdata.coverImageURL = {
                url: uploadedImage.url,
                public_id: uploadedImage.public_id
            };
        }

        const updatedblog = await Blog.findByIdAndUpdate(_id, blogsdata, { new: true });

        if (!updatedblog) return res.status(404).json({ "MSG": "BLOG Not Found" });

        return res.status(200).json({ "MSG": "BLOG Updated", updatedblog });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ "MSG": "Internal Server Error" });
    }
}


async function deleteblogs (req,res){
    const _id = req.params.id;
    try {
        const blogsresult = await Blog.findByIdAndDelete(_id)
        if(!blogsresult) return res.status(404).json({ "MSG" : "Can't Find The Blog By ID"});
        
        const resdeletefromcloudinary = await deletefromcloudinary(blogsresult?.coverImageURL?.public_id);

        return res.status(200).json({"MSG" : "Blog Deleted SuccessFully"})
    } catch (error) {
        console.log(error)
        return res.status(501).json({"MSG" : "Something Want Wrong"})
    }
}

async function handlegetindividualblog (req,res){
    const _id = req.params.id;
    try {
        
        const blog = await Blog.findById({_id});
        
        if(!blog) return res.stutus(404).json({"MSG":"Yoor Req blog Not Found"});

        return res.status(200).json(blog);

    } catch (error) {
        console.log(error);
        return res.status(501).json({"MSG" : "Something Want Wrong"});
    }
}

export {
    handleaddblogs,
    getblogsbasic,
    updateeditblogs,
    deleteblogs,
    handlegetindividualblog,
}