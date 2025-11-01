import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { InfiniteScrollTrigger } from './index';



let observerCallback: IntersectionObserverCallback | null = null;
const observeSpy = vi.fn();
const unobserveSpy = vi.fn();
const disconnectSpy = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }

  observe = observeSpy;
  unobserve = unobserveSpy;
  disconnect = disconnectSpy;
  takeRecords = () => [];
}


window.IntersectionObserver = MockIntersectionObserver as any;

const triggerIntersection = (isIntersecting: boolean) => {
  if (observerCallback) {
    act(() => {
      if (!observerCallback) return;
      observerCallback(
        [
          {
            isIntersecting,
            target: {} as Element,
            boundingClientRect: {} as DOMRect,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRect,
            time: 0,
            rootBounds: {} as DOMRect,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
  }
};

describe('InfiniteScrollTrigger Component', () => {
  const mockOnLoadMore = vi.fn();
  const childrenText = 'Conteúdo do Scroll';

  beforeEach(() => {
    vi.clearAllMocks();
    observerCallback = null;
    observeSpy.mockClear();
    unobserveSpy.mockClear();
    disconnectSpy.mockClear();
  });

  test('deve criar e iniciar a observação do elemento de gatilho', () => {
    render(
      <InfiniteScrollTrigger onLoadMore={mockOnLoadMore}>
        {childrenText}
      </InfiniteScrollTrigger>,
    );

    expect(observerCallback).not.toBeNull();


    expect(observeSpy).toHaveBeenCalledTimes(1);

    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });


  test('deve chamar onLoadMore quando o elemento entrar na viewport (isIntersecting = true)', () => {
    render(
      <InfiniteScrollTrigger onLoadMore={mockOnLoadMore}>
        {childrenText}
      </InfiniteScrollTrigger>,
    );

    triggerIntersection(true);

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });


  test('NÃO deve chamar onLoadMore se o elemento sair da viewport (isIntersecting = false)', () => {
    render(
      <InfiniteScrollTrigger onLoadMore={mockOnLoadMore}>
        {childrenText}
      </InfiniteScrollTrigger>,
    );

    triggerIntersection(false);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });


  test('NÃO deve criar o observador se o prop "enabled" for false', () => {
    render(
      <InfiniteScrollTrigger onLoadMore={mockOnLoadMore} enabled={false}>
        {childrenText}
      </InfiniteScrollTrigger>,
    );

    expect(observerCallback).toBeNull();

    triggerIntersection(true);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
    expect(observeSpy).not.toHaveBeenCalled();
  });


  test('deve desconectar o observador no unmount (cleanup do useEffect)', () => {
    const { unmount } = render(
      <InfiniteScrollTrigger onLoadMore={mockOnLoadMore}>
        {childrenText}
      </InfiniteScrollTrigger>,
    );

    unmount();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});
