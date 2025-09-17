import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map((m) => (
        <li key={m.id}>
          <Link to={`/movies/${m.id}`} state={{ from: location }}>
            {m.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
