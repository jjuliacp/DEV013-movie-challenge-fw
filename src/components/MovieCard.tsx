//definir prop movie para cartel de pelicula, titulo y año
import Movie from "../models/movie";
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <li className="movie-card">
      <img
        className="movie-card-img"
        src={movie.posterPath}
        alt={movie.title}
      />
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-year">{movie.releaseYear}</p>
      <p className="movie-genre">{movie.genres.slice(0, 2)}</p>
    </li>
  );
};

export default MovieCard;
