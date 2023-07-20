import User from "../models/UserModel.js"
export const userControll = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = new User({
            name,
            email,
            password
        })

        await user.save()
        res.status(200).json({
            message:"User Added Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}