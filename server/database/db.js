import mongoose from "mongoose";

const connectToDB= async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.log(`Cannot connect to Database error: ${error}`)
    }
    
}

export default connectToDB