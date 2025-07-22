<script lang="ts" setup>
import { ref } from 'vue'
const user = await useSupabaseUser();
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '~/composables/movieStore'
const movieStore = useMovieStore()
const { searchQuery } = storeToRefs(movieStore)
const showCustomAlert = ref(false)
const alertMessage = ref('')
const router = useRouter()

async function handleSearch(query: string) {
  await movieStore.searchMovies(query, async (q: string) => {
    const url = q ? `/api/movies?query=${encodeURIComponent(q)}` : '/api/movies?page=1'
    const res = await fetch(url)
    const data = await res.json()
    return Array.isArray(data.results) ? data.results : []
  })
  if (query && movieStore.searchResults.length === 0) {
    alertMessage.value = 'No results found. Going back to the front page!';
    showCustomAlert.value = true;
    setTimeout(() => {
      showCustomAlert.value = false;
      router.push('/')
    }, 2500);
    await movieStore.searchMovies('', async () => {
      const res = await fetch('/api/movies?page=1')
      const data = await res.json()
      return Array.isArray(data.results) ? data.results : []
    })
    searchQuery.value = ''
  }
}

async function handleClear() {
  movieStore.clearSearch()
  alertMessage.value = ''
  showCustomAlert.value = false
  router.push('/')
  await movieStore.searchMovies('', async () => {
    const res = await fetch('/api/movies?page=1')
    const data = await res.json()
    return Array.isArray(data.results) ? data.results : []
  })
}
</script>
<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <header class="flex justify-between items-center p-4 bg-gradient-to-b from-black via-gray-900 to-transparent">
      <NuxtLink to="/"><h1 class="text-3xl font-bold text-red-600">MovieApp</h1></NuxtLink>
      <nav class="flex gap-6">
        <SearchBar
          :input="searchQuery"
          @search="handleSearch"
          @clear="handleClear"
        />
        <RouterLink v-if="!user" class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700" to="/login">Login
        </RouterLink>
        <template v-else>
          <RouterLink to="/favorites">Favorites</RouterLink>
          <LogoutButton></LogoutButton>
        </template>
      </nav>
    </header>
    <main class="p-4">
      <slot/>
    </main>

    <footer class="text-center text-gray-500 text-sm p-4 border-t border-gray-700">
      © 2025 MovieApp.
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>