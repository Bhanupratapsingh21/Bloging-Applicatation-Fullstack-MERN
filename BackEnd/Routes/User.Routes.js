import { Router } from "express";
import User from "../Models/User.models.js"
const UserRouter = Router();

UserRouter.post("/signin",async(req,res)=>{
    const { email , password } = req.body;
    // create a virtual funtion so it is used to create a funtion to 
    const user = await User.matchPassword(email,password)
    return res.json(user)

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
