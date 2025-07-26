export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const baseUrl = 'https://api.themoviedb.org/3'
  const url = `${baseUrl}/movie/${id}?append_to_response=videos`
  try {
    const movie = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`, Accept: 'application/json',
      }
    })
    return movie
  } catch (err: any) {
    console.error('TMDB Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500, message: err?.data?.status_message || 'Failed to fetch movie data',
    })
  }
})