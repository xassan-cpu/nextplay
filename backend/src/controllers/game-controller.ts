import type { Request, Response } from "express";
import { getAllGames, getGameById } from "../services/game-service.js";

export const getAllGamesHandler = async (req: Request, res: Response) => {
    try {
        const games = await getAllGames();
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch games',
            ...(process.env.NODE_ENV !== 'production' && { error: err }) // Avoid exposing error object in prod
        });
    }
};

export const getGameByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const gameId = Number(id);

    try {
        const game = await getGameById(gameId);
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch games',
            ...(process.env.NODE_ENV !== 'production' && { error: err })
        });
    }
};