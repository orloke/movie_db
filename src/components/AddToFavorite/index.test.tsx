import { renderWithProviders, screen } from '@/lib/tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { AddToFavorite } from './index';

vi.mock('@/components/ui/button', () => ({
  Button: vi.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

vi.mock('@/lib/utils', () => ({
  cn: vi.fn(() => ''),
}));

vi.mock('lucide-react', () => ({
  Heart: vi.fn(() => <span data-testid="heart-icon" />),
}));

vi.mock('redux-persist', async () => {
  return {
    FLUSH: 'FLUSH',
    REHYDRATE: 'REHYDRATE',
    PAUSE: 'PAUSE',
    PERSIST: 'PERSIST',
    PURGE: 'PURGE',
    REGISTER: 'REGISTER',
    persistStore: vi.fn(),
    persistReducer: vi.fn((reducer) => reducer),
  };
});

const mockMovie = {
  id: 101,
  title: 'Filme de Teste',
  poster_path: '/path.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
};
const otherMovie = {
  id: 202,
  title: 'Outro Filme',
  poster_path: '/other.jpg',
  release_date: '2023-02-02',
  vote_average: 8.5,
};

describe('AddToFavorite Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve mostrar "Adicionar aos favoritos" e adicionar o filme ao estado Redux no clique', async () => {
    const user = userEvent.setup();

    const { store } = renderWithProviders(<AddToFavorite movie={mockMovie} />);

    const addButton = screen.getByRole('button', {
      name: /Adicionar aos favoritos/i,
    });
    expect(addButton).toBeInTheDocument();

    expect(store.getState().favorites.movies).toHaveLength(0);

    await user.click(addButton);

    const currentState = store.getState();
    expect(currentState.favorites.movies).toHaveLength(1);
    expect(currentState.favorites.movies[0].id).toBe(mockMovie.id);
  });

  test('deve mostrar "Remover dos favoritos" e remover o filme do estado Redux no clique', async () => {
    const user = userEvent.setup();

    const { store } = renderWithProviders(<AddToFavorite movie={mockMovie} />, {
      preloadedState: {
        favorites: {
          movies: [mockMovie, otherMovie],
        },
      },
    });

    const removeButton = screen.getByRole('button', {
      name: /Remover dos favoritos/i,
    });
    expect(removeButton).toBeInTheDocument();

    expect(store.getState().favorites.movies).toHaveLength(2);

    await user.click(removeButton);

    const currentState = store.getState();
    expect(currentState.favorites.movies).toHaveLength(1);

    expect(
      currentState.favorites.movies.some((m) => m.id === mockMovie.id),
    ).toBe(false);

    expect(
      currentState.favorites.movies.some((m) => m.id === otherMovie.id),
    ).toBe(true);
  });
});
