import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { act } from "react";

// import { responseMovieDetail } from "./mockdata";

jest.mock("../utils/config", () => ({
  TOKEN_API: process.env.VITE_TOKEN_API,
}));
describe("MovieDetail", () => {
  test("The MovieDetail is rendered", async () => {
    jest.mock("../services/movieService", () => ({
      getMovieDetail: jest.fn().mockResolvedValue({
        id: 1234,
        title: "Sample Movie",
        posterPath: "/path/to/poster.jpg",
        releaseYear: 2023,
        overview: "This is a sample movie overview.",
        voteAverage: 8,
        genres: ["Action", "Comedy"],
      }),
    }));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/movie/1234"]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Esperar que el título esté en el documento
    const movieTitle = screen.getByTestId("movie-title");

    expect(movieTitle).toBeInTheDocument();
  });
});
