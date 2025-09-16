import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    // Burada TMDB movie details API çağrısı olacak
    setMovie(null);
  }, [movieId]);

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>
      <h2>Movie Details (ID: {movieId})</h2>
      {movie && <div>{movie.title}</div>}
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
