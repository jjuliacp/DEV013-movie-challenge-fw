import Movie from "../models/movie";
import { MovieData } from "../utils/transformers";

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
