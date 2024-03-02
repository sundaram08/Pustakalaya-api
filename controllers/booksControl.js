const Book = require('../models/bookModels')

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
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).json({message:'Missing fields'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            category: req.body.category
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


module.exports =  {
    getAllBooks,createBook,getBook,updateBook,deleteBook
}