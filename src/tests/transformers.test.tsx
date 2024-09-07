/*import { formatMovie } from "../utils/transformers";
import { expectedMovieEmpty, movieDataEmpty } from "./mockdata";

describe("Transformers", () => {
  test("Transforms object into a type Movie object", () => {
    const movie = {
      id: 1,
      title: "Inception",
      poster_path: "/wozYB4yB8Jjw6pZ5dK86rV8e285.jpg",
      release_date: "2009-07-16",
      overview:
        "A thief, who steals corporate secrets through use of dream-sharing technology, is given the opportunity to try his luck on a new day.",
      voteAverage: 0,
      voteCount: 0,
    };
    const expectedMovie = {
      id: 1,
      title: "Inception",
      posterPath:
        "https://image.tmdb.org/t/p/w500/wozYB4yB8Jjw6pZ5dK86rV8e285.jpg",
      releaseYear: 2009,
      overview:
        "A thief, who steals corporate secrets through use of dream-sharing technology, is given the opportunity to try his luck on a new day.",
      genres: [],
      voteAverage: 0,
      voteCount: 0,
    };

    expect(formatMovie(movie)).toEqual(expectedMovie);
  });
  test("Handles empty string values correctly", () => {
    expect(formatMovie(movieDataEmpty)).toEqual(expectedMovieEmpty);
  });
});
*/
