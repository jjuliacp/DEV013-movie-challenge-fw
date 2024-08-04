import { render, screen } from "@testing-library/react";
import MovieCard from "../components/MovieCard";
import Movie from "../models/movie";

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
    // Renderiza el componente MovieCard con el objeto movie como prop
    render(<MovieCard movie={movie} />);

    const list = screen.getByRole("listitem");
    expect(list).toBeTruthy();
  });
});
