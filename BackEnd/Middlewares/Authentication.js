import { validateToken } from "../Utils/Authentication.js"

function checkforAuthenticationCookie (cookieName){
    return (req,res,next)=>{
        
        const tokenCookieValue = req.cookies(cookieName);
        
        if(!tokenCookieValue) next();

        try {
            const userpayload = validateToken(tokenCookieValue);
            req,user = userpayload;
        } catch (error) {
            
        }
        next();
    }
}

export default checkforAuthenticationCookie