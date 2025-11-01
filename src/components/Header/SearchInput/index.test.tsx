import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SearchInput } from './index';

// --- MOCKS DE DEPENDÊNCIAS ---

const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();
const mockSetSearchParams = vi.fn();
let mockSearchParams = new URLSearchParams();
const mockUseSearchParams = vi.fn(() => [
  mockSearchParams,
  mockSetSearchParams,
]);

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
  useSearchParams: () => mockUseSearchParams(),
}));

vi.mock('@/components/ui/input', () => ({
  Input: vi.fn((props) => (
    <input
      data-testid="search-input"
      className={props.className}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )),
}));

describe('SearchInput Component (Funcionalidades Básicas)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({ pathname: '/home' });
    mockSearchParams = new URLSearchParams();
  });

  test('deve renderizar o input e inicializar com valor de "term" da URL', () => {
    mockSearchParams.set('term', 'filme inicial');

    render(<SearchInput />);

    const input = screen.getByTestId('search-input');

    expect(input).toHaveValue('filme inicial');
  });

  test('deve atualizar o estado local (value) na digitação sem chamar set router logo de cara', async () => {
    const user = userEvent.setup({ delay: null });

    render(<SearchInput />);

    vi.clearAllMocks();

    const input = screen.getByTestId('search-input');

    await user.type(input, 'vingadores');

    expect(input).toHaveValue('vingadores');

    expect(mockSetSearchParams).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
