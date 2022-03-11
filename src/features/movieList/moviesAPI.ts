import axios from "axios";

const KEY = "41a6894ca93cb1c78657d9e799e164de";

export const getSearchMovieByKeyword = (keyword: string) =>
  axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${keyword}&language=en-US&page=1&include_adult=false`
  );
export const getMovieDetails = (movieId: string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`
  );

export function fetchSearchMovieByKeyword(keyword: string) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${keyword}&language=en-US&page=1&include_adult=false`
  ).then((r) => r.json());
}

export function fetchGetMovieDetails(movieId: string) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`
  ).then((r) => r.json());
}
