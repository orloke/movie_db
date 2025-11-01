import type { Order } from '@/components/SelectOrder';
import type { FavoriteMovie } from '@/types/popularMovies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const baseUrlImage = import.meta.env.VITE_API_IMAGE_URL;

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}

export const createUrlImage = (imageUrl?: string | null) => {
  const img = `${baseUrlImage}${imageUrl}`;

  return img;
};

export const formattedDate = (date?: string) => {
  if (!date) return '';
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('pt-BR');
};

export const sortedMovies = (movies: FavoriteMovie[], order: Order) => {
  if (!movies?.length) return [];

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
    case 'note-desc':
      sorted.sort((a, b) => b.vote_average - a.vote_average);
      break;
  }

  return sorted;
};
