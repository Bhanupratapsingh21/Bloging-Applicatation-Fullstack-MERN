import mongoose from "mongoose"
async function ConnectDb(){
    try {
       
        await mongoose.connect(`${process.env.DB_CONNECTIONSTRING}/${process.env.APPLICATIONNAME}`)
        console.log("Data-Base Connected")
    } catch (error) {
        console.log("Error in DB Connection", error)
        process.exit(1)     
    }
}

export default ConnectDb
