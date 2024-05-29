import User from "../Models/User.models.js";

async function handlesignin(req, res) {
    const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(301).json({ "MSG" : "Email & Password Is Required to login"})
    }

    try {
        // create a virtual function so it is used to create a funtion to 
        const token = await User.matchPasswordandgenratetoken(email, password)
        // console.log("token :", token)
        return res.cookie("token", token).status(200).json({ "MSG": "Loggied In SuccessFully" })

    } catch (error) {
        res.status(401).json({ MSG: "Incorrect Email And Password" })
    }
}

async function handlesignup (req, res) {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const checkAlreadyExist = await User.findOne({
        $or: [
          { email: email },
          { fullname: fullname }
        ]
      });
      
      if (checkAlreadyExist) {
        if (checkAlreadyExist.email === email && checkAlreadyExist.fullname === fullname) {
          return res.json({ "MSG": "Email and Fullname already exist. Please login." });
        } else if (checkAlreadyExist.email === email) {
          return res.json({ "MSG": "Email already exists. Please login." });
        } else if (checkAlreadyExist.fullname === fullname) {
          return res.json({ "MSG": "Fullname already exists. Please use a different fullname." });
        }
      }

    

    const user = await User.create({
        fullname,
        email,
        password
    })

    // create a virtual function so it is used to create a funtion to 
    const token = await User.matchPasswordandgenratetoken(email, password)
    // console.log("token :", token)

    return res.cookie("token", token).json({ user }).status(201)
}

function handlelogout(req,res){
    res.clearCookie("token").status(200).json({ "MSG" : "User Logged Out Successfully" })
}

async function handleadminlogin (req,res){
  const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(301).json({ "MSG" : "Email & Password Is Required to login"})
    }

    try {
        // create a virtual function so it is used to create a funtion to 
        const token = await User.matchPasswordandgenratetoken(email, password)
        // console.log("token :", token)
        return res.cookie("token", token).status(200).json({ "MSG": "Loggied In SuccessFully" })

    } catch (error) {
        res.status(401).json({ MSG: "Incorrect Email And Password" })
    }
}

export {
    handlesignin,
    handlesignup,
    handlelogout,
    handleadminlogin
}