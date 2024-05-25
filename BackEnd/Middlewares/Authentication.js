import { validateToken } from "../Utils/Authentication.js"

function checkforAuthenticationCookie (cookieName){
    return (req,res,next)=>{
        
        const tokenCookieValue = req.cookies[cookieName];
        
        if(!tokenCookieValue) return next();

        try {
            const userpayload = validateToken(tokenCookieValue);
            req.user = userpayload;
        } catch (error) {
            console.error("Token validation failed:", error);
        }
        return next();
    }
}

export default checkforAuthenticationCookie