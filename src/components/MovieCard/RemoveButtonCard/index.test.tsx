import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { RemoveButtonCard } from './index';
import * as favoriteMovieSlice from '@/stores/slices/favoriteMovie';

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock('lucide-react', () => ({
  Trash2: vi.fn(() => <span data-testid="trash-icon" />),
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

const removeFavoriteSpy = vi.spyOn(favoriteMovieSlice, 'removeFavorite');

const mockIdMovie = 999;
const mockRemoveAction = { type: 'favorites/removeFavorite', payload: mockIdMovie };


describe('RemoveButtonCard Interaction Tests', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve renderizar o CardButton com o ícone Trash2 e classes corretas', () => {
    render(<RemoveButtonCard idMovie={mockIdMovie} />);

    const button = screen.getByTestId('card-button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
    expect(button).toHaveClass('absolute top-2 right-2');
  });

  test('deve despachar a ação removeFavorite com o ID correto e chamar props.onClick', async () => {
    const user = userEvent.setup();
    const handlePropClick = vi.fn();

    removeFavoriteSpy.mockReturnValue(mockRemoveAction as any);

    render(
      <RemoveButtonCard idMovie={mockIdMovie} onClick={handlePropClick} />
    );

    const button = screen.getByTestId('card-button');
    await user.click(button);

    expect(removeFavoriteSpy).toHaveBeenCalledWith(mockIdMovie);
    expect(mockDispatch).toHaveBeenCalledWith(mockRemoveAction);
    expect(handlePropClick).toHaveBeenCalledTimes(1);

    expect(mockDispatch.mock.invocationCallOrder[0]).toBeLessThan(handlePropClick.mock.invocationCallOrder[0]);
  });

  test('deve despachar a ação removeFavorite corretamente mesmo sem props.onClick', async () => {
    const user = userEvent.setup();
    removeFavoriteSpy.mockReturnValue(mockRemoveAction as any);

    render(<RemoveButtonCard idMovie={mockIdMovie} />);

    const button = screen.getByTestId('card-button');
    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockRemoveAction);
  });
});
