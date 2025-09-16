import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Burada TMDB trend filmler API çağrısı olacak
    setMovies([]);
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
