import { configDotenv } from "dotenv";

configDotenv();

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI as string
    : process.env.MONGODB_URI as string;
    
const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in the .env file.");
}

if (!CLIENT_ID) {
    throw new Error("CLIENT_ID is not set in the .env file.");
}

if (!CLIENT_SECRET) {
    throw new Error("CLIENT_SECRET is not set in the .env file.");
}

if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is not set in the .env file.");
}

if (isNaN(PORT)) {
    throw new Error("PORT must be a valid number.");
}

export {MONGODB_URI, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, PORT}