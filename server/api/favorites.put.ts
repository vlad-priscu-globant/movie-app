import { getAuthenticatedUser } from '~/server/utils/getUser'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<any>(event)
  const body = await readBody(event)
  const { movie_id, status, rating } = body || {}

  if (!movie_id) {
    throw createError({ statusCode: 400, message: 'Missing movie_id' })
  }

  const updateData: { status?: string, rating?: number } = {}
  if (status)
    updateData.status = status
  // Allow rating to be 0
  if (rating !== undefined)
    updateData.rating = rating

  if (Object.keys(updateData).length === 0)
    return { success: true, message: 'No fields to update' }

  const { error } = await client
    .from('favorites')
    .update(updateData)
    .eq('user_id', user.id)
    .eq('movie_id', movie_id)

  if (error) {
    console.error('[PUT favorites] Update failed:', error)
    throw createError({ statusCode: 500, message: 'Failed to update favorite' })
  }

  return { success: true }
})