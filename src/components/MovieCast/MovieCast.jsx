import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // Burada TMDB movie cast API çağrısı olacak
    setCast([]);
  }, [movieId]);

  if (cast.length === 0) return <p>No cast info available</p>;

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
}
