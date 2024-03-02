const mongoose = require('mongoose')

const bookSchema =  new mongoose.Schema(
    {
        title:{
            type: String,
            required: true 
        },
        author:{
            type: String,
            required: true 
        },
        publishYear:{
            type: Number,
            required: true 
        },
        category:{
            type: String
        }
    },
    {
        timeStamps: true
    }
);

module.exports = mongoose.model('Book',bookSchema)