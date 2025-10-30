import type { FavoriteMovie } from '@/types/popularMovies';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';



interface FavoriteMovieState {
  movies: FavoriteMovie[];
}

const initialState: FavoriteMovieState = {
  movies: [],
};

export const favoritesMoviesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      const exists = state.movies.some(
        (movie) => movie.id === action.payload.id,
      );
      if (exists) {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id,
        );
      } else {
        state.movies.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload,
      );
    },
    clearFavorites: (state) => {
      state.movies = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesMoviesSlice.actions;

export default favoritesMoviesSlice.reducer;
