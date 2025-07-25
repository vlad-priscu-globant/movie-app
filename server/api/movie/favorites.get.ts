import { serverSupabaseClient } from '#supabase/server'
import { getAuthenticatedUser } from "../../utils/getUser";

interface FavoriteMovie {
  movie_data: {
    vote_average?: number
    release_date?: string
    popularity?: number
    [key: string]: any
  }
  [key: string]: any
}

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient(event)

  // Get sort query parameter
  const sort = getQuery(event).sort || 'desc'

  let orderColumn = 'vote_average'
  let orderDirection: 'asc' | 'desc' = 'desc'

  switch (sort) {
    case 'asc':
      orderDirection = 'asc'
      orderColumn = 'vote_average'
      break
    case 'desc':
      orderDirection = 'desc'
      orderColumn = 'vote_average'
      break
    case 'recent':
      orderDirection = 'desc'
      orderColumn = 'release_date'
      break
    case 'old':
      orderDirection = 'asc'
      orderColumn = 'release_date'
      break
    case 'popular':
      orderDirection = 'desc'
      orderColumn = 'popularity'
      break
    default:
      orderDirection = 'desc'
      orderColumn = 'vote_average'
  }

  // Fetch favorites with movie_data
  const { data, error } = await client
    .from('favorites')
    .select('*, movie_data')
    .eq('user_id', user.id)

  if (error) {
    console.error('[GET favorites] Supabase error:', error)
    throw createError({ statusCode: 500, message: 'Failed to fetch favorites' })
  }

  // Type assertion for data
  const favorites = data as FavoriteMovie[] || []

  // Sort data client-side based on movie_data fields
  const sortedData = favorites.sort((a, b) => {
    const aVal = a.movie_data ? a.movie_data[orderColumn] : null
    const bVal = b.movie_data ? b.movie_data[orderColumn] : null

    if (aVal === null) return 1
    if (bVal === null) return -1

    if (orderDirection === 'asc') {
      if (aVal < bVal) return -1
      if (aVal > bVal) return 1
      return 0
    } else {
      if (aVal > bVal) return -1
      if (aVal < bVal) return 1
      return 0
    }
  })

  return sortedData
})
