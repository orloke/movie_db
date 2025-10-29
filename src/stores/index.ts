import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/stores/slices/favoriteMovie'

export const store = configureStore({
  reducer: {
    favoriteMovie: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
