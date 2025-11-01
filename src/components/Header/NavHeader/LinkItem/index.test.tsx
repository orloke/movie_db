import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import { LinkItem } from './index';
import { Heart } from 'lucide-react';


const mockUseLocation = vi.fn();

const { buttonVariants } = vi.hoisted(() => {
  return {
    buttonVariants: vi.fn((props) => `variant-${props?.variant}`),
  };
});

vi.mock('react-router-dom', () => ({
  Link: vi.fn(({ to, children, className, ...rest }) => (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  )),
  useLocation: () => mockUseLocation(),
}));

vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...classes) => classes.join(' ')),
}));

vi.mock('@/components/ui/button', () => ({
  buttonVariants: buttonVariants,
}));

vi.mock('lucide-react', () => ({
  Heart: vi.fn(({ className }) => <span data-testid="heart-icon" className={className} />),
}));


const mockProps = {
  to: '/favorites',
  icon: Heart,
  label: 'Meus Favoritos',
};


describe('LinkItem Component', () => {

  test('deve renderizar o link com o caminho e label corretos', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });

    render(<LinkItem {...mockProps} />);

    const linkElement = screen.getByRole('link', { name: /meus favoritos/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/favorites');
    expect(screen.getByText('Meus Favoritos')).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  test('deve aplicar o variant "default" quando o link está ativo', () => {
    mockUseLocation.mockReturnValue({ pathname: '/favorites' });

    render(<LinkItem {...mockProps} />);

    const linkElement = screen.getByRole('link', { name: /meus favoritos/i });

    expect(linkElement).toHaveClass('variant-default');

    expect(buttonVariants).toHaveBeenCalledWith({
      variant: 'default',
    });
  });

  test('deve aplicar o variant "secondary" quando o link está inativo', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });

    render(<LinkItem {...mockProps} />);

    const linkElement = screen.getByRole('link', { name: /meus favoritos/i });

    expect(linkElement).toHaveClass('variant-secondary');

    expect(buttonVariants).toHaveBeenCalledWith({
      variant: 'secondary',
    });
  });
});
