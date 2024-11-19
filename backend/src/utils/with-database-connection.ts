import { connectToDB, closeDBConnection } from "../config/db.js";
import * as logger from "../utils/logger.js";

export async function withDatabaseConnection<T>(callback: () => Promise<T>): Promise<T> {
    try {
        await connectToDB();
        return await callback();
    } catch (err) {
        logger.error("Error during database operation", err);
        throw err;
    } finally {
        try {
            await closeDBConnection();
        } catch (closeErr) {
            logger.error("Error closing MongoDB connection:", closeErr);
        }
    }
}
