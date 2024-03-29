const {Book,User} = require('../models/bookModels')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const {uploadOnCloudinary} = require ('../utils/cloudinary')


const getAllBooks = async  (req,res)=> {
    try{ 
        const books= await Book.find();
        if(!books){throw new Error("No Books Found")};
         res.status(200).json(books)
    }
    catch(err){
      return res.status(400).send({message:err.message})
    }
 }
const createBook =  async (req,res)=>{
    try { 
        console.log('Request Body:', req.body);
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).json({message:'Missing fields'});
        }
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const pdfUrl = await uploadOnCloudinary(req.file.path);
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            category: req.body.category,
            pdfUrl: pdfUrl 
        }
        const book = await Book.create(newBook)
        return res.status(200).send(book)      
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
}


const getBook = async  (req,res)=> {
    try{ 
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){throw new Error("No Book Found")};
        return res.status(200).json(book)
    }
    catch(err){
      return res.status(400).send({message:err.message})
    }
 }


const deleteBook =  async (req,res)=>{
    try {
        const {id:bookId} = req.params;

        const book = await Book.findByIdAndDelete({_id:bookId},req.body,{new:true,runValidators: true});
        if(!book){
            return res.status(404).json({msg: `No book with id: ${req.params.id} ` })
        }
        return res.status(404).json({book}) 
        
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const updateBook = async (req,res)=>{
    try {
        const {id:bookId} = req.params;

        const book = await Book.findOneAndUpdate({_id:bookId},req.body,{new:true,runValidators: true});
        if(!book){
            return res.status(404).json({msg: `No book with id: ${req.params.id} ` })
        }
        return res.status(404).json({book}) 
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Invalid username or password');
        }

      const isPasswordValid = (password, hashedPassword) => {
            return password === hashedPassword;    
    };

        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        const id = user._id;
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

        
        res.status(200).json({ msg: 'Token successfully created', token, id });
    } catch (error) {
        // Handle any errors (e.g., invalid username/password)
        res.status(400).json({ success: false, message: error.message });
    }
};

const signup = async (req,res)=>{
    const {username,password} = req.body
    try{
        if(!username || !password){
            throw new CustomAPIError('Please provide email and password')
        }
        const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new CustomAPIError('Username already exists');
            }
            const user = await User.create({ username, password });
            res.status(201).json({ success: true, message: 'User created successfully' });
    } 
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const addtoFav = async (req,res)=>{
    const {userId,bookId}=req.body;
    console.log(userId);
    try {
     
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }
        
    
        if (user.favoriteBooks.includes(bookId)) {
            throw new Error('Book already in favorites');
        }

      
        user.favoriteBooks.push(bookId);

       
        await user.save();

        res.status(200).json({ success: true, message: 'Book added to favorites successfully' })
    } catch (error) {
        res.status(200).json({ success: false, message: error.message })
    }
}

const getFavBooks= async (req,res)=>{
    const  {user_id}  = req.params;
    console.log(user_id);

    try {
        // Find the user by userId and populate the favoriteBooks array with actual book documents
        const user = await User.findById(user_id).populate('favoriteBooks');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const favoriteBooks = user.favoriteBooks;

        res.status(200).json(favoriteBooks);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const removeFav = async (req, res) => {
    const { user_id: userId, book_id: bookId } = req.params;
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        user.favoriteBooks.remove(bookId);
      
        await user.save();

        // Send success response to the client
        return res.status(201).json({ success: true, message: 'Book removed from the Favorites collection' });
    } catch (error) {
        console.error('Error removing book from Favorites:', error.message);
        // Send error response to the client
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports =  {
    getAllBooks,createBook,getBook,updateBook,deleteBook,login,signup,addtoFav,getFavBooks,removeFav
}
