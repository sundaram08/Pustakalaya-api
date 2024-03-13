const express = require('express')
const router  = express.Router()
const authenticationMiddleware = require('../middleware/auth')

const {getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    login,
    signup
} = require('../controllers/booksControl')



router.route('/').get(getAllBooks).post(createBook)

router.route('/:id').get(getBook).patch(authenticationMiddleware,updateBook).delete(authenticationMiddleware,deleteBook)

router.route('/login').post(login)

router.route('/signup').post(signup)

module.exports=router;
