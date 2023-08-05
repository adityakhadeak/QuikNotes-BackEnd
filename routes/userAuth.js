import express from "express";
import User from "../models/UserModel.js"
import Notes from "../models/NotesModel.js";
import { userControll } from "../controllers/userControl.js";
import { body } from 'express-validator'
import loginControl from "../controllers/loginControl.js";
import fetchUser from "../middleware/fetchUser.js";
const route = express.Router()

//Creating a user using a Post request
route.post('/createuser', [
  body('name', "Name should be of atleast of 2 chars").isLength({ min: 2 }),
  body('email', "Please check your Email").isEmail(),
  body('password', "Password should be of atleast 5 char").isLength({ min: 5 })
], userControll)

//Creating a endpoint for login
route.post('/login', [
  body('email', "Please check your Email").isEmail(),
  body('password', "Please check your Password").isLength({ min: 5 })
], loginControl)

//Getting the info of loggedin user 
route.post('/getuser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      message: "Internal server error"
    })
  }
})

route.delete('/deleteuser',fetchUser,async(req,res)=>{
  try {
    const userId=req.user.id
    const userDeleted=await User.findByIdAndDelete(userId)
    const notes= await  Notes.deleteMany({user:userId})
    
    res.json({'success':true,userDeleted})

  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      message: "Internal server error"
    })
  }
})





export default route