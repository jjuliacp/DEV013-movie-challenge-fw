import { TOKEN_API } from "../utils/config";

export async function getMovieGenres(): Promise<[{ id: number; name: string }]> {
    const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list'
    try {
        const responseGenres = await fetch(urlGenres, {
            headers: {
                authorization: `Bearer ${TOKEN_API}`,
            },
        });

        if (!responseGenres.ok) {
            throw new Error(`HTTP error! status: ${responseGenres.status}`);
        }
        const genresData = await responseGenres.json();
        return genresData.genres.map((genre: { id: number; name: string }) => ({
            id: genre.id,
            name: genre.name,
        }));
    } catch (error) {
        console.error(`Error fetching movie genres: ${error}`);
        throw error;
    }
}
