
<script lang="ts" setup>
import type { SearchResult, SearchResults } from "~/types/types"

const movies = ref<SearchResult[]>([])

const { data, error } = await useFetch<SearchResults>('/api/movies')

watchEffect(() => {
  if (data.value) {
    movies.value = data.value.results
  }
})

// ✅ Programmatic navigation
import { useRouter } from 'vue-router'
const router = useRouter()
function goToRoulette() {
  router.push('/roulette')
}
</script>

<template>
  <div class="p-6">
    <!-- Header + Button -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">Latest Movies</h1>
      <button
        @click="goToRoulette"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Go to Movie Roulette 🎲
      </button>
    </div>

    <!-- Movie Grid -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <template v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </template>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #0f172a;
}
</style>
