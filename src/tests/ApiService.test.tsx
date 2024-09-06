import { getMovies } from "../services/APIService";

const filters = {
  filters: {
    page: 1,
    genreId: 28,
    sortBy: "popularity.desc",
  },
};

const genresMap = new Map<number, string>([
  [28, "Action"],
  [35, "Comedy"],
]);

jest.mock("../utils/config", () => ({
  TOKEN_API: process.env.VITE_TOKEN_API,
}));

describe("getMovies", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            page: 1,
            total_pages: 10,
            results: [
              {
                id: 0,
                title: "Deadpool",
                poster_path: "/path/to/deadpool.jpg",
                release_date: "2024-01-01",
                overview: "this is a example",
                genre_ids: [28, 35],
                vote_average: 0,
                vote_count: 0,
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should fetch and return movies", async () => {
    const result = await getMovies(filters, genresMap);

    //  console.log("Received result:", result); // Debugging statement to check the result

    expect(result).toEqual({
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 10,
        },
      },
      movies: [
        {
          id: 0,
          title: "Deadpool",
          posterPath: "https://image.tmdb.org/t/p/w500/path/to/deadpool.jpg",
          releaseYear: 2023,
          overview: "this is a example",
          genres: ["Action", "Comedy"],
          voteAverage: 0,
          voteCount: 0,
        },
      ],
    });
  });
  test("should handle API errors", async () => {
    // Configura el mock para simular un error de red
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })
    );

    await expect(getMovies(filters, genresMap)).rejects.toThrow(
      "Network response was not ok"
    );
  });
});
