import Movie from '../models/movie';
import { TOKEN_API } from '../utils/config';
import { formatMovie, MovieData } from '../utils/transformers';

// Define una interfaz para la respuesta de la API
interface ApiResponse {
  results: MovieData[];
  page: number;
  total_pages: number;
}

interface Filters {
  filters: {
    page?: number;
    genreId?: number | null;
    sortBy?: string | null;
  };
}

export async function getMovies({ filters: { page = 1, genreId = null, sortBy = null } }: Filters, genresMap: Map<number, string>): Promise<{
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: Movie[];
}> {

  // Construir la URL con los parámetros de filtrado
  let url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;

  // Agregar el filtro de género si está definido
  if (genreId !== null) {
    url += `&with_genres=${genreId}`;
  }

  // Agregar el criterio de ordenamiento si está definido
  if (sortBy) {
    url += `&sort_by=${sortBy}`;
  }
  console.log("Constructed URL:", url);
  console.log("Filters applied:", { page, genreId, sortBy });


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
    // const movies: Movie[] = data.results.map((movie: MovieData) => formatMovie(movie, genresMap)); // Aplica la función de transformación
    //console.log('Formatted Movies:', movies); // log formato de pelis 

    return {
      metaData: {
        pagination: {
          currentPage: data.page,
          totalPages: data.total_pages,
        },
      },
      movies: data.results.map((movie: MovieData) => formatMovie(movie, genresMap)),
      //aplicacion de transformacion
    };
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}