import mongoose from "mongoose"
async function ConnectDb(){
    try {
        await mongoose.connect("mongodb+srv://httpsbhanudev:9351337968@cluster4.ew6gy4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4/blogingapplication")
        console.log("Data-Base Connected")
    } catch (error) {
        console.log("Error in DB Connection", error)
        process.exit(1)     
    }
}

export default ConnectDb
