const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const helmet = require('helmet')
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const corsOptions = {
    origin: '*', // Allow requests from any origin
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions));
app.use(express.json())
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
