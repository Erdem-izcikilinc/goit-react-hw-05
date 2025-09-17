import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/Api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        console.error("Reviews hatası:", err);
      }
    })();
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews available</p>;

  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.id}>
          <p>
            <strong>{r.author}</strong>
          </p>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
