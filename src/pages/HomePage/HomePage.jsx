import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/Api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const trending = await getTrendingMovies();
        setMovies(trending);
      } catch (err) {
        console.error("Trend filmi hatası:", err);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>Loading...</p>}
    </div>
  );
}
