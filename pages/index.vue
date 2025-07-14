<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
const showCustomAlert = ref(false)
const alertMessage = ref('')
const movies = ref<any[]>([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const searchQuery = ref('')
const isSearching = ref(false)

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
      movies.value = []
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
        movies.value = popularData.results || [];
        hasMore.value = popularData.page < popularData.total_pages;
        loading.value = false;
        return;
      }
      movies.value.push(...data.results)
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

const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    hasMore.value
  ) {
    fetchMovies()
  }
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    isSearching.value = false
    page.value = 1
    movies.value = []
    hasMore.value = true
    await fetchMovies(true)
    return
  }
  isSearching.value = true
  page.value = 1
  movies.value = []
  hasMore.value = true
  await fetchMovies(true)
}

onMounted(() => {
  fetchMovies()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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
  <div class="flex justify-center items-center mb-6 space-x-3">
    <div class="relative w-80">
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search for a movie..."
        class="border-2 border-[#FF1E1E] text-gray-800 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-[#FF1E1E] transition-all duration-300 rounded-full px-5 py-2 w-full shadow-sm pr-10"
      />
      <button
        v-if="searchQuery"
        @click="searchQuery = ''"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF1E1E] focus:outline-none"
        aria-label="Clear search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <button
      @click="handleSearch"
      class="px-5 py-2 rounded-full bg-[#FF1E1E] text-white font-semibold transition-all duration-300 hover:brightness-110 hover:scale-105 shadow-lg hover:shadow-[0_0_10px_#FF1E1E]"
    >
      Search
    </button>
  </div>


    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <LoadingSpinner v-if="loading" />
    <div v-if="!hasMore" class="text-center py-4 text-gray-500">No more movies to load.</div>
  </div>
function onHeaderSearch(query: string) {
  searchQuery.value = query
  handleSearch()
}
</template>

<style scoped>

</style>