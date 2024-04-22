import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

router.post('/', async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields",
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/', async (req, res) => {
    const books = await Book.find({});
    return res.status(200).json({
        count: books.length,
        data:books
    });
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id);
    return res.status(200).json(book);
})

router.put('/:id', async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields",
            });
        }
        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!request){
            return response.status(404).json({message: "Book Not Found."})
        }
        return response.status(200).send({message: "Book Updated Successfully."})
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.delete('/:id', async (request, response) =>{
    try{
        
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id);
        if(!request){
            return response.status(404).json({message: "Book Not Found."})
        }
        return response.status(200).send({message: "Book Deleted Successfully."})
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;