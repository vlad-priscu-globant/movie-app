export default defineEventHandler(async (event) => {
    const apiKey= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzg3Y2Y2NDYwODVkZTE5MjQxMTJkZmExZDBhNjg3YiIsIm5iZiI6MTc1MDY3NjcyMy41NzQwMDAxLCJzdWIiOiI2ODU5MzRmMzZjZDFkNjFhNjI1M2NmZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.a_KXsPXuvq8QOPNWjBU_st2SEIoX32BKrdtkUzWByNs'

    const id = event.context.params?.id
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiKey, accept: 'application/json',
        'Content-Type': 'application/json'
        // For TMDB v3, `api_key` in URL is enough. No Bearer token needed.
      },
    })
  if (!id) {
    const message = await response.text()
    console.error('TMDB Error:', response.status, message)
    throw createError({
      statusCode: response.status,
      message: `TMDB Error: ${message}`,
    })
  }
    const json = await response.json()

    // Only return the actual movie list to client
    return json
}
)