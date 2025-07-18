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
      <slot/>
    </main>

    <footer class="text-center text-gray-500 text-sm p-4 border-t border-gray-700">
      © 2025 MovieApp.
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>