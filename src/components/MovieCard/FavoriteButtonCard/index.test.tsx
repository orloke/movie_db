import { renderWithProviders } from '@/lib/tests/utils/test-utils';
import { type RootState } from '@/stores';
import * as favoriteMovieSlice from '@/stores/slices/favoriteMovie';
import type { TmdbMovie } from '@/types/popularMovies';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { FavoriteButtonCard } from './index';

const mockDispatch = vi.fn();

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock('lucide-react', () => ({
  Heart: vi.fn(({ className }) => (
    <span data-testid="heart-icon" className={className} />
  )),
}));

vi.mock('@/components/Card', () => ({
  Card: {
    CardButton: vi.fn(({ children, onClick, ...rest }) => (
      <button data-testid="card-button" onClick={onClick} {...rest}>
        {children}
      </button>
    )),
  },
}));

const toggleFavoriteSpy = vi.spyOn(favoriteMovieSlice, 'toggleFavorite');

const mockMovie = {
  id: 101,
  title: 'Filme de Teste',
  poster_path: '/path.jpg',
  release_date: '2023-01-01',
} as TmdbMovie;

const mockToggleAction = {
  type: 'favorites/toggleFavorite',
  payload: mockMovie,
};

describe('FavoriteButtonCard Integration Tests', () => {
  test('deve renderizar coração vazio quando o filme não está no estado Redux', () => {
    renderWithProviders(<FavoriteButtonCard movie={mockMovie} />);

    const heartIcon = screen.getByTestId('heart-icon');

    expect(heartIcon).not.toHaveClass('fill-red-500');
  });

  test('deve renderizar coração preenchido quando o filme está no estado Redux', () => {
    const preloadedState: Partial<RootState> = {
      favorites: {
        movies: [mockMovie],
      },
    };

    renderWithProviders(<FavoriteButtonCard movie={mockMovie} />, {
      preloadedState,
    });

    const heartIcon = screen.getByTestId('heart-icon');

    expect(heartIcon).toHaveClass('fill-red-500');
  });

  test('deve despachar a ação toggleFavorite e chamar props.onClick no clique', async () => {
    const user = userEvent.setup();
    const handlePropClick = vi.fn();

    toggleFavoriteSpy.mockReturnValue(mockToggleAction as any);

    renderWithProviders(
      <FavoriteButtonCard movie={mockMovie} onClick={handlePropClick} />,
    );

    const button = screen.getByTestId('card-button');
    await user.click(button);

    expect(toggleFavoriteSpy).toHaveBeenCalledWith(mockMovie);

    expect(mockDispatch).toHaveBeenCalledWith(mockToggleAction);

    expect(handlePropClick).toHaveBeenCalledTimes(1);

    expect(button).toHaveClass('absolute top-2 right-2');
  });
});
