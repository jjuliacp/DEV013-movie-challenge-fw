import styles from "./MovieInfo.module.css";
import { truncateText } from "../../utils/truncateText";
import Movie from "../../models/movie";

interface Props {
  movie: Movie;
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
  return (
    <div className={styles.movieDescription}>
      <h1 className={styles.title} data-testid="movie-title">
        {movie.title} ({movie.releaseYear})
      </h1>
      <p>{movie.releaseYear}</p>
      <p>Rating: {movie.voteAverage / 2}</p>
      <p>Genres: {movie.genres?.slice(0, 3).join(" , ")}</p>
      <p>Overview: {truncateText(movie.overview, 200)}</p>
    </div>
  );
};

export default MovieInfo;
