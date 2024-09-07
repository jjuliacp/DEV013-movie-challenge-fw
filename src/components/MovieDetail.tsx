import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/movieService";
import { useNavigate, useParams } from "react-router-dom";
import Movie from "../models/movie";
import { LuPlaySquare } from "react-icons/lu";
import "../styles/MovieDetail.css";
import { TiArrowBackOutline } from "react-icons/ti";
import StarRatingComponent from "react-star-rating-component";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
    <>
      <header>
        <LuPlaySquare className="logo-icon" />
        <h1 className="logo-text">Cinephile</h1>
      </header>
      <main className="mainMovieDetail">
        <button className="btnBack" onClick={() => navigate(-1)}>
          <TiArrowBackOutline className="iconBack" />
          Back to the movie list
        </button>
        <div className="movieDetails">
          <img
            className="img-movieDetail"
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
          {movie && (
            <div className="movieDescription">
              <h1 className="title" data-testid="movie-title">
                {movie.title} ({movie.releaseYear})
              </h1>
              <p>{movie.releaseYear}</p>
              <p>
                <StarRatingComponent
                  name="rating"
                  starCount={5}
                  value={movie.voteAverage / 2}
                  editing={false} // Evita que los usuarios puedan cambiar la calificación
                />
                <br />
                {movie.voteAverage / 2}
              </p>
              <p>
                Genres: {movie.genres && movie.genres.slice(0, 3).join(" , ")}
              </p>
              <p>Overview: {movie.overview}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default MovieDetail;
