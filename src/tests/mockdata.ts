import Movie from "../models/movie";
import { MovieData } from "../utils/transformers";

export const mockMovies: Movie[] = [
    {
        id: 1,
        title: 'Inception',
        overview: 'A mind-bending thriller',
        posterPath: '/inception.jpg',
        releaseYear: 2010,
        genres: ['Action', 'Sci-Fi'],
        voteAverage: 8.8,
        voteCount: 20000,
    },
    {
        id: 2,
        title: 'Interstellar',
        overview: 'A journey to the stars',
        posterPath: '/interstellar.jpg',
        releaseYear: 2014,
        genres: ['Adventure', 'Sci-Fi'],
        voteAverage: 8.6,
        voteCount: 18000,
    },
];



export const movieDataEmpty: MovieData = {
    id: 0,
    title: "",
    poster_path: "",
    release_date: "",
    overview: "",
    genre_ids: [],
    vote_average: 0,
    vote_count: 0,
};
export const expectedMovieEmpty: Movie = {
    id: 0,
    title: "",
    posterPath: "https://image.tmdb.org/t/p/w500",
    releaseYear: NaN,
    overview: "",
    genres: [],
    voteAverage: 0,
    voteCount: 0,
}
export const mockMovieData = {

    id: 12345,
    original_title: "Sample Movie",
    title: "Sample Movie",
    genres: [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
    ],
    overview: "This is a sample movie overview.",
    popularity: 10.0,
    poster_path: "/path/to/poster.jpg",
    release_date: "2024-01-01",
    vote_average: 7.5,
    vote_count: 100,
};
export const responseMovieDetail = {
    "id": 12345,
    "title": "Sample Movie",
    "releaseYear": 2023,
    "posterPath": "https://image.tmdb.org/t/p/w500/path/to/poster.jpg",
    "genres": [
        "Action",
        "Comedy"
    ],
    "overview": "This is a sample movie overview.",
    "voteAverage": 7.5,
    "voteCount": 100
}