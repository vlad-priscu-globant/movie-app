export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const page = Number(getQuery(event).page) || 1
  const sort = getQuery(event).sort || ''
  const genreId = getQuery(event).genreId || ''

  let sortBy = ''
  if (sort === 'desc') {
    sortBy = 'vote_average.desc'
  } else if (sort === 'asc') {
    sortBy = 'vote_average.asc'
  }

  const baseUrl = 'https://api.themoviedb.org/3'
  let url = ''
  if (sortBy) {
    url = `${baseUrl}/discover/movie?api_key=${config.API_KEY}&language=en-US&page=${page}&sort_by=${sortBy}`
    if (genreId) {
      url += `&with_genres=${genreId}`
    }
  } else {
    url = `${baseUrl}/movie/popular?api_key=${config.API_KEY}&language=en-US&page=${page}`
    if (genreId) {
      url = `${baseUrl}/discover/movie?api_key=${config.API_KEY}&language=en-US&page=${page}&with_genres=${genreId}`
    }
  }

  try {
    const movies = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`, Accept: 'application/json', 'Content-Type': 'application/json',
      }
    })
    return movies
  } catch (err: any) {
    console.error('TMDB Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500, message: err?.data?.status_message || 'Failed to fetch movie data',
    })
  }
})
