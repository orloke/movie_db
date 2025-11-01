import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '@/components/Card';
import { describe, expect, test, vi } from 'vitest';

describe('Card.CardRoot (Acessibilidade e Interação)', () => {
  test('deve chamar onClick ao ser clicado e pressionar Enter/Space', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Card.CardRoot onClick={handleClick}>Conteúdo</Card.CardRoot>
    );

    const rootElement = screen.getByText('Conteúdo').closest('div') as HTMLDivElement;
    expect(rootElement).toHaveAttribute('tabindex', '0');

    await user.click(rootElement);
    expect(handleClick).toHaveBeenCalledTimes(1);

    await fireEvent.keyDown(rootElement, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(2);

    await fireEvent.keyDown(rootElement, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});

