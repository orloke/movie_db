import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MovieDetailSkeleton } from './index';

type DivElement = HTMLDivElement;

describe('MovieDetailSkeleton Component', () => {

  test('deve renderizar a div raiz com classes de layout e animação pulse', () => {
    const { container } = render(<MovieDetailSkeleton />);
    const rootElement = container.firstChild;

    expect(rootElement).toBeInTheDocument();

    expect(rootElement).toHaveClass('grid');
    expect(rootElement).toHaveClass('grid-cols-12');
    expect(rootElement).toHaveClass('animate-pulse');
  });

  test('deve renderizar o painel de imagem (coluna 1) com classes de altura e cor', () => {
    const { container } = render(<MovieDetailSkeleton />);

    const rootElement = container.firstChild as DivElement;

    const imagePanel = rootElement?.children[0];

    expect(imagePanel).toBeInTheDocument();

    expect(imagePanel).toHaveClass('col-span-12');
    expect(imagePanel).toHaveClass('md:col-span-6');

    const imagePlaceholder = imagePanel?.firstChild;
    expect(imagePlaceholder).toHaveClass('rounded-2xl');
    expect(imagePlaceholder).toHaveClass('bg-gray-700/60');
    expect(imagePlaceholder).toHaveClass('md:h-full');
  });

  test('deve renderizar o painel de detalhes (coluna 2) com a estrutura de placeholders', () => {
    const { container } = render(<MovieDetailSkeleton />);

    const rootElement = container.firstChild as DivElement;

    const detailsPanel = rootElement?.children[1] as DivElement;

    expect(detailsPanel).toBeInTheDocument();

    expect(detailsPanel).toHaveClass('col-span-12');
    expect(detailsPanel).toHaveClass('md:col-span-6');
    expect(detailsPanel).toHaveClass('flex-col');

    expect(detailsPanel?.children.length).toBeGreaterThanOrEqual(5);

    const titlePlaceholder = detailsPanel?.children[0];
    expect(titlePlaceholder).toHaveClass('h-10');
    expect(titlePlaceholder).toHaveClass('w-3/4');

    const buttonPlaceholder = detailsPanel?.children[detailsPanel.children.length - 1];
    expect(buttonPlaceholder).toHaveClass('h-10');
    expect(buttonPlaceholder).toHaveClass('w-40');
  });
});
