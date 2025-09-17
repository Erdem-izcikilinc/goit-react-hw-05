import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieCast, getMovieReviews, getImageUrl } from "../../services/Api";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        console.error("Film detay hatası:", err);
      }
    })();
  }, [movieId]);

  const handleToggleCast = async () => {
    if (!showCast && cast.length === 0) {
      const castList = await getMovieCast(movieId);
      setCast(castList);
    }
    setShowCast(!showCast);
  };

  const handleToggleReviews = async () => {
    if (!showReviews && reviews.length === 0) {
      const reviewList = await getMovieReviews(movieId);
      setReviews(reviewList);
    }
    setShowReviews(!showReviews);
  };

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div>
      <div className={styles.topSection}>
        <img
          className={styles.poster}
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
        />
        <div className={styles.details}>
          <h2>{movie.title}</h2>
          <p><strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={styles.genres}>
            {movie.genres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={handleToggleCast}>
          {showCast ? "Hide Cast" : "Show Cast"}
        </button>
        <button onClick={handleToggleReviews}>
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>
      </div>

      {showCast && (
        <ul className={styles.castList}>
          {cast.map(actor => (
            <li key={actor.id}>
              <img src={getImageUrl(actor.profile_path, "w200")} alt={actor.name} />
              <p><strong>{actor.name}</strong> as {actor.character}</p>
              <p>Department: {actor.known_for_department}</p>
            </li>
          ))}
        </ul>
      )}

      {showReviews && (
        <ul className={styles.reviewsList}>
          {reviews.length === 0 ? (
            <p>No reviews available</p>
          ) : (
            reviews.map(r => (
              <li key={r.id}>
                <p><strong>{r.author}</strong></p>
                <p>{r.content}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
