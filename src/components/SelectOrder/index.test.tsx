import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SelectOrder } from './index';
import * as SelectComponents from '@/components/ui/select';

const mockSelectSpy = vi.fn();
const mockSelectItemSpy = vi.fn();

vi.mock('@/components/ui/select', () => {
  const Select = vi.fn(({ defaultValue, onValueChange, children }) => {
    mockSelectSpy({ defaultValue, onValueChange, children });

    return (
      <div data-testid="select-mock" data-default={defaultValue}>
        <button
          data-testid="select-change-button"
          onClick={() => onValueChange('title-desc')}
        >
          Change Order
        </button>
        {children}
      </div>
    );
  });

  const SelectItem = vi.fn(({ value, children }) => {
    mockSelectItemSpy({ value, children });

    return (
      <button data-testid={`select-item-${value}`} data-value={value}>
        {children}
      </button>
    );
  });

  return {
    Select,
    SelectTrigger: vi.fn(({ children }) => <div>{children}</div>),
    SelectValue: vi.fn(({ placeholder }) => <div>{placeholder}</div>),
    SelectContent: vi.fn(({ children }) => <div>{children}</div>),
    SelectGroup: vi.fn(({ children }) => <>{children}</>),
    SelectItem,
  };
});

describe('SelectOrder Component', () => {
  const mockSetOrder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSelectSpy.mockClear();
    mockSelectItemSpy.mockClear();
    mockSetOrder.mockClear();

    vi.mocked(SelectComponents.SelectTrigger).mockClear();
  });

  test('deve renderizar com o valor padrão e placeholder corretos', () => {
    render(<SelectOrder setOrder={mockSetOrder} />);

    expect(mockSelectSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: 'title-asc',
        onValueChange: expect.any(Function),
      }),
    );

    expect(screen.getByText('Selecione a ordem')).toBeInTheDocument();
  });

  test('deve renderizar todas as 4 opções de ordenação com seus valores corretos', () => {
    render(<SelectOrder setOrder={mockSetOrder} />);

    expect(screen.getByText('Título (A-Z)')).toBeInTheDocument();
    expect(screen.getByText('Título (Z-A)')).toBeInTheDocument();
    expect(screen.getByText('Mais recentes')).toBeInTheDocument();
    expect(screen.getByText('Mais antigos')).toBeInTheDocument();

    expect(mockSelectItemSpy).toHaveBeenCalledTimes(4);
    expect(mockSelectItemSpy).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'title-asc' }),
    );
  });

  test('deve chamar setOrder com o valor correto ao simular a seleção', () => {
    render(<SelectOrder setOrder={mockSetOrder} />);

    const selectMockButton = screen.getByTestId('select-change-button');

    fireEvent.click(selectMockButton);

    expect(mockSetOrder).toHaveBeenCalledTimes(1);
    expect(mockSetOrder).toHaveBeenCalledWith('title-desc');
  });
});


