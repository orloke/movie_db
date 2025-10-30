import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  children: ReactNode;
  imageUrl: string | null;
  title: string;
  vote_average: number;
}

const baseUrlImage = import.meta.env.VITE_API_IMAGE_URL;

export const MovieCard = ({
  children,
  imageUrl,
  title,
  vote_average,
}: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const img = `${baseUrlImage}/w300${imageUrl}`;
  const average = vote_average?.toFixed(1);

  return (
    <Card.CardRoot role="button" onClick={() => handleClick('1')}>
      <Image src={img} errorText="Imagem não carregada" />
      {children}
      <Card.CardDescription>
        <Card.CardTitle title={title}>{title}</Card.CardTitle>
        {average && <Card.CardBadge>{average}</Card.CardBadge>}
      </Card.CardDescription>
    </Card.CardRoot>
  );
};
