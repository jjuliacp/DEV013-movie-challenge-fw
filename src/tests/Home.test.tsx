import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
// import { responseMovieDetail } from "./mockdata";
import { getMovieGenres } from "../services/movieService";
import {
  formatGenresToMap,
  formatGenresToOptions,
} from "../utils/transformers";

const mockGenresData = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
];
jest.mock("../utils/config", () => ({
  TOKEN_API: process.env.VITE_TOKEN_API,
}));
jest.mock("../services/APIService", () => ({
  getMovies: jest.fn(),
}));
jest.mock("../services/movieService", () => ({
  getMovieGenres: jest.fn(),
}));

jest.mock("../utils/transformers", () => ({
  formatGenresToMap: jest.fn(),
  formatGenresToOptions: jest.fn(),
}));

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches genres and updates the genresMap", async () => {
    (getMovieGenres as jest.Mock).mockResolvedValue(mockGenresData);
    (formatGenresToMap as jest.Mock).mockReturnValue(
      new Map(mockGenresData.map((genre) => [genre.id, genre.name]))
    );
    (formatGenresToOptions as jest.Mock).mockReturnValue([
      { value: "28", label: "Action" },
      { value: "35", label: "Comedy" },
    ]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getMovieGenres).toHaveBeenCalledTimes(1);
      expect(formatGenresToMap).toHaveBeenCalledWith(mockGenresData);
      expect(formatGenresToOptions).toHaveBeenCalled();
    });

    const filterByCategoryText = screen.getByText("Filter By Category");
    expect(filterByCategoryText).toBeInTheDocument();
  });
  test("displays an error message when fetching genres fails", async () => {
    (getMovieGenres as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getMovieGenres).toHaveBeenCalledTimes(1);
    });
  });
});
