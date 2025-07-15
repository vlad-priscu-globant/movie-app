export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Get page number from query or default to 1
  const page = Number(getQuery(event).page) || 1

  // Get sort parameter from query, default to empty string
  const sort = getQuery(event).sort || ''

  // Map sort parameter to TMDB discover/movie sort_by values
  let sortBy = ''
  if (sort === 'desc') {
    sortBy = 'vote_average.desc'
  } else if (sort === 'asc') {
    sortBy = 'vote_average.asc'
  }

  // Use discover/movie endpoint with sort_by if provided, else fallback to popular
  const baseUrl = 'https://api.themoviedb.org/3'
  const url = sortBy
    ? `${baseUrl}/discover/movie?api_key=${config.API_KEY}&language=en-US&page=${page}&sort_by=${sortBy}`
    : `${baseUrl}/movie/popular?api_key=${config.API_KEY}&language=en-US&page=${page}`

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
