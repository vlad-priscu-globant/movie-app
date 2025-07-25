
import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'


import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const genreId = Number(query.genreId)

  if (!genreId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing genreId in query' })
  }
const config = useRuntimeConfig()
const apiKey = config.API_KEY

  const randomPage = Math.floor(Math.random() * 10) + 1

  try {
    const response = await $fetch<any>('https://api.themoviedb.org/3/discover/movie', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      query: {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page: randomPage
      }
    })

    if (!response || !response.results) {
      throw createError({ statusCode: 502, statusMessage: 'Invalid TMDB response' })
    }

    if (response.results.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'No movies found for this genre' })
    }

    const randomMovie = response.results[Math.floor(Math.random() * response.results.length)]

    return {
      id: randomMovie.id,
      title: randomMovie.title,
      overview: randomMovie.overview,
      poster: randomMovie.poster_path
        ? config.public.TMDB_IMAGE_BASE + randomMovie.poster_path
        : null
    }
  } catch (err: any) {
    console.error('❌ [ERROR] TMDB fetch failed:', err)

    if (err.response?.status === 401) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Check your TMDB API key' })
    }

    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch movie from TMDB' })
  }
})
