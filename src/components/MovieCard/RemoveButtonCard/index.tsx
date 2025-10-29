import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';
import { removeFavorite } from '@/stores/slices/favoriteMovie';
import { Trash2 } from 'lucide-react';
import type { ComponentProps, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

interface RemoveButtonCardProps extends ComponentProps<'button'> {
  idMovie: number;
}

export function RemoveButtonCard({ idMovie, ...props }: RemoveButtonCardProps) {
  const dispatch = useDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeFavorite(idMovie));

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
      <Trash2 className="group-hover:fill-gray-400/50 text-gray-400" />
    </Card.CardButton>
  );
}
