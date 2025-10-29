import { MovieCard } from '@/components/MovieCard';
import { RemoveButtonCard } from '@/components/MovieCard/RemoveButtonCard';
import { SelectOrder } from '@/components/SelectOrder';

export const Favorites = () => {
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
        <MovieCard>
          <RemoveButtonCard idMovie={1} />
        </MovieCard>
      </div>
    </div>
  );
};
