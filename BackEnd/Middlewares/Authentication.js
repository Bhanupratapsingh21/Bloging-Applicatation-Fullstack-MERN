import { validateToken } from "../Utils/Authentication.js";

function checkforAuthenticationCookie(req, res, next) {
    // console.log("Authentication middleware triggered");

    const tokenCookieValue = req.cookies["token"];
    // console.log("Token cookie value:", tokenCookieValue);

    if (!tokenCookieValue) {
        // console.log("No token cookie found");
        return res.status(401).json({ "MSG": "Please Login" });
    }

    try {
        const userpayload = validateToken(tokenCookieValue);
        req.user = userpayload;
        // console.log("Token validation successful, user payload:", userpayload);
        next();
    } catch (error) {
        // console.error("Token validation failed:", error);
        res.status(401).json({ "MSG": "Please Login" });
    }
}

export default checkforAuthenticationCookie;