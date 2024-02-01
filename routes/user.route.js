import express from "express";
import { verifyTokens } from "../utils/middleware.js";
import { delteUser, getAllUsers, getUser, updateUser  } from "../controllers/user.controller.js";
import multer from "multer";
import {validateData} from "../utils/validator/dataValidator.js"
const Router =express.Router();
//multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//multer middleware
Router.get("/all",verifyTokens, getAllUsers)
Router.get("/:id", verifyTokens,getUser )
Router.put("/update/:id",upload.single("profileImg"), verifyTokens,validateData,updateUser )
Router.delete("/delete/:id",verifyTokens, delteUser)

export default Router;