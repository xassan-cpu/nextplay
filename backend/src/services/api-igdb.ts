import type { IGame } from "../models/game.js";

import * as logger from "../utils/logger.js";
import { CLIENT_ID, ACCESS_TOKEN } from "../config/env.js";

const BASE_URL = "https://api.igdb.com/v4";

export async function fetchTop500Games(): Promise<IGame[]> {
    const limit = 500;

    try {
        logger.info(`Fetching top ${limit} popular games from IGDB.`);

        const response = await fetch(
            `${BASE_URL}/games`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
                body: `
                    fields cover,dlcs,expanded_games,expansions,first_release_date,game_modes,genres,keywords,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,remakes,remasters,similar_games,slug,storyline,summary,themes,total_rating,total_rating_count,videos;
                    sort total_rating_count desc;
                    limit ${limit};
                `
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch games: ${response.status} ${response.statusText}`);
        }

        const games: IGame[] = await response.json();
        logger.info(`Successfully fetched ${games.length} games from IGDB.`);

        return games;
    } catch (err) {
        logger.error("Error fetching games from IGDB: ", err);
        return [];
    }
}