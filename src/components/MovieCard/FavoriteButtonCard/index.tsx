import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';
import type { RootState } from '@/stores';
import { toggleFavorite } from '@/stores/slices/favoriteMovie';
import type { TmdbMovie } from '@/types/popularMovies';
import { Heart } from 'lucide-react';
import { memo, type ComponentProps, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface FavoriteButtonCardProps extends ComponentProps<'button'> {
  movie: TmdbMovie;
}

export const FavoriteButtonCard = memo(
  ({ movie, ...props }: FavoriteButtonCardProps) => {
    const dispatch = useDispatch();

    const isFavorite = useSelector((state: RootState) =>
      state.favorites.movies.some((item) => item.id === movie.id),
    );

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(toggleFavorite(movie));

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
  },
);
