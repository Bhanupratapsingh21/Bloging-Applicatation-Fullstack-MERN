import { Router } from "express";
import Blog from "../Models/Blogs.models.js";
import { upload } from "../Middlewares/Multer.Middleware.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js"
import { 
    handleaddblogs ,
    getblogsbasic,
    updateeditblogs,
    deleteblogs,
    handlegetindividualblog
} from "../Controllers/BlogsControllers.js"; 
import checkforAuthenticationCookie from "../Middlewares/Authentication.js";
import verifyadmin from "../Middlewares/CheckforAdmin.middleware.js";
import verifyapplicationadmin from "../Middlewares/verifyadminofapp.middleware.js";

const BlogRouter = Router();

BlogRouter.post("/addblog" , checkforAuthenticationCookie , upload.fields([
    { name: "profileimg", maxCount: 1 }
]) , handleaddblogs );

BlogRouter.get("/getblogs" , getblogsbasic);

BlogRouter.get("/getblog/:id",handlegetindividualblog);

BlogRouter.post("/editblogs/:id",checkforAuthenticationCookie,verifyadmin,upload.fields([
    { name: "profileimg", maxCount: 1 }
]) ,updateeditblogs );

BlogRouter.get("/deleteblog/:id",checkforAuthenticationCookie ,verifyadmin,deleteblogs );

BlogRouter.post("/admin/editblog/:id",checkforAuthenticationCookie,verifyapplicationadmin,upload.fields([
    { name: "profileimg", maxCount: 1 }
]) ,updateeditblogs);

BlogRouter.get("/admin/deleteblog/:id",checkforAuthenticationCookie,verifyapplicationadmin,deleteblogs);

export default BlogRouter