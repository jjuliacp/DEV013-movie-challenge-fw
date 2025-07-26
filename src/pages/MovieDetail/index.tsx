import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import Movie from "../../models/movie";
import { getMovieDetail } from "../../services/movieService";
import styles from "./MovieDetail.module.css";
import Logo from "../../components/Logo";
import { getMovieCredits } from "../../services/movieService";
import MovieInfo from "../../components/MovieInfo";
import CastList from "../../components/CastList";

type CastMember = {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (id) {
          const [movieData, castData] = await Promise.all([
            getMovieDetail(Number(id)),
            getMovieCredits(Number(id)),
          ]);

          setMovie(movieData);
          setCast(castData.slice(0, 6));
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

          <div>
            <MovieInfo movie={movie} />
            <CastList cast={cast} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default MovieDetail;
