// import StarRatingComponent from "react-star-rating-component";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TiArrowBackOutline } from "react-icons/ti";
import Movie from "../../models/movie";
import { getMovieDetail } from "../../services/movieService";
import styles from "./MovieDetail.module.css";
import Logo from "../../components/Logo";
const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log("verificar id");
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (id) {
          const movie = await getMovieDetail(Number(id));
          setMovie(movie);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching movie details", err);
      }
      setLoading(false);
    };
    fetchMovieDetail();
  }, [id]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // console.log("esto es los generos ", movie.genres); // Depuración fuera del JSX
  // console.log("esto es los generos ", movie); // Depuración fuera del JSX

  return (
    <div className={styles.container}>
      <Logo />
      <main className={styles.mainMovieDetail}>
        <button className={styles.btnBack} onClick={() => navigate(-1)}>
          <TiArrowBackOutline className={styles.iconBack} />
          Back to the movie list
        </button>
        <div className={styles.movieDetails}>
          <img
            className={styles.moviePoster}
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
          {movie && (
            <div className={styles.movieDescription}>
              <h1 className={styles.title} data-testid="movie-title">
                {movie.title} ({movie.releaseYear})
              </h1>
              <p>{movie.releaseYear}</p>
              <p>
                {/* <StarRatingComponent
                  name="rating"
                  starCount={5}
                  value={movie.voteAverage / 2}
                  editing={false} // Evita que los usuarios puedan cambiar la calificación
                /> */}
                Rating: {movie.voteAverage / 2}
              </p>
              <p>
                Genres: {movie.genres && movie.genres.slice(0, 3).join(" , ")}
              </p>
              <p>Overview: {movie.overview}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default MovieDetail;
