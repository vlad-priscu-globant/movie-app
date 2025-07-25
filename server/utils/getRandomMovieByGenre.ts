// utils/getRandomMovieByGenre.ts

export interface TMDbMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  genre_ids?: number[]
  vote_average?: number
}

interface TMDbResponse {
  page: number
  results: TMDbMovie[]
  total_pages: number
  total_results: number
}

const TMDB_API = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.API_KEY

export async function getRandomMovieByGenre(genreId: number): Promise<TMDbMovie | null> {
  const maxPages = 50
  const randomPage = Math.floor(Math.random() * maxPages) + 1

  const url = `${TMDB_API}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${randomPage}`

  try {
    const res: Response = await fetch(url)

    if (!res.ok) {
      console.warn(`TMDb error: ${res.status}`)
      return null
    }

    const data: TMDbResponse = await res.json()

    if (!data.results || data.results.length === 0) return null

    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)]
    return randomMovie
  } catch (error) {
    console.error('Failed to fetch random movie:', error)
    return null
  }
  
}
