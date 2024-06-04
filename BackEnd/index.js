import express from "express"
import UserRouter from "./Routes/User.Routes.js";
import ConnectDb from "./Utils/Connection.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import checkforAuthenticationCookie from "./Middlewares/Authentication.js"
import BlogRouter from "./Routes/Blogs.Routes.js";
import { getblogsbasic } from "./Controllers/BlogsControllers.js";
import cors from 'cors'

configDotenv({
    path: "./.env"
});


const app = express();
const PORT = 4000;

const corsoptions = {
    origin : ["http://localhost:5173","https://url-shortner-mern.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsoptions));

// enable pre-flight acroos the board
app.use("*",cors(corsoptions));

// middleware's for work releted
app.use(express.json());
app.use(cookieParser());

// lets

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

