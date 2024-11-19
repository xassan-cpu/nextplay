import { Schema, model } from "mongoose";

export interface IGame {
    id: number;
    first_release_date: number;
    genres: number[];
    game_modes: number[];
    name: string;
    keywords: number[];
    rating: number;
    rating_count: number;
    similar_games: number[];
    dlcs: number[];
    player_perspectives: number[];
    ports: number[];
    parent_game: number;
    expanded_games: number[];
    expansions: number[];
    slug: string;
    storyline: string;
    summary: string;
    themes: number[];
    total_rating: number;
    total_rating_count: number;
    platforms: number[];
    remakes: number[];
    remasters: number[];
    cover: number;
    videos: number[];
}


const gameSchema = new Schema<IGame>({
    id: Number,
    first_release_date: Number,
    genres: [Number],
    game_modes: [Number],
    name: String,
    keywords: [Number],
    rating: Number,
    rating_count: Number,
    similar_games: [Number],
    dlcs: [Number],
    player_perspectives: [Number],
    ports: [Number],
    parent_game: Number,
    expanded_games: [Number],
    expansions: [Number],
    slug: String,
    storyline: String,
    summary: String,
    themes: [Number],
    total_rating: Number,
    total_rating_count: Number,
    platforms: [Number],
    remakes: [Number],
    remasters: [Number],
    cover: Number,
    videos: [Number]
});

gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject._id;
    }
});

const Game = model<IGame>("Game", gameSchema);
export default Game;