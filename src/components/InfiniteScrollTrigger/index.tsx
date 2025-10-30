import React, { useEffect, useRef, type ReactNode } from 'react';

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  enabled?: boolean;
  rootMargin?: string;
  children: ReactNode;
}

export const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({
  onLoadMore,
  enabled = true,
  rootMargin = '200px',
  children
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onLoadMore, enabled, rootMargin]);

  return (
    <>
      {children}
      <div ref={ref} className="h-4" />
    </>
  );
};
