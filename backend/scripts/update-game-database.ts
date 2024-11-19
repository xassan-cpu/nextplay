import { populateGamesToMongoDB } from "../src/services/game-service.ts"
import { fetchTop500Games } from "../src/services/api-igdb.ts"
import { withDatabaseConnection } from "../src/utils/with-database-connection.ts"
import * as logger from "../src/utils/logger.ts"

async function updateGameDatabase() {
    try {
        logger.info("Starting the game database update...");

        const topGames = await fetchTop500Games();
        if (topGames.length > 0) {
            logger.info(`Fetched ${topGames.length} games. Updating the database...`);

            await withDatabaseConnection(async () => {
                await populateGamesToMongoDB(topGames);
            });

            logger.info("Game database successfully updated.");
        } else {
            logger.warn("No games fetched. Database update skipped.");
        }
    } catch (err) {
        logger.error("Failed to update game database: ", err);
    }
}

updateGameDatabase();