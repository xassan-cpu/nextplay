import express from "express";
import { connectToDB } from "./config/db.js";
import cors from "cors";

const app = express()

connectToDB();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Game API!');
});

export default app;