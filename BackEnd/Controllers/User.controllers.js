import User from "../Models/User.models.js";

async function handlesignin(req, res) {
    const { email, password } = req.body;
    try {

        // create a virtual function so it is used to create a funtion to 
        const token = await User.matchPasswordandgenratetoken(email, password)
        // console.log("token :", token)
        return res.cookie("token", token).status(200).json({ "MSG": "Loggied In SuccessFully" })

    } catch (error) {
        res.status(401).json({ MSG: "Incorrect Email And Password" })
    }
}

async function handlesignuplogin (req, res) {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const checkalreadyexist = await User.findOne({email})
    if(checkalreadyexist){
        return res.json({"MSG":"Email Already Exist Please Login"})
    }

    const user = await User.create({
        fullname,
        email,
        password
    })

    return res.json({ user })
}

function handlelogout(req,res){
    res.clearCookie("token").status(200).json({ "MSG" : "User Logged Out Successfully" })
}

export {
    handlesignin,
    handlesignuplogin,
    handlelogout
}