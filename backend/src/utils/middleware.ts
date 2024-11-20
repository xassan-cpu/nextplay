import type { Request, Response, NextFunction } from "express";
import * as logger from "./logger.js";

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    logger.info("Method:", req.method);
    logger.info("Path:"  , req.path);
    logger.info("Body:"  , JSON.stringify(req.body));
    logger.info('---');
    next();
}

export const unknownEndpoint = (req: Request, res: Response): void => {
    logger.error(`404 - Unknown Endpoint: ${req.method} ${req.path}`);
    res.status(404).json({ error: 'Unknown endpoint', path: req.path });
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`Error occurred: ${err.message}`);

    const isDevelopment = process.env.NODE_ENV !== 'production';

    if (err.name === 'CastError') {
        res.status(400).json({
            error: 'Malformatted ID',
            ...(isDevelopment && { stack: err.stack }), // Include stack trace only in dev mode
        });
    } else if (err.name === 'ValidationError') {
        res.status(400).json({
            error: err.message,
            ...(isDevelopment && { stack: err.stack }),
        });
    } else {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message, // Helpful for debugging
            ...(isDevelopment && { stack: err.stack }),
        });
    }

    if (!res.headersSent) {
        next(err);
    }
};