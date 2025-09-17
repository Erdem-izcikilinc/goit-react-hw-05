import axios from "axios";

const API_KEY = "8ace3b5a5fa9f6596827f60ea16c6cc4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export function getImageUrl(path, size = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export async function getTrendingMovies() {
  const { data } = await tmdb.get("/trending/movie/day");
  return data.results;
}

export async function searchMovies(query, page = 1) {
  const { data } = await tmdb.get("/search/movie", {
    params: { query, page, include_adult: false, language: "en-US" },
  });
  return data.results;
}

export async function getMovieDetails(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });
  return data;
}

export async function getMovieCast(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}/credits`, {
    params: { language: "en-US" },
  });
  return data.cast;
}

export async function getMovieReviews(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}/reviews`, {
    params: { language: "en-US", page: 1 },
  });
  return data.results;
}
