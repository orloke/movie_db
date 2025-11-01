import { NavHeader } from '@/components/Header/NavHeader';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

const { LinkItemMock } = vi.hoisted(() => {
  return {
    LinkItemMock: vi.fn(({ label }) => (
      <a data-testid={`link-item-${label}`}>{label}</a>
    )),
  };
});

vi.mock('./LinkItem', () => ({
  LinkItem: LinkItemMock,
}));

describe('NavHeader Component', () => {
  test('deve renderizar dois LinkItem com as props corretas', () => {
    render(<NavHeader />);

    const container = screen.getByTestId('link-item-Home').closest('div');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex gap-4');

    expect(screen.getByTestId('link-item-Home')).toBeInTheDocument();

    expect(LinkItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/',
        icon: expect.anything(),
        label: 'Home',
      }),
      undefined,
    );

    expect(screen.getByTestId('link-item-Favoritos')).toBeInTheDocument();

    expect(LinkItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/favorites',
        icon: expect.anything(),
        label: 'Favoritos',
      }),
      undefined,
    );

    expect(LinkItemMock).toHaveBeenCalledTimes(2);
  });
});
