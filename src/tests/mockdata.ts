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
