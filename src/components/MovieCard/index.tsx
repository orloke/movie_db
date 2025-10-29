import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  children: ReactNode;
}

export const MovieCard = ({ children }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card.CardRoot role="button" onClick={() => handleClick('1')}>
      <Image
        src="https://picsum.photos/id/10/400/300"
        errorText="Imagem não carregada"
      />
      {children}
      <Card.CardDescription>
        <Card.CardTitle>Title</Card.CardTitle>
        <Card.CardBadge>8.5</Card.CardBadge>
      </Card.CardDescription>
    </Card.CardRoot>
  );
};
