//getMovies no rcibe parámetros - devolver  Promise<Movie[]>)
import Movie from '../models/movie';
import { TOKEN_API } from '../utils/config';
import { formatMovie, MovieData } from '../utils/transformers';

// Define una interfaz para la respuesta de la API
interface ApiResponse {
  results: MovieData[];
}


export async function getMovies(): Promise<Movie[]> {
  const url = 'https://api.themoviedb.org/3/discover/movie';


  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${TOKEN_API}`,
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ApiResponse = await response.json();
    const movies: Movie[] = data.results.map((movie: MovieData) => formatMovie(movie)); // Aplica la función de transformación
    //console.log('Formatted Movies:', movies); // log formato de pelis 
    return movies;
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}