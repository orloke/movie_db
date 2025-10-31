import { EmptyStateFavorite } from '@/components/EmptyStateFavorite';
import { InfiniteScrollTrigger } from '@/components/InfiniteScrollTrigger';
import { MovieCard } from '@/components/MovieCard';
import { FavoriteButtonCard } from '@/components/MovieCard/FavoriteButtonCard';
import { MovieCardSkeleton } from '@/components/MovieCardSkeleton';
import { searchMovie } from '@/services/tmdbApi/searchMovie';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('term') || '';

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['searchMovies', query],
      queryFn: ({ pageParam = 1 }) => searchMovie(query, pageParam),
      enabled: query.length > 0,
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

  const totalResults = data?.pages[0]?.data?.total_results;

  const movies = data?.pages.flatMap((page) => page.data?.results);

  if ((!movies || !movies.length) && !isLoading)
    return (
      <EmptyStateFavorite
        title="Nenhum filme encontrado"
        label="Tente outra pesquisa ou retorne para a página inicial"
        labelButton="Home"
        href="/"
      />
    );
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-10  pb-1">
      <InfiniteScrollTrigger
        onLoadMore={() => !isFetchingNextPage && fetchNextPage()}
        enabled={!isFetchingNextPage}
      >
        <div className="md:col-span-2 lg:col-span-4 2xl:col-span-5 pb-8 border-b border-b-gray-600">
          <div className="md:px-8 px-4 space-y-2">
            <h1 className="title-page">
              Resultados para:{' '}
              <span className="text-content-primary">"{query}"</span>{' '}
            </h1>
            <p className="text-gray-300">Encontrados {totalResults} filmes</p>
          </div>
        </div>

        {movies?.map((movie) => {
          if (!movie) return null;
          return (
            <MovieCard
              key={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              isHighlight={{ term: query }}
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
