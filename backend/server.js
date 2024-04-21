import express, { response } from "express";
import { request } from "http";


import Path from "path";
import { PORT, mongodbURL } from "../backend/config.js";
import mongoose from 'mongoose';
import { Book } from "../backend/models/bookModel.js";
import { title } from "process";
const app = express();
app.use(express.json({ extended: false }));
app.get('/', (request ,response) => {
    return response.status(234).send("Welcome Homies")
});

app.post('/books', async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields"
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    };
});
mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("Database App Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    
    .catch((error) => {
        console.log(error);
    })
