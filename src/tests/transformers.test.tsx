import {
  formatGenresToMap,
  formatGenresToOptions,
  formatMovie,
} from "../utils/transformers";
import { expectedMovieEmpty, movieDataEmpty } from "./mockdata";
const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
];
const genresMap = new Map<number, string>([
  [28, "Action"],
  [35, "Comedy"],
]);
const expectedOptions = [
  { value: "28", label: "Action" },
  { value: "35", label: "Comedy" },
];
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

    expect(formatMovie(movie, genresMap)).toEqual(expectedMovie);
  });

  test("Handles empty string values correctly", () => {
    expect(formatMovie(movieDataEmpty, genresMap)).toEqual(expectedMovieEmpty);
  });
  test("Convert an array of genres into a map ", () => {
    expect(formatGenresToMap(genres)).toEqual(genresMap);
  });
  test("return an empty map if the array of genres is empty", () => {
    const genres: { id: number; name: string }[] = [];
    const expectedMap = new Map<number, string>();
    expect(formatGenresToMap(genres)).toEqual(expectedMap);
  });
  test("Convert an array of genres into an array of options", () => {
    const genresOption = [
      { id: "28", name: "Action" },
      { id: "35", name: "Comedy" },
    ];
    expect(formatGenresToOptions(genresOption)).toEqual(expectedOptions);
  });
});
