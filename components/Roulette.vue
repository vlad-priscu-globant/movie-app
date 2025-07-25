<script setup lang="ts">
import { ref } from 'vue'

const genres = [
  { id: 27, name: 'Horror' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10749, name: 'Romance' },
  { id: 16, name: 'Animation' }
]

const selectedGenre = ref<number>(genres[0].id)
const loading = ref(false)
const randomMovie = ref<{
  id: number
  title: string
  overview: string
  poster: string | null
} | null>(null)

const spinRoulette = async () => {
  loading.value = true
  randomMovie.value = null

  try {
    const { data, error } = await useFetch('/api/random-movie-by-genre', {
      query: { genreId: selectedGenre.value }
    })

    if (error.value) throw error.value

    if (data.value) {
      const movie = data.value as any
      randomMovie.value = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster || 'https://via.placeholder.com/500x750?text=No+Image'
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
