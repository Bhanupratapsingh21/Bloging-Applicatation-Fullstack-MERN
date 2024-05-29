import express from "express"
import UserRouter from "./Routes/User.Routes.js";
import ConnectDb from "./Utils/Connection.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import checkforAuthenticationCookie  from "./Middlewares/Authentication.js"
import BlogRouter from "./Routes/Blogs.Routes.js";
import { getblogsbasic } from "./Controllers/BlogsControllers.js";


const app = express();
const PORT = 4000;

configDotenv({
    path:"./.env"
});

// middleware's for work releted
app.use(express.json());
app.use(cookieParser());

// app.use(checkforAuthenticationCookie("token"));
app.get("/", getblogsbasic)

// Db connections
ConnectDb()
    .then(() => {
        // Start server

        app.listen(PORT, () => {
            console.log(`Server Started And LIVE At Port : ${PORT}`)
        })

        // Define routes
        app.use('/user', UserRouter)
        app.use("/blogs", BlogRouter)
    })
    .catch(err => {
        console.log("MongoDB connection failed!!", err);
    });

    