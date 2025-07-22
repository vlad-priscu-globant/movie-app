<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '~/composables/movieStore'
import type { SearchResults } from "~/types/types";
import SkeletonMovieCard from '@/components/SkeletonMovieCard.vue'

const movieStore = useMovieStore()
const { searchResults, searchQuery } = storeToRefs(movieStore)

const alertMessage = ref('')
const showCustomAlert = ref(false)
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const isSearching = ref(false)
const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    hasMore.value
  ) {
    fetchMovies()
  }
}

const fetchMovies = async (reset = false) => {
  if (loading.value || !hasMore.value) return
  loading.value = true
  let url = ''
  if (isSearching.value && searchQuery.value.trim()) {
    url = `/api/search?query=${encodeURIComponent(searchQuery.value)}&page=${page.value}`
  } else {
    url = `/api/movies?page=${page.value}`
  }
  try {
    const {data, pending, error} = await useLazyFetch<SearchResults>(url)
    const movieList = data as any
    if (reset) {
      searchResults.value = []
      page.value = 1
      hasMore.value = true
    }
    if (movieList && movieList.results && Array.isArray(movieList.results)) {
      if (movieList.results.length === 0 && isSearching.value) {
        alertMessage.value = 'No results found. Going back to the front page!';
        showCustomAlert.value = true;
        setTimeout(() => { showCustomAlert.value = false }, 2500);
        isSearching.value = false;
        searchQuery.value = '';
        page.value = 1;

        const resPopular = await fetch(`/api/movies?page=1`);
        const popularData = await resPopular.json();
        searchResults.value = popularData.results || [];
        hasMore.value = popularData.page < popularData.total_pages;
        loading.value = false;
        return;
      }
      searchResults.value.push(...movieList.results)
      page.value += 1
      hasMore.value = movieList.page < movieList.total_pages
    } else {
      hasMore.value = false
    }
  } catch (error) {
    hasMore.value = false
  }
  loading.value = false
}
onMounted(() => {
  fetchMovies()
  window.addEventListener('scroll', handleScroll)
  movieStore.searchMovies('', async () => {
    const res = await fetch('/api/movies?page=1')
    const data = await res.json()
    return Array.isArray(data.results) ? data.results : []
  })
})

// Watch for empty search results after a search
watch([searchResults, searchQuery], async ([results, query]) => {
  if (query && results.length === 0) {
    alertMessage.value = 'No results found. Going back to the front page!';
    showCustomAlert.value = true;
    setTimeout(() => { showCustomAlert.value = false }, 2500);
    // Reset search and show popular movies
    await movieStore.searchMovies('', async () => {
      const res = await fetch('/api/movies?page=1')
      const data = await res.json()
      return Array.isArray(data.results) ? data.results : []
    })
    movieStore.searchQuery = ''
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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
      <SkeletonMovieCard
        v-if="pending && movies.length === 0"
        v-for="n in 20"
        :key="`skeleton-init-${n}`"
      />

      <MovieCard
        v-else
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<style scoped>

</style>