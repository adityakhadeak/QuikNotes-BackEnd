import Notes from "../models/NotesModel.js";
import { validationResult } from 'express-validator'

const addNote = async (req, res,next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title,description,tag } = req.body

    try {
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote= await note.save()
        res.send(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default addNote