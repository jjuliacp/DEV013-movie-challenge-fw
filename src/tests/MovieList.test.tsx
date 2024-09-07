import { render, screen } from "@testing-library/react";
import MovieList from "../components/MovieList";
import { mockMovies } from "./mockdata";
import { MemoryRouter } from "react-router-dom";

describe("MovieList", () => {
  test("The Movielist is renders the correct number of MovieCard components", () => {
    render(
      <MemoryRouter>
        <MovieList movies={mockMovies} />
      </MemoryRouter>
    );

    const movieList = screen.getByTestId("movie-list");
    expect(movieList.children).toHaveLength(mockMovies.length);
  });
  test("renders no MovieCard components when movie list is empty", () => {
    render(<MovieList movies={[]} />);
    const movieList = screen.getByTestId("movie-list");
    expect(movieList.children).toHaveLength(0);
  });
});
