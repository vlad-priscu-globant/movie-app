<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { SearchResult } from '../types/types'

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
    //TODO fix this to use a store. Make sure to update the search component to also use the store.
    const {data} = await useFetch<SearchResult>(url) as any
    if (data.value && Array.isArray(data.value.results)) {
      if (data.value.results.length === 0 && isSearching.value) {
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
      movies.value = data.value.results
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
        <div
          class="bg-[#FF1E1E] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 animate-bounce">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"/>
          </svg>
          {{ alertMessage }}
        </div>
      </div>
    </transition>
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>