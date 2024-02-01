import imageModel from "../Models/image.model.js";
import userModel from "../Models/user.model.js";
import { resHandler } from "../utils/resonpseManager/response.handler.js";

export const getUser=async (req, res, next) => {
    try {
        const isuser = await userModel.findById({ _id: req.params.id });
        if (!isuser) {
            resHandler(res,404,{
                error:{
                   msg: "No user Found"
                }
            })
        }
        else {
            const { password, ...data } = isuser._doc;
            resHandler(res,200,{
                success:{
                   dataList:data
                }
            })
        }
    } catch (error) {
        resHandler(res,500,{
            error:{
               msg: "id is not valid or try again later"
            }
        })
    }
}
export const updateUser=async (req, res, next) => {
    const errors = req.errorBucket;
    if(errors.size>0){
     resHandler(res,400,{
        error:{
           errorList: errors.bucket
        }
    })
    }
    else{
        const {name,email,isAdmin,isActive}=req.body;
        const additional={};
        if(req.isAdmin){
           if(isAdmin!==undefined) additional["isAdmin"]=isAdmin;
           if(isActive!==undefined) additional["isActive"]=isActive;
        }
       
        try {
            if(req.file&&req.body.imgLink){
                const {mimetype,buffer}=req.file;
             await imageModel.findOneAndUpdate({name:req.body.imgLink},{$set:{
                 img:{
                     data:buffer,
                     contentType:mimetype
                 }
             }});
            }
            const isuser = await userModel.findByIdAndUpdate({ _id: req.params.id }, {
                $set: { name,...additional}
            }, { new: true });

        const { password, ...data } = isuser._doc;
        resHandler(res,200,{
            success:{
               msg: "user data updated"
            }
        })
    } catch (error) {
        resHandler(res,500,{
            error:{
               msg: "id is not valid or try later"
            }
        })
    }
}
}
export const delteUser=async(req,res)=>{
    try {
        if(req.isAdmin){
            const del=await userModel.findByIdAndDelete(req.params.id)
                       if(del===null){
                resHandler(res,404,{
                    error:{
                        msg: "user id is not found"
                    }
                })
            }
            else{
                
                resHandler(res,200,{
                    success:{
                        msg: "user has been deleted"
                    }
                })
            }
        }else {
            resHandler(res,400,{
                error:{
                    msg: "you dont have access"
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
export const getAllUsers=async(req,res)=>{
    try {
    if(req.isAdmin){
        const users=await userModel.find();
        resHandler(res,200,{
           success:{
               dataList: users
            }
        })
    }
    else{
        resHandler(res,400,{
            error:{
               msg: "you dont have permission"
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