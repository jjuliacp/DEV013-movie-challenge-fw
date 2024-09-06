import { getMovieDetail, getMovieGenres } from "../services/movieService";
import { mockMovieData, responseMovieDetail } from "./mockdata";
const mockGenresData = {
  genres: [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
  ],
};
jest.mock("../utils/config", () => ({
  TOKEN_API: process.env.VITE_TOKEN_API,
}));

describe("getMovieGneres", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        statusText: "OK",
        json: () => Promise.resolve(mockGenresData),
      })
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("should fetch and return movie genres", async () => {
    const result = await getMovieGenres();

    expect(result).toEqual(mockGenresData.genres);
  });
  test("should throw an error if fetch fails", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    );
    await expect(getMovieDetail(123)).rejects.toThrow(
      "Failed to fetch movie details: Not Found"
    );
  });
});

describe("getmovieDetail", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        statusText: "OK",
        json: () => Promise.resolve(mockMovieData),
      })
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("should fetch and return movies with details", async () => {
    const response = await getMovieDetail(123);
    expect(response).toEqual(responseMovieDetail);
  });
  test("should throw an error if fetch throws an exception", async () => {
    // Simula una excepción en la llamada fetch
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error("Error fetching movie details: Network error"))
    );

    await expect(getMovieDetail(123)).rejects.toThrow(
      "Error fetching movie details: Network error"
    );
  });
});
