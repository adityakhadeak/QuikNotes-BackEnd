import express from 'express'
import connectToDB from './database/db.js'
import dotenv from 'dotenv'
import route from './routes/userAuth.js'

const app=express()

dotenv.config()
app.use(express.json())
app.use(route)



//Connect To Database
connectToDB()
//Port Number
const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})