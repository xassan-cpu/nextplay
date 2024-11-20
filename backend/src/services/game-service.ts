import Game, { type  IGame } from "../models/game.js";
import * as logger from "../utils/logger.js";

export async function populateGamesToMongoDB(games: IGame[]) {
    logger.info("Adding to Game Collection.");

    try {
        // Filter out games that already exists
        const gameIds = games.map(game => game.id);
        const existingGames = await Game.find({ id: { $in: gameIds } }).select('id').lean();
        const existingGameIds = new Set(existingGames.map(game => game.id));
        const newGames = games.filter(game => !existingGameIds.has(game.id));

        if (newGames.length > 0) {
            // Insert new games in database
            await Game.insertMany(newGames);
            logger.info(`Inserted ${newGames.length} new games into MongoDB.`);
        } else {
            logger.info("No new games to insert.");
        }
    } catch (err) {
        logger.error("Error populating games to MongoDB: ", err);
        throw err;
    }
}

export async function getAllGames() {
    return await Game.find({});
}