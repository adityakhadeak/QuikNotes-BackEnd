import mongoose from "mongoose";

const notesSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('notes',notesSchema)