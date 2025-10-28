import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="grid grid-cols-6 gap-10">
      <Link to="/movie/123">
        <Card.CardRoot>
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
      </Link>
    </div>
  );
};
