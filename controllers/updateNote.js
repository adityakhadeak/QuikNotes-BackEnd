import Notes from "../models/NotesModel.js";

const updateNote= async(req,res)=>{
const {title,description,tag}=req.body

try {
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    const note= await Notes.findById(req.params.id)
    if(!note){
       return res.status(404).send('Not Found')
    }
    if(note.user!=req.user.id){
       return res.status(401).send("Access Denied")
    }

    const updatedNote=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

     res.send(updatedNote)

} catch (error) {
    console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
}
}

export default updateNote