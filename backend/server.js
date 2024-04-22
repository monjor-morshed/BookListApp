import express from "express";


import { PORT, mongodbURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors'
import booksRoute from "./routes/booksRoute.js";

const app = express();
app.use(express.json());

app.use(cors())

app.get('/', (request ,response) => {
    return response.status(234).send("Welcome Homies")
});

app.use('/books', booksRoute);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("Database App Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    
    .catch((error) => {
        console.log(error);
    })
