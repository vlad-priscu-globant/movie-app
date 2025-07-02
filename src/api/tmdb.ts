const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchPopularMovies(page: number) {
  const res = await fetch(`${baseUrl}/movie/popular?page=${page}`, {
    headers: {
      Authorization: 'Bearer ' + apiKey, accept: 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Failed to fetch popular movies: ${res.status}`)
  return res.json()
}

export async function fetchMovieById(movie_id: number) {
  const res = await fetch(`${baseUrl}/movie/${movie_id}`, {
    headers: {
      Authorization: 'Bearer ' + apiKey, accept: 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Failed to fetch popular movies: ${res.status}`)
  return res.json()
}