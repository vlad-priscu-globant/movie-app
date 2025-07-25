import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let query = getQuery(event).query
  const page = Number(getQuery(event).page) || 1

  if (Array.isArray(query)) {
    query = query[0]
  }

  if (!query || typeof query !== 'string') {
    throw createError({ statusCode: 400, message: 'Query parameter is required' })
  }

  const baseUrl = 'https://api.themoviedb.org/3'
  const url = `${baseUrl}/search/movie?api_key=${config.API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`

  try {
    const results = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return results
  } catch (err: any) {
    console.error('TMDB Search Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500,
      message: err?.data?.status_message || 'Failed to fetch search results',
    })
  }
})
