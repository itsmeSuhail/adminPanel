import express  from "express";
import { getImage } from "../controllers/image.controller.js";
const Router=express.Router();

//Routes
Router.get("/:id", getImage);
//Routes

export default Router;