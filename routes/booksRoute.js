const express = require('express')
const router  = express.Router()

const {getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/booksControl')

router.route('/').get(getAllBooks).post(createBook)

router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)

module.exports=router;
