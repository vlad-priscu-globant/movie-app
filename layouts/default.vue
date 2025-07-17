<script lang="ts" setup>
import { ref } from 'vue'
const user = await useSupabaseUser();
import { useRouter } from 'vue-router'
import { useSearch } from '~/composables/useSearch'
const { searchQuery, results, loading, error } = useSearch()
const showCustomAlert = ref(false)
const alertMessage = ref('')
const router = useRouter()

async function handleSearch(query) {
  searchQuery.value = query
  let url = '/api/movies'
  if (query && query.length >= 3) {
    url += `?query=${encodeURIComponent(query)}`
  }
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data && Array.isArray(data.results)) {
      if (data.results.length === 0 && query) {
        alertMessage.value = 'No results found. Going back to the front page!';
        showCustomAlert.value = true;
        setTimeout(() => {
          showCustomAlert.value = false;
          router.push('/')
        }, 2500);
        searchQuery.value = ''
        // Fetch popular movies
        const resPopular = await fetch('/api/movies?page=1')
        const popularData = await resPopular.json()
        results.value = popularData.results || []
        return;
      }
      results.value = data.results
    } else {
      results.value = []
    }
  } catch (e) {
    results.value = []
  }
}

async function handleClear() {
  searchQuery.value = ''
  alertMessage.value = ''
  showCustomAlert.value = false
  router.push('/')
  // Fetch popular movies
  const resPopular = await fetch('/api/movies?page=1')
  const popularData = await resPopular.json()
  results.value = popularData.results || []
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
      <transition name="fade">
        <div v-if="showCustomAlert" class="fixed left-1/2 top-8 transform -translate-x-1/2 z-50">
          <div class="bg-[#FF1E1E] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
            {{ alertMessage }}
          </div>
        </div>
      </transition>
      <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
        <div v-if="loading" class="col-span-full text-center text-lg py-8">Loading...</div>
        <div v-if="error" class="col-span-full text-center text-red-500 py-8">{{ error }}</div>
        <div v-if="results.length === 0 && !loading" class="col-span-full text-center text-gray-400 py-8">No movies found.</div>
        <div v-for="movie in results" :key="movie.id">
          <MovieCard :movie="movie" />
        </div>
      </div>
    </main>

    <footer class="text-center text-gray-500 text-sm p-4 border-t border-gray-700">
      © 2025 MovieApp.
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>