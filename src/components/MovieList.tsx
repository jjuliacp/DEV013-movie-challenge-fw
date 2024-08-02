import Movie from "../models/movie";
import MovieCard from "./MovieCard";
import "../styles/MovieCard.css";

//Definir una prop llamada movies de tipo Movie[] que represente un array de modelos de negocio de películas.
interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className="container-cards">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} /> // usa una clave unica
      ))}
    </ul>
  );
};

export default MovieList;
