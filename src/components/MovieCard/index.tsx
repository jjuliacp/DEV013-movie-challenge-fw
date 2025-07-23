//definir prop movie para cartel de pelicula, titulo y año
import { useNavigate } from "react-router-dom";
import Movie from "../../models/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const browse = useNavigate();
  const handleClick = () => {
    browse(`/movie/${movie.id}`); // navegar a la pagina de detalle de la pelicula
  };
  return (
    <li className="movie-card">
      <img
        className="movie-card-img"
        src={movie.posterPath}
        alt={movie.title}
        onClick={handleClick} // al hacer click, se navega a la pagina de detalle de la pelicula
      />
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-genre">
        {movie.genres
          ? movie.genres.slice(0, 2).join(" - ")
          : "No genres available"}
      </p>
      <p className="movie-year">{movie.releaseYear}</p>
    </li>
  );
};

export default MovieCard;
