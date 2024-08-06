//getMovies no rcibe parámetros - devolver  Promise<Movie[]>)
import Movie from '../models/movie';
import { TOKEN_API } from '../utils/config';
import { formatMovie, MovieData } from '../utils/transformers';

// Define una interfaz para la respuesta de la API
interface ApiResponse {
  results: MovieData[];
  page: number;
  total_pages: number;
}



export async function getMovies({ filters: { page = 1 } }: { filters: { page?: number } }): Promise<{
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: Movie[];
}> {
  const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;


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
    console.log("data:", data)
    const movies: Movie[] = data.results.map((movie: MovieData) => formatMovie(movie)); // Aplica la función de transformación
    //console.log('Formatted Movies:', movies); // log formato de pelis 
    return {
      metaData: {
        pagination: {
          currentPage: page,
          totalPages: data.total_pages,
        },
      },
      movies,
    };
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}