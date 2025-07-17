<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import type { SearchResult, SearchResults } from '../types/types'

const movies = ref<SearchResult[] | []>([])
const showCustomAlert = ref(false)
const alertMessage = ref('')
const isSearching = ref(false)
const router = useRouter()


fetchMovies()

async function fetchMovies(query = '') {
  isSearching.value = !!query
  let url = '/api/movies'
  if (query) url += `?query=${encodeURIComponent(query)}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    console.log('API response:', data)
    if (data && Array.isArray(data.results)) {
      if (data.results.length === 0 && isSearching.value) {
        alertMessage.value = 'No results found. Going back to the front page!';
        showCustomAlert.value = true;
        setTimeout(() => {
          showCustomAlert.value = false;
          router.push('/')
        }, 2500);
        isSearching.value = false;
        fetchMovies('')
        return;
      }
      movies.value = data.results
    } else {
      movies.value = []
    }
  } catch (e) {
    console.error('API fetch error:', e)
    movies.value = []
  }
}


</script>

<template>
  <div>
   
    <transition name="fade">
      <div v-if="showCustomAlert" class="fixed left-1/2 top-8 transform -translate-x-1/2 z-50">
        <div class="bg-[#FF1E1E] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
          {{ alertMessage }}
        </div>
      </div>
    </transition>
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>