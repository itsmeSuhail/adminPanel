import { verifyToken } from "./Authentication/jwtManager.js";
import { resHandler } from "./resonpseManager/response.handler.js";

export const verifyTokens = (req, res, next) => {
    let token = (req.cookies.accessToken);
    if (req.headers && req.headers["authorization"]) {
        const myToken = req.headers["authorization"].split(" ").pop();
        if(token===undefined){
            token=myToken
        }
      } 
    if (!token) {
        resHandler(res,400,{
            error:{
                msg:"you are not authenticated"
            }
        })
        return;
    }
    
    const checkToken = verifyToken(token);
    if (checkToken == null) {
        resHandler(res,400,{
            error:{
                msg:"you are not authenticated"
            }
        })
        return;
    } else {
        req.userId = checkToken.id
        req.isAdmin = checkToken.isAdmin
        next();
    }
}