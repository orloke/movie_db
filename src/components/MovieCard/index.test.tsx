import { MovieCard } from '@/components/MovieCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/components/HighlightText', () => ({
  HighlightText: ({ text, term }: { text: string; term: string }) => (
    <span data-testid="highlighted-text">{`Destaque: ${text} | Termo: ${term}`}</span>
  ),
}));

vi.mock('@/components/Card', () => ({
  Card: {
    CardRoot: vi.fn(({ onClick, children }) => (
      <div data-testid="card-root" onClick={onClick}>
        {children}
      </div>
    )),
    CardTitle: vi.fn(({ children }) => <h2>{children}</h2>),
    CardBadge: vi.fn(({ children }) => <span>{children}</span>),
    CardDescription: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    CardButton: ({ children }: { children: ReactNode }) => (
      <button>{children}</button>
    ),
  },
}));

const mockProps = {
  children: <div data-testid="extra-content" />,
  imageUrl: '/poster.jpg',
  title: 'A Lenda de Teste',
  vote_average: 8.75,
  id: 42,
};

describe('MovieCard Logic', () => {
  test('deve formatar a média de voto corretamente e usar CardBadge', () => {
    render(<MovieCard {...mockProps} />);

    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  test('deve navegar para a rota correta ao ser clicado', async () => {
    const user = userEvent.setup();
    render(<MovieCard {...mockProps} />);

    const cardRoot = screen.getByTestId('card-root');
    await user.click(cardRoot);

    expect(mockNavigate).toHaveBeenCalledWith('/movie/42');
  });

  test('deve usar HighlightText quando isHighlight.term está presente', () => {
    render(<MovieCard {...mockProps} isHighlight={{ term: 'Lenda' }} />);

    const expectedText = 'Destaque: A Lenda de Teste | Termo: Lenda';

    expect(screen.getByText(expectedText)).toBeInTheDocument();

    expect(screen.queryByText('A Lenda de Teste')).not.toBeInTheDocument();
  });
});
