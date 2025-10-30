import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { RootState } from '@/stores';
import { toggleFavorite } from '@/stores/slices/favoriteMovie';
import type { FavoriteMovie } from '@/types/popularMovies';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

interface AddToFavoriteProps {
  movie: FavoriteMovie;
}

export function AddToFavorite({ movie }: AddToFavoriteProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const isFavorite = favorites.find((item) => item.id === movie.id);

  const handleClick = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <Button
      className="py-3 h-auto w-fit mt-4 group bg-red-500 hover:bg-red-400"
      onClick={handleClick}
    >
      <Heart className={cn("group-hover:fill-white", isFavorite && "fill-white")} />
      <span>{isFavorite ? 'Remover dos' : 'Adicionar aos'} favoritos</span>
    </Button>
  );
}
