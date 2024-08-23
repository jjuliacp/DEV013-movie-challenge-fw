import Movie from "../models/movie";
import { TOKEN_API } from "../utils/config";
import { formatGenresToMap, formatMovie } from "../utils/transformers";

export async function getMovieGenres(): Promise<[{ id: number; name: string }]> {
    const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list'
    try {
        const responseGenres = await fetch(urlGenres, {
            headers: {
                authorization: `Bearer ${TOKEN_API}`,
            },
        });

        if (!responseGenres.ok) {
            throw new Error(`HTTP error! status: ${responseGenres.status}`);
        }
        const genresData = await responseGenres.json();
        return genresData.genres.map((genre: { id: number; name: string }) => ({
            id: genre.id,
            name: genre.name,
        }));
    } catch (error) {
        console.error(`Error fetching movie genres: ${error}`);
        throw error;
    }
}

export async function getMovieDetail(movie_id: number): Promise<Movie> {
    const urlMovie = `https://api.themoviedb.org/3/movie/${movie_id}`
    try {
        const responseMovie = await fetch(urlMovie, {
            headers: {
                authorization: `Bearer ${TOKEN_API}`,
            },
        });
        if (!responseMovie.ok) {
            throw new Error(`Failed to fetch movie details: ${responseMovie.statusText}`);
        }
        const movieData = await responseMovie.json();
        const genres = await getMovieGenres() // obtengo generos, convertir los generos
        const genresNames = formatGenresToMap(genres)
        // Transformar los datos de la API al modelo de negocio Movie
        const movie: Movie = formatMovie(movieData, genresNames);

        return movie;

    } catch (error) {
        console.error(`Error fetching movie details: ${error}`);
        throw error;
    }
}