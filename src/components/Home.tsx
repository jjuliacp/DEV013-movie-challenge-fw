import { useEffect, useState } from "react";
import Movie from "../models/movie";
import { getMovies } from "../services/APIService";
import MovieList from "./MovieList";
import "../styles/Home.css";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // Estado para almacenar las películas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies();
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true); // Se establece un error si se produce un error al cargar las películas;
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <header>
        <h1 className="logo-text">Cinephile</h1>
      </header>
      <nav></nav>
      <main>
        {isLoading && <p>Cargando...</p>}
        {!isLoading && error && (
          <p>Ocurrió un error al cargar las películas.</p>
        )}
        {!isLoading && !error && <MovieList movies={movies} />}
      </main>
    </>
  );
}

export default Home;
