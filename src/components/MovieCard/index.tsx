import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import { createUrlImage } from '@/lib/utils';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  children: ReactNode;
  imageUrl: string | null;
  title: string;
  vote_average: number;
  id: number;
}

export const MovieCard = ({
  children,
  imageUrl,
  title,
  vote_average,
  id,
}: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string | number) => {
    navigate(`/movie/${id}`);
  };

  const img = createUrlImage('/w300' + imageUrl);
  const average = vote_average?.toFixed(1);

  return (
    <Card.CardRoot role="button" onClick={() => handleClick(id)}>
      <Image src={img} errorText="Imagem não carregada" />
      {children}
      <Card.CardDescription>
        <Card.CardTitle title={title}>{title}</Card.CardTitle>
        {average && <Card.CardBadge>{average}</Card.CardBadge>}
      </Card.CardDescription>
    </Card.CardRoot>
  );
};
