// Tipos de Ação
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const TOGGLE_WATCHED = "TOGGLE_WATCHED";
export const UPDATE_RATING = "UPDATE_RATING";
export const UPDATE_MOVIE_COMMENT = "UPDATE_MOVIE_COMMENT";
export const SET_MOVIES = "SET_MOVIES";

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies,
});

export const toggleFavorite = (movieId) => ({
  type: TOGGLE_FAVORITE,
  payload: movieId,
});

export const toggleWatched = (movieId) => ({
  type: TOGGLE_WATCHED,
  payload: movieId,
});

export const updateRating = (movieId, newRating) => ({
  type: UPDATE_RATING,
  payload: { movieId, newRating },
});

export const updateMovieComment = (movieId, newComment) => ({
  type: UPDATE_MOVIE_COMMENT,
  payload: { movieId, newComment },
});
