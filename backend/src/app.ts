import express, { query } from "express";
import { connectToDB, closeDBConnection } from "./config/db.js";
import cors from "cors";
import { requestLogger, errorHandler, unknownEndpoint } from "./utils/middleware.js";
import gameRouter from "./routes/game-router.js"

const app = express()

connectToDB();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Game API!',
        routes: [
            // routes here
            { 
                method: 'GET',
                path: '/api/games',
                description: 'Fetch all games',
                queryParams: ['page', 'limit']     
            },
            { 
                method: 'GET',
                path: '/api/games/:id',
                description: 'Get game of specified ID'
            },
            { 
                method: 'GET',
                path: '/api/games/genres/:ids',
                description: 'Get games of specified genre IDs',
                params: ['ids (comma-seperated list of genre IDs)'],
                queryParams: ['page', 'limit']
            },
            {
                method: 'GET',
                path: 'api/games/popular',
                description: 'Get most popular games',
                queryParams: ['page', 'limit']
            },
        ],
    });
});

// Test Routes
/*
app.get('/test-error', (req, res, next) => {
    // Simulating an error
    const error = new Error('This is a test error!');
    error.name = 'TestError'; // Optionally set a custom error name
    next(error); // Pass the error to the error handler
});

app.get('/test-cast-error', (req, res, next) => {
    const error = new Error('Invalid ID format');
    error.name = 'CastError';
    next(error);
});
*/

app.use("/api/games/", gameRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

process.on('SIGINT', async () => {
    console.log('SIGINT received: Closing database connection...');
    closeDBConnection();
    process.exit(0);
});

export default app;