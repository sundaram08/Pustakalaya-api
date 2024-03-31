const express = require('express')
const router  = express.Router()
const authenticationMiddleware = require('../middleware/auth')
const {upload} = require('../middleware/multer')
const {getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    login,
    signup,
    addtoFav,
    getFavBooks,
    removeFav
} = require('../controllers/booksControl')



router.route('/').get(getAllBooks).post(authenticationMiddleware,upload.single('pdf'),createBook)

// router.route('/').get(getAllBooks).post(authenticationMiddleware,createBook)

router.route('/:id').get(getBook).patch(authenticationMiddleware,updateBook).delete(authenticationMiddleware,deleteBook)

router.route('/login').post(login)

router.route('/signup').post(signup)

router.route('/user/fav').post(addtoFav)

router.route('/user/:user_id').get(getFavBooks)

router.route('/user/fav/:user_id/:book_id').delete(removeFav)

module.exports=router;
