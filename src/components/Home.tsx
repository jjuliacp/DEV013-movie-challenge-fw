import { useEffect, useState } from "react";
import Movie from "../models/movie";
import { getMovies } from "../services/APIService";
import MovieList from "./MovieList";
import "../styles/Home.css";
import Pagination from "./Pagination";
import { LuPlaySquare } from "react-icons/lu";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // Estado para almacenar las películas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getMovies({ filters: { page: currentPage } });

        setMovies(result.movies);
        setTotalPages(result.metaData.pagination.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true); // Se establece un error si se produce un error al cargar las películas;
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    console.log("actual", page);
    setCurrentPage(page);
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
            totalPages={Math.min(totalPages, 100)}
            onSelectPage={handlePageChange}
          />
        </footer>
      )}
    </>
  );
}

export default Home;
