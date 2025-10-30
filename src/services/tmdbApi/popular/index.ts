import { tmdbApi } from '@/services/tmdbApi';
import type { ApiResponse } from '@/types/baseResponseApi';
import type { PopularMoviesResponse } from '@/types/popularMovies';

export const popularMovies = async (): Promise<
  ApiResponse<PopularMoviesResponse>
> => {
  try {
    const url = `/movie/popular?language=pt-BR`;
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
