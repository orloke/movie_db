import { AddToFavorite } from '@/components/AddToFavorite';
import { Image } from '@/components/Image';
import { MovieDetailSkeleton } from '@/components/MovieDetailSkeleton';
import { Badge } from '@/components/ui/badge';
import { createUrlImage, formattedDate } from '@/lib/utils';
import { detailsMovie } from '@/services/tmdbApi/detailsMovie';
import { useQuery } from '@tanstack/react-query';
import { redirect, useParams } from 'react-router-dom';

export function Movie() {
  const { id } = useParams<{ id: string }>();

  const { data: response, isLoading } = useQuery({
    queryKey: ['detailMovie', id],
    queryFn: () => detailsMovie(Number(id)),
    enabled: !!id,
  });

  const img = createUrlImage('/original' + response?.data?.poster_path);
  const average = response?.data?.vote_average?.toFixed(1);
  const releaseDate = formattedDate(response?.data?.release_date);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (!response?.data) {
    redirect('/');
    return null;
  }

  return (
    <div className="h-full grid grid-cols-12 md:gap-10 gap-y-10 md:px-8 px-4">
      <Image
        src={img}
        alt={response?.data?.title}
        errorText="Imagem não carregada"
        className="col-span-12 md:col-span-6 rounded-2xl md:h-full h-80"
      />
      <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
        <h1 className="title-page">Nome do filme</h1>
        <div className="flex gap-4">
          {response?.data?.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-gray-400">
            <b>Data de lançamento:</b> {releaseDate}
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <b>Nota TMDB:</b>{' '}
            <Badge className="bg-content-primary text-black text-sm">
              {average}
            </Badge>
          </div>
        </div>

        <div className="mt-4 text-gray-200">
          <h2 className="font-bold text-2xl">Sinopse</h2>
          <p className="text-justify mt-2 leading-loose">
            {response?.data?.overview}
          </p>
        </div>
        <AddToFavorite
          movie={{
            id: response?.data?.id,
            title: response?.data?.title,
            vote_average: response?.data?.vote_average,
            poster_path: response?.data?.poster_path,
            release_date: response?.data?.release_date,
          }}
        />
      </div>
    </div>
  );
}
