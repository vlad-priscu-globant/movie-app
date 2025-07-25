<<<<<<< Updated upstream
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '~/composables/movieStore'
=======
<!-- <script lang="ts" setup>
import type { SearchResult, SearchResults } from "~/types/types";
>>>>>>> Stashed changes

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
    const res = await fetch(url)
    const data = await res.json()
    if (reset) {
      searchResults.value = []
      page.value = 1
      hasMore.value = true
    }
    if (data && data.results && Array.isArray(data.results)) {
      if (data.results.length === 0 && isSearching.value) {
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
      searchResults.value.push(...data.results)
      page.value += 1
      hasMore.value = data.page < data.total_pages
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
      <div v-for="movie in searchResults" :key="movie.id">
        <MovieCard :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style> -->


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
const router = useRouter()
const goToRoulette = () => {
  router.push('/roulette') // ✅ Correct path
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
