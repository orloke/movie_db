import { MovieCard } from '@/components/MovieCard';
import { FavoriteButtonCard } from '@/components/MovieCard/FavoriteButtonCard';
import { MovieCardSkeleton } from '@/components/MovieCardSkeleton';
import { popularMovies } from '@/services/tmdbApi/popular';
import { useQuery } from '@tanstack/react-query';

export const Home = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: popularMovies,
  });

  return (
    <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-10 md:px-8 px-4 pb-1">
      {response?.data?.results.map((movie) => (
        <MovieCard
          key={movie.id}
          imageUrl={movie.poster_path}
          title={movie.title}
          vote_average={movie.vote_average}
          id={movie.id}
        >
          <FavoriteButtonCard movie={movie} />
        </MovieCard>
      ))}
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => <MovieCardSkeleton key={i} />)}
    </div>
  );
};
