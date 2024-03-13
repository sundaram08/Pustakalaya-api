const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
app.options('*', cors());
require('dotenv').config()
const PORT = 4000;

const books = require('./routes/booksRoute')
app.use('/books',books)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('successfully connected to the cloud database')
app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT} `);
})})
.catch((error)=>{console.log(error);})


app.get('/',(req,res)=>{
    res.status(200).send('Welcome to the mern stack development')
})
