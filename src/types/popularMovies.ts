export interface PopularMoviesResponse {
  page: number;
  results: TmdbMovie[];
  total_pages?: number;
  total_results?: number;
}

export interface TmdbMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type FavoriteMovie = Pick<
  TmdbMovie,
  'id' | 'title' | 'vote_average' | 'poster_path' | 'release_date'
>;
