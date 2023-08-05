import Notes from "../models/NotesModel.js";


const deleteNote=async(req,res)=>{
    try {
        const note= await Notes.findById(req.params.id)
        if(!note){
           return res.status(404).send('Not Found')
        }
        if(note.user!=req.user.id){
           return res.status(401).send("Access Denied")
        }
    
        const deletedNote=await Notes.findByIdAndDelete(req.params.id)
    
         res.send(deletedNote)
    
    } catch (error) {
        console.log(error.message)
            res.status(400).json({
                message: "Internal server error"
            })
    }
}

export default deleteNote