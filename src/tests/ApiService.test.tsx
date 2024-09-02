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

    console.log("Received result:", result); // Debugging statement to check the result

    expect(result).toBe({
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
          releaseYear: 2024, // Ensure this is what you expect
          overview: "this is a example",
          genres: ["Action", "Comedy"],
          voteAverage: 0,
          voteCount: 0,
        },
      ],
    });
  });
});
