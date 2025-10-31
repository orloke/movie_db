import { EmptyStateFavorite } from '@/components/EmptyStateFavorite';
import { MovieCard } from '@/components/MovieCard';
import { RemoveButtonCard } from '@/components/MovieCard/RemoveButtonCard';
import { SelectOrder, type Order } from '@/components/SelectOrder';
import { sortedMovies } from '@/lib/utils';
import type { RootState } from '@/stores';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const [order, setOrder] = useState<Order>('title-asc');

  const sortedFavorites = useMemo(() => {
    return sortedMovies(favorites, order);
  }, [favorites, order]);

  if (favorites.length === 0) {
    return (
      <EmptyStateFavorite
        title="Nenhum filme favorito ainda"
        label="Comece explorando filmes populares e adicione seus favoritos!"
        labelButton="Explorar Filmes"
        href="/favorites"
      />
    );
  }

  return (
    <>
      <div className="space-y-8 pb-8 border-b border-b-gray-600 md:px-8 px-4">
        <h1 className="title-page capitalize">Meus Filmes Favoritos</h1>
        <div className="flex items-center gap-4 text-gray-300">
          <span>Ordenar por: </span>
          <SelectOrder setOrder={setOrder} />
        </div>
      </div>
      <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-10 md:px-8 px-4">
        {sortedFavorites.map((movie) => (
          <MovieCard
            key={movie.id}
            imageUrl={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            id={movie.id}
          >
            <RemoveButtonCard idMovie={movie.id} />
          </MovieCard>
        ))}
      </div>
    </>
  );
};
