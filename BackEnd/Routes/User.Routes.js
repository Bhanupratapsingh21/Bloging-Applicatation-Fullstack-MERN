import { Router } from "express";
const UserRouter = Router();
import { 
    handlesignin,
    handlesignuplogin,
    handlelogout
} from "../Controllers/User.controllers.js";

UserRouter.post("/signin", handlesignin);

UserRouter.post("/signup", handlesignuplogin);

UserRouter.get("/logout", handlelogout);


export default UserRouter