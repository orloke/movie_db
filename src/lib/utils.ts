import type { Order } from '@/components/SelectOrder';
import type { TmdbMovie } from '@/types/popularMovies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortedMovies = (movies: TmdbMovie[], order: Order) => {
  if (!movies?.length) return []

  const sorted = [...movies];

  switch (order) {
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'release-asc':
      sorted.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
      break;
    case 'release-desc':
      sorted.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
      break;
  }

  return sorted;
};
