import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Burada TMDB movie reviews API çağrısı olacak
    setReviews([]);
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews available</p>;

  return (
    <ul>
      {reviews.map(r => (
        <li key={r.id}>
          <p>{r.author}</p>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
