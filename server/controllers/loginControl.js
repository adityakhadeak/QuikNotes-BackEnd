import User from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
const loginControl = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try {
        //checking that user exist or not
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).send("Invalid Credentials")
        }
        //comparing password
        const comparePass=await bcrypt.compare(password,user.password)
        if (!comparePass) {
            return res.status(400).send("Invalid Credentials")
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,process.env.JWT_SECRET)

        res.status(200).json({
            message: "User logged in Successfully",
            authtoken
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default loginControl