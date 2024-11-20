import { Router } from 'express';
import { getAllGamesHandler } from '../controllers/game-controller.js';

const gameRouter = Router();

gameRouter.get('/', getAllGamesHandler);

export default gameRouter;