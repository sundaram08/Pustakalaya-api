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

const userSchema = new mongoose.Schema({
    username:{ type: String},
    password:{ type: String},
    favoriteBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = {
    Book: mongoose.model('Book', bookSchema),
    User: mongoose.model('User', userSchema)
};