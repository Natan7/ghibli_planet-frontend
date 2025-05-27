import { SET_MOVIES, TOGGLE_FAVORITE, TOGGLE_WATCHED, UPDATE_RATING, UPDATE_MOVIE_COMMENT } from "./actions";

const initialState = {
  movies: JSON.parse(localStorage.getItem("movies")) || [],
};

export default function moviesReducer(state = initialState, action) {

  switch (action.type) {
    case SET_MOVIES:
      localStorage.setItem("movies", JSON.stringify(action.payload));
      return { ...state, movies: action.payload };

    case TOGGLE_FAVORITE:
      const updatedFavorites = state.movies.map((movie) =>
        movie.id === action.payload ? { ...movie, favorite: !movie.favorite } : movie
      );
      localStorage.setItem("movies", JSON.stringify(updatedFavorites));
      return { ...state, movies: updatedFavorites };

    case TOGGLE_WATCHED:
      const updatedWatched = state.movies.map((movie) =>
        movie.id === action.payload ? { ...movie, watched: !movie.watched } : movie
      );
      localStorage.setItem("movies", JSON.stringify(updatedWatched));
      return { ...state, movies: updatedWatched };

    case UPDATE_RATING:
      const updatedRating = state.movies.map((movie) =>
        movie.id === action.payload.movieId ? { ...movie, personal_rating: action.payload.newRating } : movie
      );
      localStorage.setItem("movies", JSON.stringify(updatedRating));
      return { ...state, movies: updatedRating };

    case UPDATE_MOVIE_COMMENT:
      const updatedComment = state.movies.map((movie) =>
        movie.id === action.payload.movieId ? { ...movie, comment: action.payload.newComment } : movie
      );
      localStorage.setItem("movies", JSON.stringify(updatedComment));
      return { ...state, movies: updatedComment };
      
    default:
      return state;
  }
}