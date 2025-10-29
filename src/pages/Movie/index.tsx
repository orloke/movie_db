import { Image } from '@/components/Image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function Movie() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="h-full grid grid-cols-12 md:gap-10 gap-y-10 md:px-8 px-4">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${id}.jpg`}
        errorText="Imagem não carregada"
        className="col-span-12 md:col-span-6 rounded-2xl md:h-full h-80"
      />
      <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
        <h1 className="title-page">Nome do filme</h1>
        <div className="flex gap-4">
          <Badge>Ação</Badge>
          <Badge>Aventura</Badge>
          <Badge>Ficção</Badge>
        </div>
        <div className="space-y-2">
          <p className="text-gray-400">
            <b>Data de lançamento:</b> 2022-01-01
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <b>Nota TMDB:</b>{' '}
            <Badge className="bg-content-primary text-black text-sm">8.5</Badge>
          </div>
        </div>

        <div className="mt-4 text-gray-200">
          <h2 className="font-bold text-2xl">Sinopse</h2>
          <p className="text-justify mt-2 leading-loose">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
            est id soluta aspernatur quaerat ducimus enim sequi neque ipsum
            exercitationem omnis natus, debitis culpa quae sit numquam inventore
            qui rem quibusdam, eveniet pariatur officiis ratione tempore eaque.
            Tempore harum exercitationem labore nulla officiis quasi quas
            facilis consectetur maiores explicabo assumenda illum minus ducimus
            repudiandae, ex veritatis praesentium quos cumque reprehenderit
            corporis omnis aliquam. Rerum voluptatum incidunt necessitatibus
            distinctio sit autem atque ex vel libero illo similique nam
            explicabo, pariatur quod dolores facilis iusto alias eaque quibusdam
            dicta eveniet minus nemo nisi. Animi blanditiis suscipit similique
            recusandae consectetur consequatur? Facere, iusto.
          </p>
        </div>

        <Button className="py-3 h-auto w-fit mt-4 group bg-red-500 hover:bg-red-400">
          <Heart className="group-hover:fill-white" />
          <span>Adicionar aos favoritos</span>
        </Button>
      </div>
    </div>
  );
}
