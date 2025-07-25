// // composables/useMovies.ts
// import { supabase } from '../utils/getRandomMovie'

// export const useMovies = () => {
//   const getRandomMovie = async (genre?: string) => {
//     // Get total count (with optional genre filter)
//     let query = supabase.from('movies').select('*', { count: 'exact', head: true })
//     if (genre && genre !== 'All') {
//       query = supabase.from('movies').select('*', { count: 'exact', head: true }).eq('genre', genre)
//     }

//     const { count, error: countError } = await query
//     if (countError || !count) throw new Error(countError?.message || 'Could not fetch count')

//     const randomIndex = Math.floor(Math.random() * count)

//     // Fetch one random movie
//     let fetchQuery = supabase.from('movies').select('*').range(randomIndex, randomIndex)
//     if (genre && genre !== 'All') fetchQuery = fetchQuery.eq('genre', genre)

//     const { data, error } = await fetchQuery.single()
//     if (error || !data) throw new Error(error?.message || 'Could not fetch movie')

//     return data
//   }

//   return { getRandomMovie }
// }
