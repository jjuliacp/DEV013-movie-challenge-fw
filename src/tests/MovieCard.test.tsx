import { cleanup, render, screen } from "@testing-library/react";
import MovieCard from "../components/MovieCard";
import Movie from "../models/movie";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});
describe("Moviecard", () => {
  test("The MovieCard is rendered with movie details", () => {
    // Inicializa el objeto movie con datos de prueba
    const movie: Movie = {
      id: 1,
      title: "Inception",
      releaseYear: 2016,
      overview: "A mind-bending thriller",
      genres: ["Action", "Science Fiction"],
      posterPath: ".jpg",
      voteAverage: 8.8,
      voteCount: 123456,
    };
    //  simula  un entorno de routing en memoria para componentes que dependen de rutas
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );

    const list = screen.getByRole("listitem");
    expect(list).toBeTruthy();
  });
  test("renders correctly with missing genres", () => {
    const movieWithoutGenres: Movie = {
      id: 2,
      title: "Interstellar",
      releaseYear: 2014,
      overview: "A journey through space and time",
      genres: [],
      posterPath: "/path/to/interstellar.jpg",
      voteAverage: 8.6,
      voteCount: 89000,
    };

    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutGenres} />
      </MemoryRouter>
    );

    const genres = screen.getAllByText(""); // Cuando no hay géneros, el texto debería estar vacío
    expect(genres).toBeTruthy();
  });
});
