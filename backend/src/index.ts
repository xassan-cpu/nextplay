import app from './app.js';
import { PORT } from './config/env.js';
import * as logger from './utils/logger.js';

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});