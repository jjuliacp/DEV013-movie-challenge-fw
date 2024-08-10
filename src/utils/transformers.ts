import Movie from "../models/movie";


export interface MovieData {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    adult?: boolean;
    original_language?: string;
    genre_ids?: number[];
    vote_average?: number;
    vote_count?: number;
    popularity?: number;
}

export function formatMovie(movieData: MovieData, genreNames: Map<number, string>): Movie {
    return {
        id: movieData.id,
        title: movieData.title,
        posterPath: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
        releaseYear: new Date(movieData.release_date).getFullYear(),
        overview: movieData.overview,
        genres: movieData.genre_ids ? movieData.genre_ids.map((id) => genreNames.get(id) || "Unknown") : [],
        voteAverage: movieData.vote_average || 0,
        voteCount: movieData.vote_count || 0,
    };
}

export function formatGenresToMap(genres: { id: number; name: string }[]) {
    const genresMap = new Map<number, string>(
        genres.map((genre) => [genre.id, genre.name])
    );
    return genresMap;
}