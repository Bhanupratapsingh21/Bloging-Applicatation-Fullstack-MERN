import { Router } from "express";
import Blog from "../Models/Blogs.models.js";
import { upload } from "../Middlewares/Multer.Middleware.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js"
import { 
    handleaddblogs ,
    getblogsbasic,
} from "../Controllers/BlogsControllers.js"; 
import checkforAuthenticationCookie from "../Middlewares/Authentication.js";

const BlogRouter = Router();

BlogRouter.post("/addblog" , checkforAuthenticationCookie , upload.fields([
    { name: "profileimg", maxCount: 1 }
]) ,handleaddblogs  );

BlogRouter.get("/getblogs" , getblogsbasic);

export default BlogRouter