import { Router } from "express";
import User from "../Models/User.models.js"
const UserRouter = Router();

UserRouter.post("/signin",(req,res)=>{
    return res.send("signin")
})


UserRouter.post("/signup",async(req,res)=>{
    const { fullname,email,password } = req.body;
    
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const user =  await User.create({
        fullname,
        email,
        password
    })
    
    return res.json({user})
})


export default  UserRouter
