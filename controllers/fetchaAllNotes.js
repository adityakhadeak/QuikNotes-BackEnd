import Notes from "../models/NotesModel.js";

 const fetchallnotes=async(req,res,next)=>{
    try {
        const notes= await Notes.find({user:req.user.id})
        res.send(notes)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}


export default fetchallnotes