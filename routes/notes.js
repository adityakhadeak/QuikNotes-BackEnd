import express from 'express'
import { body } from 'express-validator'
import addNote from '../controllers/addNote.js'
import fetchallnotes from '../controllers/fetchaAllNotes.js'
import fetchUser from '../middleware/fetchUser.js'
import updateNote from '../controllers/updateNote.js'
import deleteNote from '../controllers/deleteNote.js'

const route = express.Router()

//Route 1 for Fetching all Notes using get request /api/note/fetchallnotes    Login required
route.get('/fetchallnotes', fetchUser, fetchallnotes)


//Route 2 for Adding a Note using Post request /api/note/addnote    Login required
route.post('/addnote', fetchUser, 
[body('title', "Title should be of atleast of 3 chars").isLength({ min: 2 }),
body('description', "Description should be of atleast 5 char").isLength({ min: 5 })], addNote)

//Route 3 for Updating Note using put request /api/note/updatenote    Login required
route.put('/updatenote/:id', fetchUser, updateNote)

//Route 4 for Deleting Note using delete request /api/note/deletenote    Login required
route.delete('/deletenote/:id', fetchUser, deleteNote)
export default route