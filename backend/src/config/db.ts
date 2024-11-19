import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

import * as logger from "../utils/logger.js";

export async function connectToDB(): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info("MongoDB Connected...");
    } catch (err) {
        logger.error("MongoDB connection error:", err);
        throw err;
    }
}

export async function closeDBConnection(): Promise<void> {
    try {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed.");
    } catch (err) {
        logger.error("Error closing MongoDB connection:", err);
    }
}