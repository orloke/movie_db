import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { HighlightText } from './index';

describe('HighlightText Component', () => {
  test('deve retornar o texto completo sem destaque se o termo estiver vazio', () => {
    const text = 'Um filme sobre heróis';
    render(<HighlightText text={text} term="" />);

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.queryByRole('mark')).not.toBeInTheDocument();
  });

  test('deve destacar um termo simples, ignorando maiúsculas/minúsculas', () => {
    const text = 'Os Vingadores estão de volta.';
    const term = 'vingadores';
    render(<HighlightText text={text} term={term} />);

    const highlightedPart = screen.getByText('Vingadores');
    expect(highlightedPart.tagName).toBe('MARK');
    expect(highlightedPart).toHaveClass('bg-yellow-300');

    expect(screen.getByText('Os ', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(' estão de volta.', { exact: false }),
    ).toBeInTheDocument();
  });

  test('deve destacar múltiplas ocorrências do termo', () => {
    const text = 'Batman e Superman são da DC, mas Batman é melhor.';
    const term = 'Batman';
    render(<HighlightText text={text} term={term} />);

    const highlightedParts = screen.getAllByText('Batman');

    expect(highlightedParts).toHaveLength(2);
    expect(highlightedParts[0].tagName).toBe('MARK');
    expect(highlightedParts[1].tagName).toBe('MARK');
  });

  test('deve lidar e destacar termos com caracteres de regex (ex: parênteses)', () => {
    const text = 'O filme (Batman) foi lançado.';
    const term = '(Batman)';
    render(<HighlightText text={text} term={term} />);

    const highlightedPart = screen.getByText('(Batman)');

    expect(highlightedPart.tagName).toBe('MARK');
    expect(highlightedPart).toHaveTextContent('(Batman)');
  });

  test('deve destacar corretamente termos no início e no fim do texto', () => {
    const text = 'Início do filme. Fim do filme.';
    const term = 'filme';
    render(<HighlightText text={text} term={term} />);

    const highlightedParts = screen.getAllByText('filme');

    expect(highlightedParts).toHaveLength(2);
    expect(highlightedParts[0]).toHaveTextContent('filme');
    expect(highlightedParts[1]).toHaveTextContent('filme');
  });

  test('não deve renderizar a tag <mark> se o termo não for encontrado', () => {
    const text = 'Filme de Ação';
    const term = 'Comédia';
    render(<HighlightText text={text} term={term} />);

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.queryByRole('mark')).not.toBeInTheDocument();
  });
});
