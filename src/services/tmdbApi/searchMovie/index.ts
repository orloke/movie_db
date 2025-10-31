import { tmdbApi } from '@/services/tmdbApi';
import type { ApiResponse } from '@/types/baseResponseApi';
import type { PopularMoviesResponse } from '@/types/popularMovies';

export const searchMovie = async (
  query: string,
  page: number,
): Promise<ApiResponse<PopularMoviesResponse>> => {
  try {
    const url = `/search/movie?language=pt-BR&query=${query}&page=${page}`;
    const response = await tmdbApi<PopularMoviesResponse>({
      url,
      method: 'GET',
    });
    return {
      success: true,
      message: 'Sucesso',
      data: response,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
      data: null,
    };
  }
};
