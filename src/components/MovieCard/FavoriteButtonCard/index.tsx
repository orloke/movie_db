import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';
import type { RootState } from '@/stores';
import { toggleFavorite } from '@/stores/slices/favoriteMovie';
import { Heart } from 'lucide-react';
import type { ComponentProps, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface FavoriteButtonCardProps extends ComponentProps<'button'> {
  idMovie: number;
}

export function FavoriteButtonCard({ idMovie, ...props }: FavoriteButtonCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favoriteMovie.ids);
  const isFavorite = favorites.includes(idMovie);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleFavorite(idMovie));

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Card.CardButton
      {...props}
      className={cn('absolute top-2 right-2', props.className)}
      onClick={handleClick}
    >
      <Heart
        className={cn('text-red-500 w-6 h-6', isFavorite && 'fill-red-500')}
      />
    </Card.CardButton>
  );
}
