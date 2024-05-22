import express from "express"
import UserRouter from "./Routes/User.Routes.js";
import ConnectDb from "./Utils/Connection.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import checkforAuthenticationCookie  from "./Middlewares/Authentication.js"

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(check)

app.get("/", (req, res) => res.send("Hello"))


ConnectDb()
    .then(() => {
        // Start server

        app.listen(PORT, () => {
            console.log(`Server Started And LIVE At Port : ${PORT}`)
        })

        // Define routes
        app.use('/user', UserRouter)
    })
    .catch(err => {
        console.log("MongoDB connection failed!!", err);
    });
