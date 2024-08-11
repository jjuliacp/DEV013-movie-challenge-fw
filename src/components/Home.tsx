import { useEffect, useState } from "react";
import Movie from "../models/movie";
import { getMovies } from "../services/APIService";
import MovieList from "./MovieList";
import "../styles/Home.css";
import Pagination from "./Pagination";
import { LuPlaySquare } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { formatGenresToMap } from "../utils/transformers";
import { getMovieGenres } from "../services/movieService";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // Estado para almacenar las películas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const resultGenre = await getMovieGenres();
        setGenresMap(formatGenresToMap(resultGenre)); // obtiene los geenros y los formatea
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };
    fetchGenres();
  }, []); // se ejecuta solo una vez al mostrar el componente

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getMovies(
          { filters: { page: currentPage } },
          genresMap
        );

        setMovies(result.movies);
        setTotalPages(result.metaData.pagination.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true); // Se establece un error si se produce un error al cargar las películas;
      }
    };

    if (genresMap.size > 0) {
      // Asegurarse de que el genresMap esté listo antes de hacer la solicitud de películas
      fetchMovies();
    }
  }, [currentPage, genresMap]);

  const handlePageChange = (page: number) => {
    console.log("actual", page);
    // Actualizar los searchParams con la nueva página
    setSearchParams({ page: String(page) });
  };
  return (
    <>
      <header>
        <LuPlaySquare className="logo-icon" />
        <h1 className="logo-text">Cinephile</h1>
      </header>
      <nav></nav>
      <main className={isLoading ? "loading" : ""}>
        {isLoading && <div className="loader"></div>}
        {!isLoading && error && (
          <p>Ocurrió un error al cargar las películas.</p>
        )}
        {!isLoading && !error && <MovieList movies={movies} />}
      </main>
      {!isLoading && !error && (
        <footer>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(totalPages, 30)}
            onSelectPage={handlePageChange}
          />
        </footer>
      )}
    </>
  );
}

export default Home;
