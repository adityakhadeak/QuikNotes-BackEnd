import express from "express";
import { userControll } from "../controllers/userControll.js";

const route=express.Router()

route.post('/user',userControll)

export default route