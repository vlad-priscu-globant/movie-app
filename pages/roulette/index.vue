<!-- <script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'
import MovieRating from '~/components/MovieRating.vue'
import FavoriteMovie from '~/components/FavoriteMovie.vue'

interface TMDbMovie {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string
}

const genres = [
  { id: 27, name: 'Horror' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10749, name: 'Romance' },
  { id: 16, name: 'Animation' },
]

const selectedGenre = ref<number>(genres[0].id)
const randomMovie = ref<TMDbMovie | null>(null)
const loading = ref(false)

const spinRoulette = async () => {
  loading.value = true
  randomMovie.value = null

  try {
    const { data, error } = await useFetch<TMDbMovie>('/api/random-movie-by-genre', {
      query: { genreId: selectedGenre.value },
    })

    if (error.value) throw error.value
    randomMovie.value = data.value ?? null
  } catch (err) {
    console.error('Error fetching movie:', err)
  } finally {
    loading.value = false
  }
}
</script>

<script setup>
import { ref } from 'vue'

const genres = [
  { id: 27, name: 'Horror' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10749, name: 'Romance' },
  { id: 16, name: 'Animation' },
]

const selectedGenre = ref(genres[0].id)
const loading = ref(false)
const movieTitle = ref('')

function spinRoulette() {
  loading.value = true
  movieTitle.value = ''
  // Simulate fetching a movie title
  setTimeout(() => {
    // Replace this with your actual fetch logic
    movieTitle.value = 'Random Movie Title'
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto text-white">
    <h1 class="text-3xl font-bold mb-4">🎲 Movie Roulette</h1>

    <label class="block mb-2">Choose a Genre:</label>
    <select v-model="selectedGenre" class="w-full p-2 mb-4 text-black rounded">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <button
      @click="spinRoulette"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Spin Roulette
    </button>

    <div v-if="loading" class="mt-4">Loading...</div>

    <div v-if="randomMovie" class="mt-6 bg-gray-800 p-4 rounded shadow">
      <h2 class="text-2xl font-semibold">{{ randomMovie.title }}</h2>
      <p class="text-sm text-gray-400 mb-2">{{ randomMovie.release_date }}</p>
      <img
        v-if="randomMovie.poster_path"
        class="w-full max-w-xs rounded shadow mx-auto mb-4"
        :src="`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`"
        :alt="randomMovie.title"
      />
      <p class="mb-4">{{ randomMovie.overview }}</p>

      <MovieRating :movie="randomMovie" />
      <FavoriteMovie :movie="randomMovie" :readOnly="false" />
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #0f172a;
}
</style> -->




<!-- <template>
  <div>
    <Roulette />
  </div>
</template>

<script setup lang="ts">
import Roulette from '~/components/Roulette.vue'
</script> -->


<!-- <template>
  <div class="p-6 max-w-xl mx-auto text-white">
    <h1 class="text-3xl font-bold mb-4">🎲 Movie Roulette</h1>

    <label class="block mb-2">Choose a Genre:</label>
    <select v-model="selectedGenre" class="w-full p-2 mb-4 text-black rounded">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <button
      @click="spinRoulette"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Spin Roulette
    </button>

   <div v-if="randomMovie" class="mt-6 bg-gray-800 p-4 rounded shadow">
  <h2 class="text-2xl font-semibold mb-2">{{ randomMovie.title }}</h2>
  <img
    v-if="randomMovie.poster"
    :src="randomMovie.poster"
    alt="Poster"
    class="w-64 rounded mb-4"
  />
  <p class="text-gray-300">{{ randomMovie.overview }}</p>
</div>

  </div>
</template>

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
const randomMovie = ref<{ id: number; title: string; overview: string; poster: string } | null>(null)
const loading = ref(false)

const spinRoulette = async () => {
  loading.value = true
  randomMovie.value = null

  try {
    const { data, error } = await useFetch('/api/random-movie-by-genre', {
      query: { genreId: selectedGenre.value }
    })

    if (error.value) throw error.value
    if (data.value) {
      randomMovie.value = data.value as any
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body {
  background-color: #0f172a;
}
</style> -->




<!-- <template>
  <div class="p-6 max-w-xl mx-auto text-white">
    <h1 class="text-3xl font-bold mb-4">🎲 Movie Roulette</h1>

    <label class="block mb-2">Choose a Genre:</label>
    <select v-model="selectedGenre" class="w-full p-2 mb-4 text-black rounded">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <button
      @click="spinRoulette"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Spin Roulette
    </button>

    <div v-if="loading" class="mt-4">Loading...</div>

    <div v-if="randomMovie" class="mt-6 bg-gray-800 p-4 rounded shadow">
      <h2 class="text-2xl font-semibold mb-2">{{ randomMovie.title }}</h2>
      <img
        v-if="randomMovie.poster"
        :src="randomMovie.poster"
        alt="Poster"
        class="w-64 rounded mb-4"
      />
      <p class="text-gray-300">{{ randomMovie.overview }}</p>
    </div>
  </div>
</template>

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
const randomMovie = ref<{ id: number; title: string; overview: string; poster: string | null } | null>(null)
const loading = ref(false)

const spinRoulette = async () => {
  loading.value = true
  randomMovie.value = null

  try {
    const { data, error } = await useFetch('/api/random-movie-by-genre', {
      query: { genreId: selectedGenre.value }
    })

    if (error.value) throw error.value
    if (data.value) randomMovie.value = data.value
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body {
  background-color: #0f172a;
}
</style> -->



<template>
  <div class="p-6 max-w-xl mx-auto text-white">
    <h1 class="text-3xl font-bold mb-4">🎲 Movie Roulette</h1>

    <label class="block mb-2">Choose a Genre:</label>
    <select v-model="selectedGenre" class="w-full p-2 mb-4 text-black rounded">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <button
      @click="spinRoulette"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Spin Roulette
    </button>

    <div v-if="loading" class="mt-4">Loading...</div>

    <div v-if="randomMovie" class="mt-6 bg-gray-800 p-4 rounded shadow">
      <h2 class="text-2xl font-semibold mb-2">{{ randomMovie.title }}</h2>
      <img
        v-if="randomMovie.poster"
        :src="randomMovie.poster"
        alt="Poster"
        class="w-64 rounded mb-4"
      />
      <p class="text-gray-300">{{ randomMovie.overview }}</p>
    </div>
  </div>
</template>

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
const randomMovie = ref<{ id: number; title: string; overview: string; poster: string | null } | null>(null)
const loading = ref(false)

const spinRoulette = async () => {
  loading.value = true
  randomMovie.value = null

  try {
    const { data, error } = await useFetch('/api/random-movie-by-genre', {
      query: { genreId: selectedGenre.value }
    })

    if (error.value) throw error.value
    if (data.value) randomMovie.value = data.value as any
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body {
  background-color: #0f172a;
}
</style>
