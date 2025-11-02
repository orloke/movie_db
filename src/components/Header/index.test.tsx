import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { Header } from './index';

// --- MOCKS ---
vi.mock('react-router-dom', () => ({
  Link: vi.fn(({ to, children, ...rest }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  )),
}));

vi.mock('@/components/Header/SearchInput', () => ({
  SearchInput: vi.fn(() => <div data-testid="search-input-mock" />),
}));

vi.mock('./NavHeader', () => ({
  NavHeader: vi.fn(() => <nav data-testid="nav-header-mock" />),
}));

vi.mock('/movie.svg', () => ({
  default: 'mocked-logo.svg',
}));


describe('Header Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve renderizar o logo, o título e a estrutura correta de navegação', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'mocked-logo.svg');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('MovieDB');

    expect(screen.getByTestId('search-input-mock')).toBeInTheDocument();
    expect(screen.getByTestId('nav-header-mock')).toBeInTheDocument();
  });

  test('deve ter a estrutura de layout correta', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    expect(headerElement).toHaveClass('md:p-8 p-4 max-w-640 mx-auto w-full pb-4');
  });
});
