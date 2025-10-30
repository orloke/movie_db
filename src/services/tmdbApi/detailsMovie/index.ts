import { tmdbApi } from '@/services/tmdbApi';
import type { ApiResponse } from '@/types/baseResponseApi';
import type { TmdbMovieDetailResponse } from '@/types/detailsMovie';

export const detailsMovie = async (
  id: number,
): Promise<ApiResponse<TmdbMovieDetailResponse>> => {
  try {
    const url = `/movie/${id}?language=pt-BR`;
    const response = await tmdbApi<TmdbMovieDetailResponse>({
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
