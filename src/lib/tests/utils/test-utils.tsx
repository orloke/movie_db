import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import type { ReactElement } from 'react';

import favoritesMoviesReducer from '@/stores/slices/favoriteMovie';

const rootReducer = combineReducers({
  favorites: favoritesMoviesReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,

    preloadedState,


    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
}

interface RenderOptions {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof setupStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
