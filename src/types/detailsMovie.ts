export interface TmdbGenre {
  id: number
  name: string
}

export interface TmdbProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface TmdbProductionCountry {
  iso_3166_1: string
  name: string
}

export interface TmdbSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface TmdbMovieDetailResponse {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: unknown | null
  budget: number
  genres: TmdbGenre[]
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: TmdbProductionCompany[]
  production_countries: TmdbProductionCountry[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: TmdbSpokenLanguage[]
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
