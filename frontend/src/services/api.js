const API_KEY = "b4e9dbddd6dff2fe245bf291ec3b409d";
const BASE_URL = "https://api.themoviedb.org/3";

export const genres = {
  All: 0,
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  Horror: 27,
  Romance: 10749,
  ScienceFiction: 878,
  Thriller: 53,
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};