import type { Request, Response } from "express";
import {
    getAllGames,
    getGameById,
    getGamesByGenreIds,
    getMostPopularGames
} from "../services/game-service.js";

export const getAllGamesHandler = async (req: Request, res: Response) => {
    // Pagination
    const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 games per page

    try {
        const {games, totalGames} = await getAllGames(page, limit);

        if (!games || games.length === 0) {
            res.status(404).json({ message: "No games found." });
            return;
        }

        const totalPages = Math.ceil(totalGames / limit);

        res.status(200).json({
            page,
            limit,
            totalGames,
            totalPages,
            games,
        });
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";

        res.status(500).json({
            message: "Failed to fetch games.",
            ...(process.env.NODE_ENV !== "production" && { error: errorMessage }),
        });
    }
};


export const getGameByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "Invalid game ID provided." });
        return;
    }    

    const gameId = Number(id);

    try {
        const game = await getGameById(gameId);

        if (!game) {
            res.status(404).json({ message: "Game not found." });
            return;
        }

        res.status(200).json(game);
    } catch (err) {
        const errorMessage = 
            err instanceof Error ? err.message : "An unknown error occurred";

        res.status(500).json({
            message: 'Failed to fetch games',
            ...(process.env.NODE_ENV !== 'production' && { error: errorMessage })
        });
    }
};

export const getGamesByGenreHandler = async (req: Request, res: Response) => {
    const { ids } = req.params;
    
    // Pagination
    const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 games per page

    if (!ids) {
        res.status(400).json({ message: "Genre IDs are required in the URL." });
        return;
    }

    const genreIds = ids.split(",").map(Number).filter((id) => !isNaN(id));

    if (genreIds.length === 0) {
        res.status(400).json({ message: "Invalid genre IDs provided." });
        return;
    }

    try {
        const { games, totalGames } = await getGamesByGenreIds(genreIds, page, limit);

        if (games.length === 0) {
            res.status(404).json({ message: "No games found for the provided genre IDs." });
            return;
        }

        const totalPages = Math.ceil(totalGames / limit);


        res.status(200).json({
            page,
            limit,
            totalGames,
            totalPages,
            games,
        });
    } catch (err) {
        const errorMessage = 
            err instanceof Error ? err.message : "An unknown error occurred";

        res.status(500).json({
            message: "Failed to fetch games",
            ...(process.env.NODE_ENV !== "production" && { error: errorMessage }),
        });
    }
};

export const getMostPopularGamesHandler = async (req: Request, res: Response) => {
    // Pagination
    const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 games per page

    try {
        const { games, totalGames } = await getMostPopularGames(page, limit);

        if (!games || games.length === 0) {
            res.status(404).json({ message: "No popular games found." });
            return;
        }

        const totalPages = Math.ceil(totalGames / limit);

        res.status(200).json({
            page,
            limit,
            totalGames,
            totalPages,
            games,
        });
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";

        res.status(500).json({
            message: "Failed to fetch popular games.",
            ...(process.env.NODE_ENV !== "production" && { error: errorMessage }),
        });
    }
}