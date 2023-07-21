import express from "express";
import { userControll } from "../controllers/userControll.js";
import { body} from 'express-validator'
const route=express.Router()

route.post('/createuser',[
    body('name',"Name should be of atleast of 2 chars").isLength({ min: 2 }),
    body('email',"Please check your Email").isEmail(),
    body('password',"Password should be of atleast 5 char").isLength({ min: 5 })
  ],userControll)


route.post('/login',[
    body('email',"Please check your Email").isEmail(),
    body('password',"Please check your Password").exists()
  ],userControll)
  
export default route