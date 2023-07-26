import express from 'express'
import connectToDB from './database/db.js'
import dotenv from 'dotenv'
import route from './routes/userAuth.js'
import route2 from './routes/notes.js'

const app=express()

dotenv.config()
app.use(express.json())
app.use('/api/auth',route)
app.use('/api/note',route2)


//Connect To Database
connectToDB()
//Port Number
const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})