import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { EmptyStateFavorite } from './index';

vi.mock('react-router-dom', () => ({
  Link: vi.fn(({ to, className, children }) => (
    <a href={to} className={className}>
      {children}
    </a>
  )),
}));

vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...args) => args.join(' ')),
}));

vi.mock('../ui/button', () => ({
  buttonVariants: vi.fn(() => 'button-base-classes'),
}));

vi.mock('@/assets/movie.svg', () => ({
  default: '/mocked-logo.svg',
}));

describe('EmptyStateFavorite Component', () => {
  const defaultProps = {
    title: 'Lista Vazia',
    label: 'Você não adicionou filmes à sua lista ainda.',
    labelButton: 'Explorar Filmes',
    href: '/home',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cn).mockClear();
  });

  test('deve renderizar o título, o rótulo e a imagem com os textos corretos', () => {
    render(<EmptyStateFavorite {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();

    const logoImg = screen.getByAltText('logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/mocked-logo.svg');
  });

  test('deve renderizar o botão (Link) com o texto e o link (href) corretos', () => {
    render(<EmptyStateFavorite {...defaultProps} />);

    const buttonLink = screen.getByRole('link', {
      name: defaultProps.labelButton,
    });

    expect(buttonLink).toBeInTheDocument();

    expect(buttonLink).toHaveAttribute('href', defaultProps.href);

    expect(buttonLink).toHaveTextContent(defaultProps.labelButton);
  });

  test('deve aplicar as classes CSS corretas ao Link', () => {
    render(<EmptyStateFavorite {...defaultProps} />);

    const buttonLink = screen.getByRole('link', {
      name: defaultProps.labelButton,
    });

    expect(buttonLink).toHaveClass('button-base-classes py-3 h-auto mt-4');

    expect(buttonVariants).toHaveBeenCalledWith({ variant: 'default' });

    expect(vi.mocked(cn)).toHaveBeenCalledWith(
      'button-base-classes',
      'py-3 h-auto mt-4',
    );
  });
});
