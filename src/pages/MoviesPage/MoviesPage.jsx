import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/Api";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) return;
    (async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        console.error("Film arama hatası:", err);
      }
    })();
  }, [query]);

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No results</p>}
    </div>
  );
}
