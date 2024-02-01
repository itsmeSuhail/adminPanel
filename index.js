import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import imageRouter from "./routes/image.route.js"
import { connectDb } from "./utils/dbConnector.js";
import cookieParser from "cookie-parser"
import path from"path"
import { URL } from 'url';
dotenv.config()
const port=process.env.PORT ||3002;
const app=express();
const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static('dist'));
const corsOptions = {
    origin: process.env.link, 
    credentials: true,
  };
connectDb(process.env.mongo)
app.use(cors(
    corsOptions
));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/image",imageRouter);


app.get("*",(req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  
app.listen(port,()=>{
    console.log(`server has been started at http://localhost:${port}`);
})