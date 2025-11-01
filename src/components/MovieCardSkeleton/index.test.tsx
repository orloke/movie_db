import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MovieCardSkeleton } from './index';

describe('MovieCardSkeleton Component', () => {
  test('deve renderizar o elemento div com as classes de layout e animação', () => {
    const { container } = render(<MovieCardSkeleton />);

    const skeletonElement = container.firstChild;

    expect(skeletonElement).toBeInTheDocument();

    expect(skeletonElement).toHaveClass('h-96');
    expect(skeletonElement).toHaveClass('w-full');
    expect(skeletonElement).toHaveClass('rounded-2xl');
    expect(skeletonElement).toHaveClass('overflow-hidden');

    expect(skeletonElement).toHaveClass('bg-background-700');
    expect(skeletonElement).toHaveClass('animate-pulse');
  });

  test('o componente não deve renderizar conteúdo (deve estar vazio)', () => {
    const { container } = render(<MovieCardSkeleton />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
