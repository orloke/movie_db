import { InfiniteScrollTrigger } from '@/components/InfiniteScrollTrigger';
import { MovieCard } from '@/components/MovieCard';
import { FavoriteButtonCard } from '@/components/MovieCard/FavoriteButtonCard';
import { MovieCardSkeleton } from '@/components/MovieCardSkeleton';
import { popularMovies } from '@/services/tmdbApi/popular';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

export const Home = () => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['popularMovies'],
      queryFn: ({ pageParam = 1 }) => popularMovies(pageParam),
      getNextPageParam: (lastPage) => {
        const { data } = lastPage;
        if (!data || !data.page || !data.total_pages) return undefined;
        if (data.page < data.total_pages) {
          return data.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  const movies = data?.pages.flatMap((page) => page.data?.results);

  if (!movies || !movies.length) return null;

  return (
    <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-10 md:px-8 px-4 pb-1">
      <InfiniteScrollTrigger
        onLoadMore={() => !isFetchingNextPage && fetchNextPage()}
        enabled={!isFetchingNextPage}
      >
        {movies?.map((movie) => {
          if (!movie) return null;
          return (
            <MovieCard
              key={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
              id={movie.id}
            >
              <FavoriteButtonCard movie={movie} />
            </MovieCard>
          );
        })}
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}

        {isFetchingNextPage && (
          <Loader className="h-8 w-8 text-primary animate-spin mx-auto md:col-span-2 lg:col-span-4 2xl:col-span-5" />
        )}
      </InfiniteScrollTrigger>
    </div>
  );
};
