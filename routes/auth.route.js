import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import {  validateData } from "../utils/validator/dataValidator.js";
import { changePassword, forgotPassword, login, logout, register } from "../controllers/auth.controller.js";
dotenv.config()
const Register = express.Router();

//multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//multer middleware


Register.post("/register",upload.single("profileImg"),validateData,register )
Register.post("/forget-password", forgotPassword)
Register.post("/change-user-password/:id", changePassword)
Register.post("/login", login)

Register.post("/logout", logout)
export default Register;