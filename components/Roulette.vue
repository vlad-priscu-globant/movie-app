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
      <img :src="randomMovie.poster" alt="Poster" class="w-full rounded mb-2" />
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
</style>
