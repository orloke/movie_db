import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface FavoriteMovieState {
  ids: number[];
}

const initialState: FavoriteMovieState = {
  ids: [],
};

export const FavoritesMovies = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter((id) => id !== action.payload);
      } else {
        state.ids.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleFavorite, removeFavorite } = FavoritesMovies.actions;
export default FavoritesMovies.reducer;
