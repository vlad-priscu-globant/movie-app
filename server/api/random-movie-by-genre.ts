// server/api/random-movie-by-genre.ts
import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

// Removed duplicate default export and fixed 'data' type errors by using only one handler below.

// /server/api/random-movie-by-genre.ts





// import { defineEventHandler, getQuery } from 'h3'

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = query.genreId

//   if (!genreId) {
//     throw createError({ statusCode: 400, message: 'Genre ID is required' })
//   }

//   const API_KEY = process.env.API_KEY // ✅ this must match your .env key name
//   const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`

//   const response = await fetch(url)
//   const data = await response.json()

//   if (!data.results || data.results.length === 0) {
//     throw createError({ statusCode: 404, message: 'No movies found for this genre' })
//   }

//   const randomIndex = Math.floor(Math.random() * data.results.length)
//   const movie = data.results[randomIndex]

//   return {
//     id: movie.id,
//     title: movie.title,
//     release_date: movie.release_date,
//     overview: movie.overview,
//     poster_path: movie.poster_path,
//   }
// })


// server/api/random-movie-by-genre.ts
// import { defineEventHandler, getQuery } from 'h3'

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = query.genreId as string

//   const API_KEY = process.env.API_KEY

//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
//   )
//   const json = await res.json()

//   const movies = json.results

//   if (!movies || movies.length === 0) {
//     return null
//   }

//   const randomIndex = Math.floor(Math.random() * movies.length)
//   const movie = movies[randomIndex]

//   return {
//     title: movie.title,
//   }
// })






// Removed duplicate import of defineEventHandler and getQuery

// const TMDB_API = 'https://api.themoviedb.org/3'
// const API_KEY = process.env.TMDB_API_KEY

// export default defineEventHandler(async (event) => {
//   const { genreId } = getQuery(event)

//   if (!genreId) {
//     throw createError({ statusCode: 400, message: 'Missing genreId' })
//   }
//   if (!API_KEY) {
//     throw createError({ statusCode: 500, message: 'TMDB API key missing' })
//   }
//   const baseUrl = `${TMDB_API}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`

//   // Step 1: Get total pages
//   const firstResponse = await fetch(`${baseUrl}&page=1`)
//   const firstData = await firstResponse.json()

//   const totalPages = Math.min(firstData.total_pages || 1, 500) // TMDb max page = 500

//   if (totalPages === 0) {
//     throw createError({ statusCode: 404, message: 'No movies found for this genre.' })
//   }

//   // Step 2: Pick random page from total
//   const randomPage = Math.floor(Math.random() * totalPages) + 1
//   const url = `${baseUrl}&page=${randomPage}`

//   const response = await fetch(url)
//   const data = await response.json()

//   const results = data.results || []

//   if (!results.length) {
//     throw createError({ statusCode: 404, message: 'No movies found on selected page.' })
//   }

//   const randomMovie = results[Math.floor(Math.random() * results.length)]

//   return {
//     id: randomMovie.id,
//     title: randomMovie.title,
//     overview: randomMovie.overview,
//     poster_path: randomMovie.poster_path,
//     release_date: randomMovie.release_date,
//   }
// }
// )







// // server/api/random-movie-by-genre.ts
// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = Number(query.genreId)

//   if (!genreId) {
//     throw createError({ statusCode: 400, statusMessage: 'Missing genreId' })
//   }

//   // ✅ Hardcoded movies for now (you can replace with Supabase or TMDB later)
//   const movies = [
//     { id: 1, title: 'A Quiet Place', genre: 27 },
//     { id: 2, title: 'John Wick', genre: 28 },
//     { id: 3, title: 'Superbad', genre: 35 },
//     { id: 4, title: 'The Notebook', genre: 10749 },
//     { id: 5, title: 'Blade Runner 2049', genre: 878 },
//     { id: 6, title: 'Toy Story', genre: 16 },
//     { id: 7, title: 'Fight Club', genre: 18 }
//   ]

//   // ✅ Filter movies by genre
//   const filteredMovies = movies.filter((m) => m.genre === genreId)
//   if (filteredMovies.length === 0) {
//     throw createError({ statusCode: 404, statusMessage: 'No movies found' })
//   }

//   // ✅ Pick a random one
//   const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)]

//   return randomMovie
// })



// // server/api/random-movie-by-genre.ts
// import { $fetch } from 'ofetch'
// console.log('API KEY:', process.env.API_KEY)


// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = Number(query.genreId)

//   if (!genreId) {
//     throw createError({ statusCode: 400, statusMessage: 'Missing genreId' })
//   }

//   const apiKey = process.env.API_KEY
//   if (!apiKey) {
//     throw createError({ statusCode: 500, statusMessage: 'TMDB API key missing' })
//   }

//   // ✅ Fetch popular movies for the given genre from TMDB
//   const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${Math.floor(Math.random() * 10) + 1}`

//   const response = await $fetch<any>(tmdbUrl)

//   if (!response.results || response.results.length === 0) {
//     throw createError({ statusCode: 404, statusMessage: 'No movies found' })
//   }

//   // ✅ Pick a random movie from the results
//   const randomMovie = response.results[Math.floor(Math.random() * response.results.length)]

//   return {
//     id: randomMovie.id,
//     title: randomMovie.title,
//     overview: randomMovie.overview,
//     poster: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
//   }
// })


// // server/api/random-movie-by-genre.ts
// import { $fetch } from 'ofetch'



// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = Number(query.genreId)

//   if (!genreId) {
//     throw createError({ statusCode: 400, statusMessage: 'Missing genreId' })
//   }

//   // ✅ Get runtime config
//   const config = useRuntimeConfig()
//   const apiKey = config.API_KEY

//   console.log('TMDB Key Used:', apiKey)


//   if (!apiKey) {
//     throw createError({ statusCode: 500, statusMessage: 'TMDB API key missing' })
//   }

//   // ✅ Pick a random page from 1 to 10
//   const randomPage = Math.floor(Math.random() * 10) + 1

//   // ✅ Build TMDB API URL
//   const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${randomPage}`

//   // ✅ Fetch movies from TMDB
//   const response = await $fetch<any>(tmdbUrl)

//   if (!response.results || response.results.length === 0) {
//     throw createError({ statusCode: 404, statusMessage: 'No movies found' })
//   }

//   // ✅ Select a random movie from the response
//   const randomMovie = response.results[Math.floor(Math.random() * response.results.length)]

//   return {
//     id: randomMovie.id,
//     title: randomMovie.title,
//     overview: randomMovie.overview,
//     poster: config.public.tmdbImageBase + randomMovie.poster_path
//   }
// })




// import { $fetch } from 'ofetch'

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = Number(query.genreId)

//   if (!genreId) {
//     throw createError({ statusCode: 400, statusMessage: 'Missing genreId in query' })
//   }

//   // ✅ Read API key from runtimeConfig
//   const config = useRuntimeConfig()
//   const apiKey = config.API_KEY

//   // ✅ Debug log API key
//   console.log('🔍 [DEBUG] TMDB API Key from runtimeConfig:', apiKey ? '[OK]' : '[MISSING]')

//   if (!apiKey) {
//     throw createError({ statusCode: 500, statusMessage: 'TMDB API key missing. Check .env setup.' })
//   }

//   // ✅ Prepare TMDB URL
//   const randomPage = Math.floor(Math.random() * 10) + 1
//   const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${randomPage}`

//   console.log('🔍 [DEBUG] Fetching from TMDB:', tmdbUrl)

//   try {
//     const response = await $fetch<any>(tmdbUrl)

//     // ✅ Check response structure
//     if (!response || !response.results) {
//       console.error('❌ [ERROR] Unexpected TMDB response:', response)
//       throw createError({ statusCode: 502, statusMessage: 'Invalid TMDB response' })
//     }

//     if (response.results.length === 0) {
//       throw createError({ statusCode: 404, statusMessage: 'No movies found for this genre' })
//     }

//     // ✅ Pick random movie
//     const randomMovie = response.results[Math.floor(Math.random() * response.results.length)]

//     return {
//       id: randomMovie.id,
//       title: randomMovie.title,
//       overview: randomMovie.overview,
//       poster: config.public.tmdbImageBase + randomMovie.poster_path
//     }
//   } catch (err: any) {
//     // ✅ Catch TMDB errors (401, 404, etc.)
//     console.error('❌ [ERROR] TMDB fetch failed:', err)

//     if (err.response?.status === 401) {
//       throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Check your TMDB API key' })
//     }

//     if (err.response?.status === 404) {
//       throw createError({ statusCode: 404, statusMessage: 'Genre not found on TMDB' })
//     }

//     throw createError({ statusCode: 500, statusMessage: 'Failed to fetch movie from TMDB' })
//   }
// })



// import { $fetch } from 'ofetch'

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const genreId = Number(query.genreId)

//   if (!genreId) {
//     throw createError({ statusCode: 400, statusMessage: 'Missing genreId in query' })
//   }

//   const config = useRuntimeConfig()
//   const apiKey = config.tmdbApiKey

//   console.log('🔍 [DEBUG] TMDB API Key from runtimeConfig:', apiKey ? '[OK]' : '[MISSING]')

//   if (!apiKey) {
//     throw createError({ statusCode: 500, statusMessage: 'TMDB API key missing. Check .env setup.' })
//   }

//   const randomPage = Math.floor(Math.random() * 10) + 1

//   try {
//     // ✅ Use Bearer Authorization header for v4 token
//     const response = await $fetch<any>('https://api.themoviedb.org/3/discover/movie', {
//       headers: {
//         Authorization: `Bearer ${apiKey}`
//       },
//       query: {
//         with_genres: genreId,
//         sort_by: 'popularity.desc',
//         page: randomPage
//       }
//     })

//     if (!response || !response.results) {
//       console.error('❌ [ERROR] Unexpected TMDB response:', response)
//       throw createError({ statusCode: 502, statusMessage: 'Invalid TMDB response' })
//     }

//     if (response.results.length === 0) {
//       throw createError({ statusCode: 404, statusMessage: 'No movies found for this genre' })
//     }

//     const randomMovie = response.results[Math.floor(Math.random() * response.results.length)]

//     return {
//       id: randomMovie.id,
//       title: randomMovie.title,
//       overview: randomMovie.overview,
//       poster: config.public.tmdbImageBase + randomMovie.poster_path
//     }
//   } catch (err: any) {
//     console.error('❌ [ERROR] TMDB fetch failed:', err)

//     if (err.response?.status === 401) {
//       throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Check your TMDB API key (Bearer token)' })
//     }

//     throw createError({ statusCode: 500, statusMessage: 'Failed to fetch movie from TMDB' })
//   }
// })



import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const genreId = Number(query.genreId)

  if (!genreId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing genreId in query' })
  }

  const config = useRuntimeConfig()
  const apiKey = config.API_KEY

  console.log('🔍 [DEBUG] TMDB API Key:', apiKey ? '[OK]' : '[MISSING]')

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'TMDB API key missing. Check .env setup.' })
  }

  const randomPage = Math.floor(Math.random() * 10) + 1

  try {
    const response = await $fetch<any>('https://api.themoviedb.org/3/discover/movie', {
      headers: {
        Authorization: `Bearer ${apiKey}` // ✅ Bearer auth for v4 token
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
        ? config.public.tmdbImageBase + randomMovie.poster_path
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
