<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '~/composables/movieStore'
import type { SearchResults } from "~/types/types";
import SkeletonMovieCard from '@/components/SkeletonMovieCard.vue'
import Filtering from "~/components/filtering.vue";
import { useRouter } from 'vue-router'
const router = useRouter()

const movieStore = useMovieStore()
const { searchResults, searchQuery } = storeToRefs(movieStore)

const alertMessage = ref('')
const showCustomAlert = ref(false)
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const isSearching = ref(false)
const url = ref('')
const sortOrder = ref('')
const selectedGenre = ref(0)
const { data, pending, refresh } = useFetch<SearchResults>(
  url,
  { server: false, immediate: false }
)
const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    hasMore.value
  ) {
    fetchMovies()
  }
}

watchEffect(() => {
  if (!data.value) return
  const res = data.value
  page.value === 1
    ? searchResults.value = res.results || []
    : searchResults.value.push(...(res.results || []))
  hasMore.value = res.page < res.total_pages
  loading.value = false
  page.value++
})

const fetchMovies = () => {
  if (loading.value || !hasMore.value) return
  loading.value = true
  if (isSearching.value && searchQuery.value.trim()) {
    url.value = `/api/search?query=${encodeURIComponent(searchQuery.value)}&page=${page.value}`
  } else {
    let genreParam = selectedGenre.value !== 0 ? `&genreId=${selectedGenre.value}` : ''
    let sortParam = sortOrder.value ? `&sort=${sortOrder.value}` : ''
    url.value = `/api/movies?page=${page.value}${genreParam}${sortParam}`
  }
  refresh().catch(() => {
    hasMore.value = false
    loading.value = false
  })
}

const onFilterChange = ({ sortOrder: newSortOrder, genres }: { sortOrder: string; genres: number[] }) => {
  sortOrder.value = newSortOrder
  selectedGenre.value = genres[0] || 0
  page.value = 1
  hasMore.value = true
  searchResults.value = []
  fetchMovies()
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

watch([searchResults, searchQuery], async ([results, query]) => {
  if (query && results?.length === 0) {
    alertMessage.value = 'No results found. Going back to the front page!';
    showCustomAlert.value = true;
    setTimeout(() => { showCustomAlert.value = false }, 2500);
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

function goToRoulette() {
  router.push('/roulette')
}
</script>

<template>
     <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">Latest Movies</h1>
      <button
        @click="goToRoulette"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Go to Movie Roulette 🎲
      </button>
    </div>
  <div>
    <Filtering @filterChange="onFilterChange" />
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
        v-if="pending && searchResults.length === 0"
        v-for="n in 20"
        :key="`skeleton-init-${n}`"
      />

      <MovieCard v-else v-for="movie in searchResults" :key="movie.id" :movie="movie" />
    </div>
      <div class="p-6">
        </div>
  </div>
 
  
</template>

<style scoped>

</style>