import { Router } from 'express';
import { getGameByIdHandler, getAllGamesHandler } from '../controllers/game-controller.js';

const gameRouter = Router();

gameRouter.get('/:id', getGameByIdHandler);
gameRouter.get('/', getAllGamesHandler);

export default gameRouter;