//definir prop movie para cartel de pelicula, titulo y año
import { useNavigate } from "react-router-dom";
import Movie from "../../models/movie";
import styles from "./MovieCard.module.css";
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const browse = useNavigate();
  const handleClick = () => {
    browse(`/movie/${movie.id}`); // navegar a la pagina de detalle de la pelicula
  };
  return (
    <li className={styles.movieCard}>
      <img
        className={styles.movieCardImage}
        src={movie.posterPath}
        alt={movie.title}
        onClick={handleClick} // al hacer click, se navega a la pagina de detalle de la pelicula
      />
      <h2 className={styles.movieCardTitle}>{movie.title}</h2>
      <p className={styles.movieCardGenres}>
        {movie.genres
          ? movie.genres.slice(0, 2).join(" - ")
          : "No genres available"}
      </p>
      <p className={styles.movieCardYear}>{movie.releaseYear}</p>
    </li>
  );
};

export default MovieCard;
