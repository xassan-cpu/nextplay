import { Router } from 'express';
import {
     getGameByIdHandler,
     getAllGamesHandler,
     getGamesByGenreHandler,
     getMostPopularGamesHandler,
} from '../controllers/game-controller.js';

const gameRouter = Router();

gameRouter.get('/popular', getMostPopularGamesHandler)
gameRouter.get('/genre/:ids', getGamesByGenreHandler);
gameRouter.get('/:id', getGameByIdHandler);
gameRouter.get('/', getAllGamesHandler);

export default gameRouter;