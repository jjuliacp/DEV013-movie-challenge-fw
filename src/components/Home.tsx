import { useEffect, useState } from "react";
import Movie from "../models/movie";
import { getMovies } from "../services/APIService";
import MovieList from "./MovieList";
import "../styles/Home.css";
import Pagination from "./Pagination";
import { LuPlaySquare } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import {
  formatGenresToMap,
  formatGenresToOptions,
} from "../utils/transformers";
import { getMovieGenres } from "../services/movieService";
import ListOptions from "./ListOptions";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // Estado para almacenar las películas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());
  const [selectedGenre, setSelectedGenre] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const genreIdParam = searchParams.get("genreId");
  const sortByParam = searchParams.get("sortBy");

  // Lista estática de opciones de ordenamiento
  const sortByOptions = [
    { value: "popularity.desc", label: "Popularity Desc" },
    { value: "popularity.asc", label: "Popularity Asc" },
    { value: "release_date.desc", label: "Release Date Desc" },
    { value: "release_date.asc", label: "Release Date Asc" },
  ];

  // Fetch de géneros
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const resultGenre = await getMovieGenres();
        setGenresMap(formatGenresToMap(resultGenre));
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch de películas
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreFilter = genreIdParam
          ? { genreId: Number(genreIdParam) }
          : {};
        const sortByFilter = sortByParam ? { sortBy: sortByParam } : {};
        const { metaData, movies } = await getMovies(
          { filters: { page: currentPage, ...genreFilter, ...sortByFilter } },
          genresMap
        );

        setMovies(movies);
        setTotalPages(metaData.pagination.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    };

    if (genresMap.size > 0) {
      fetchMovies();
    }
  }, [currentPage, genreIdParam, sortByParam, genresMap]);

  // Cambiar filtro de género
  const selectFilter = (option: { value: string; label: string }) => {
    const newParams = { genreId: option.value, page: "1" };
    setSearchParams(
      (prevParams) =>
        new URLSearchParams({
          ...Object.fromEntries(prevParams.entries()),
          ...newParams,
        })
    );
    setSelectedGenre(option);
  };

  // Cambiar opción de ordenamiento
  const selectSort = (option: { value: string; label: string }) => {
    const newParams = { sortBy: option.value, page: "1" };
    setSearchParams(
      (prevParams) =>
        new URLSearchParams({
          ...Object.fromEntries(prevParams.entries()),
          ...newParams,
        })
    );
    setSelectedSortBy(option);
  };

  // Limpiar filtro de género
  const clearFilter = () => {
    setSelectedGenre(null);
    setSearchParams((prevParams) => {
      prevParams.delete("genreId");
      return new URLSearchParams(prevParams);
    });
  };

  // Limpiar opción de ordenamiento
  const clearSort = () => {
    setSelectedSortBy(null);
    setSearchParams((prevParams) => {
      prevParams.delete("sortBy");
      return new URLSearchParams(prevParams);
    });
  };

  // Seleccionar página
  const selectPage = (page: number) => {
    setSearchParams({
      page: `${page}`,
      genreId: genreIdParam || "",
      sortBy: sortByParam || "",
    });
  };

  // Convertir genresMap a un array de opciones utilizando formatGenresToOptions
  const genreOptions = formatGenresToOptions(
    Array.from(genresMap.entries()).map(([key, value]) => ({
      id: String(key),
      name: value,
    }))
  );

  return (
    <>
      <header>
        <LuPlaySquare className="logo-icon" />
        <h1 className="logo-text">Cinephile</h1>
      </header>
      <nav className="filter-navigation">
        <ListOptions
          type="Filter By Category"
          options={genreOptions}
          selectedOption={selectedGenre}
          onChange={selectFilter}
          onClear={clearFilter}
        />
        <ListOptions
          type="Sort by"
          options={sortByOptions}
          selectedOption={selectedSortBy}
          onChange={selectSort}
          onClear={clearSort}
        />
      </nav>
      <main className={isLoading ? "loading" : ""}>
        {isLoading && <div className="loader"></div>}
        {!isLoading && error && (
          <p>Ocurrió un error al cargar las películas.</p>
        )}
        {!isLoading && !error && <MovieList movies={movies} />}
      </main>
      {!isLoading && !error && (
        <footer>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(totalPages, 30)}
            onSelectPage={selectPage}
          />
        </footer>
      )}
    </>
  );
}

export default Home;
