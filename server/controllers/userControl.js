import User from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
export const userControll = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body

    try {
    
        //checking if user with the same email already exist or not
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({msg:"User with this email already exist"})
        }

        const salt= await bcrypt.genSalt(10)
        const encryptPass=await bcrypt.hash(password,salt)
        //new user creation
        const user = new User({
            name,
            email,
            password:encryptPass
        })
        await user.save()
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,process.env.JWT_SECRET)

        res.status(200).json({
            message: "User Added Successfully",
            authtoken
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}