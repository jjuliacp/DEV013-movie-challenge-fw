import Movie from "../../models/movie";
import MovieCard from "../MovieCard";
import styles from "./MovieList.module.css";
//Definir una prop llamada movies de tipo Movie[] que represente un array de modelos de negocio de películas.
interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className={styles.containerCards} data-testid="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} /> // usa una clave unica
      ))}
    </ul>
  );
};

export default MovieList;
