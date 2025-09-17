import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast, getImageUrl } from "../../services/Api";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const castList = await getMovieCast(movieId);
        setCast(castList);
      } catch (err) {
        console.error("Cast hatası:", err);
      }
    })();
  }, [movieId]);

  if (cast.length === 0) return <p>No cast info available</p>;

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={getImageUrl(actor.profile_path, "w200")}
            alt={actor.name}
            width={100}
          />
          <p>{actor.name}</p>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
