export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const query = getQuery(event).query

  let url

  // Verifica type ul query-ului si daca are cel putin 3 caractere seteaza url-ul la endpoint ul cu query inclus
  if (typeof query === 'string' && query.length >= 3) {
    url = `${config.public.NUXT_PUBLIC_BASE_URL}search/movie?api_key=${config.API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
  }
  // altfel url-ul ramane pagina principala 
  else {
    url = `${config.public.NUXT_PUBLIC_BASE_URL}movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`
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