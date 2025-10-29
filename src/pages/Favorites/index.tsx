import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import { SelectOrder } from '@/components/SelectOrder';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="">
      <div className="space-y-8 pb-8 border-b border-b-gray-600 md:px-8 px-4">
        <h1 className="title-page capitalize">Meus Filmes Favoritos</h1>
        <div className="flex items-center gap-4 text-gray-300">
          <span>Ordenar por: </span>
          <SelectOrder />
        </div>
      </div>
      <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-10 md:px-8 px-4">
        <Card.CardRoot role="button" onClick={() => handleClick('1')}>
          <Image
            src="https://picsum.photos/id/10/400/300"
            errorText="Imagem não carregada"
          />
          <Card.CardButton className="absolute top-2 right-2 group">
            <Trash2 className="group-hover:fill-gray-400/50 text-gray-400" />
          </Card.CardButton>
          <Card.CardDescription>
            <Card.CardTitle>Title</Card.CardTitle>
            <Card.CardBadge>8.5</Card.CardBadge>
          </Card.CardDescription>
        </Card.CardRoot>
      </div>
    </div>
  );
};
