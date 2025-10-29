import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-10 md:px-8 px-4">
      <Card.CardRoot role="button" onClick={() => handleClick('1')}>
        <Image
          src="https://picsum.photos/id/10/400/300"
          errorText="Imagem não carregada"
        />
        <Card.CardButton className="absolute top-2 right-2 group">
          <Heart className="text-red-500 group-hover:fill-red-500" />
        </Card.CardButton>
        <Card.CardDescription>
          <Card.CardTitle>Title</Card.CardTitle>
          <Card.CardBadge>8.5</Card.CardBadge>
        </Card.CardDescription>
      </Card.CardRoot>
    </div>
  );
};
