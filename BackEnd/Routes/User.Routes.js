import { Router } from "express";
const UserRouter = Router();
import { 
    handlesignin,
    handlesignup,
    handlelogout,
    handleadminlogin
} from "../Controllers/User.controllers.js";

UserRouter.post("/signin", handlesignin);

UserRouter.post("/signup", handlesignup);

UserRouter.get("/logout", handlelogout);

UserRouter.post("/adminlogin",handleadminlogin);


export default UserRouter