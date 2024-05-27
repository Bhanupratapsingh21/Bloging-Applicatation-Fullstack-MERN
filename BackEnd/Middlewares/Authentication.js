import { validateToken } from "../Utils/Authentication.js"

function checkforAuthenticationCookie(req, res, next) {

    const tokenCookieValue = req.cookies["token"];

    if (!tokenCookieValue) return res.status(401).json({ "MSG": "Please Login" });

    try {
        const userpayload = validateToken(tokenCookieValue);
        req.user = userpayload;
        // console.log(userpayload)
        next();
    } catch (error) {
        console.error("Token validation failed:", error);
        res.status(401).json({"MSG": "Please Login"})
    }
}

export default checkforAuthenticationCookie