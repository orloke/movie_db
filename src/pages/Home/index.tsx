import { MovieCard } from '@/components/MovieCard';
import { FavoriteButtonCard } from '@/components/MovieCard/FavoriteButtonCard';

export const Home = () => {
  return (
    <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-10 md:px-8 px-4">
      <MovieCard>
        <FavoriteButtonCard idMovie={1} />
      </MovieCard>
    </div>
  );
};
