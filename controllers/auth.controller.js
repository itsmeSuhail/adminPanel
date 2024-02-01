import User from "../Models/user.model.js"
import imageModel from "../Models/image.model.js";
import { resHandler } from "../utils/resonpseManager/response.handler.js";
import { CreatToken, CreatTokenWithTime, verifyToken } from "../utils/Authentication/jwtManager.js";
import { sendNotification } from "../utils/emailManager/Notification.js";
import { checkEmail, checkPassword } from "../utils/validator/dataValidator.js";
import { decrypt, encrypt } from "../utils/PasswordManager/protector.js";
export const register=async (req, res, next) => {
    const errors = req.errorBucket;
    if(errors.size>0){
        resHandler(res,400,{
            error:{
               errorList: errors.bucket
            }
        })
    }
    else{
        const {originalname,mimetype,buffer}=req.file;
        const Filename=new Date().getTime()+"."+originalname.split(".").pop();
        const check=await User.findOne({email:req.body.email});
        if(check){
            resHandler(res,400,{
                error:{
                   errorList: {email:"email is already exist"}
                }
            })
        }
        else{

            try {
                await imageModel.create({
                    name:Filename,
                    img:{
                        data:buffer,
                        contentType:mimetype
                    }
                })
                await User.create({...req.body,imgLink:Filename,password:encrypt(req.body.password.trim())});
               resHandler(res,200,{
                success:{
                   msg: "Account has been Created...."
                }
            })
            } catch (error) {
                
                resHandler(res,500,{
                    
                    error:{
                       msg: error.message
                    }
                })
            }
        }
    }
}
export const forgotPassword=async (req, res, next) => {
    const email = req.body.email;
    const errorBucket={};
    checkEmail(email,errorBucket);
    if(errorBucket["email"]){
        resHandler(res,400,{
            error:{
               errorList: errorBucket
            }
        })
    }
    else{
    try {
        const data = await User.findOne({ email })
        if (data!==null) {
            const obj = {
                id: data._id,
                user: data.name,
            }
            const token = CreatTokenWithTime(obj, "1hr");
            const link = `${process.env.forgot_Link}/change-user-password"/${data._id}?Auth=${token}`;
            const html = `<!DOCTYPE html>
          <html>
          <head>
              <title>Password Recovery</title>
          </head>
          <body>
              <p>Hello ${data.name},</p>
              <p>We received a request to reset your password for your account.</p>
              <p>This link will expire after 1hr</p>
              <p>If you didn't make this request, you can ignore this email. Otherwise, you can reset your password by clicking the link below:</p>
              <p><a href="${link}">Reset Password</a></p>
              <p>or</p>
              <p>${link}</p>
              <p>This link will expire in 1 hours for security reasons.</p>
              <p>If you have any questions or need further assistance, please contact our support team.</p>
              <p>Best regards,</p>
              <p>Fever</p>
          </body>
          </html>
          `
            const sent=await sendNotification(email,html,"Password Recovery");
            if(sent){
                 res.cookie("auth-passwordRev", token, {
                    httpOnly: true, maxAge: 3600000
                })
                resHandler(res,200,{
                    success:{
                       msg:"password link has been sent"
                    }
                })
            }
            else{
                resHandler(res,400,{
                    error:{
                       errorList: {email:"unable to sent email"}
                    }
                })
            }
        }
        else {
            resHandler(res,400,{
                error:{
                   errorList: {email:"user account not found"}
                }
            })
        }

    } catch (error) {
        resHandler(res,500,{
            error:{
               msg: "something went wrong try again later"
            }
        })
    }
}

}
export const changePassword=async (req, res, next) => {
    const { password, token } = req.body;
    const errorBucket={};
    checkPassword(password,errorBucket);
    if(req.body.token===undefined){
        errorBucket["token"]="token is required"
    }
    if(errorBucket["password"]||errorBucket["token"]){
        resHandler(res,400,{
            error:{
               errorList: errorBucket
            }
        })

    }
    else{

        try {
            const authToken = verifyToken(token);
            if (authToken == null) {
            resHandler(res,404,{
                error:{
                   msg: "link has been expired"
                }
            })
            return;
        } else if (req.cookies["auth-passwordRev"] != token) {
            resHandler(res,404,{
                error:{
                   msg: "you are not authorized"
                }
            })
            return;
        }
        const isuser = await User.findById({ _id: req.params.id });
        if (isuser == undefined || isuser == null) {
            resHandler(res,404,{
                error:{
                   msg: "you dont have permission"
                }
            })
            return;
        }
        await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { password: encrypt(password) } })
        res.clearCookie("auth-passwordRev", {
            sameSite: "none",
            secure: true,
        })

        resHandler(res,200,{
            success:{
               msg:"password has been changed successfully"
            }
        })

    } catch (error) {
        resHandler(res,500,{
            error:{
               msg: "id is not valid or try again later"
            }
        })
    }
}
}
export const login=async (req, res, next) => {
    try {
        const errorBucket={};
        checkPassword(req.body.password,errorBucket)
        checkEmail(req.body.email,errorBucket)
        if(errorBucket["email"]){
            resHandler(res,400,{
                error:{
                   errorList: errorBucket
                }
            })
            return;
        }
        else{
        const isuser = await User.findOne({ email: req.body.email });
        if (!isuser) {
            resHandler(res,400,{
                error:{
                   errorList: {email:"Email does not exist"}
                }
            })
            return;
        } else if (!decrypt(isuser.password, req.body.password.trim())) {
            resHandler(res,400,{
                error:{
                    errorList: {password:"wrong password or Email"}
                }
            })
            return;
        }
        else {
            const obj = {
                id: isuser._id,
                user: isuser.name,
                isAdmin: isuser.isAdmin
            }
            const token = CreatToken(obj);
            res.cookie("accessToken", token, {
            })
           resHandler(res,200,{
            success:{
               dataList:{
                id:obj.id,
                token
               }
            }
        })
        }
    }

    } catch (error) {
        resHandler(res,500,{
            error:{
               msg: "something went wrong try again later"
            }
        })
    }
}
export const logout=async (req, res) => {
    try {
        res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
            resHandler(res,200,{
                success:{
                   msg: "user has been logged out"
                }
            })

    } catch (error) {
        resHandler(res,500,{
            error:{
               msg: "something went wrong try again later"
            }
        })
    }
}