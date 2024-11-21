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

export async function getAllGames(page: number, limit: number) {
    const skip = (page - 1) * limit; // The number of documents to skip

    try {
        // Fetch paginated results
        const gamesDocument = await Game.find({})
        .skip(skip)
        .limit(limit)
        .lean();

        // Fetch the total count for pagination metadata
        const totalGames = await Game.countDocuments();

        const games: IGame[] = [...gamesDocument];

        return { games, totalGames };
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "Failed to fetch games from DB."
        );
    }
}

export async function getGameById(gameId: number) {
    try {
        const gameDocument = await Game.findOne({ id: gameId }).lean();

        if (!gameDocument) {
            throw new Error(`Game with ID ${gameId} not found.`);
        }

        const game: IGame = gameDocument;

        return game;
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "Failed to fetch game details."
        );
    }
}

export async function getGamesByGenreIds(genreIds: number[], page: number, limit: number) {
    const skip = (page - 1) * limit;

    try {
        const gamesDocument =  await Game.find({ genres: { $in: genreIds } })
            .skip(skip)
            .limit(limit)
            .lean();

        if (!gamesDocument || gamesDocument.length === 0) {
            throw new Error("No games found for the specified genres.");
        }

        const totalGames = await Game.countDocuments({ genres: { $in: genreIds } });

        const games: IGame[] = gamesDocument;

        return { games, totalGames };
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "Failed to fetch games by genres."
        );
    }
}

export async function getMostPopularGames(page: number, limit: number) {
    const skip = (page - 1) * limit;

    // TODO: add these as query params.
    const minRatingCount: number = 1000;
    const topN: number = 5;

    try {
        // Filter out games with rating count lower than minimum threshold
        const gamesDocument = await Game.find({ total_rating_count: { $gt: minRatingCount } })
            .skip(skip)
            .limit(limit)
            .lean();

        if (!gamesDocument || gamesDocument.length === 0) {
            throw new Error(`No games found with a minimum rating count of ${minRatingCount}.`);
        }

        // Calculate the popularity score (rating count * rating)
        const scoredGames = gamesDocument.map(game => ({
            ...game,
            popularityScore: game.total_rating_count * game.total_rating,
        }));

        // Sort the games by popularity in desc order
        scoredGames.sort((a, b) => b.popularityScore - a.popularityScore);

        // Get top N games
        const topGames = scoredGames.slice(0, topN);

        const totalGames = await Game.countDocuments({ total_rating_count: { $gt: minRatingCount } });

        const games: IGame[] = [...topGames];

        return { games, totalGames }
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "Failed to fetch popular games."
        );
    }
}