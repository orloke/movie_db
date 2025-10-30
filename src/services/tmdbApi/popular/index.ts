import { tmdbApi } from '@/services/tmdbApi';
import type { ApiResponse } from '@/types/baseResponseApi';
import type { PopularMoviesResponse } from '@/types/popularMovies';

export const popularMovies = async (page: number): Promise<
  ApiResponse<PopularMoviesResponse>
> => {
  console.log("🚀 ~ popularMovies ~ page:", page)
  try {
    const url = `/movie/popular?language=pt-BR&page=${page}`;
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
