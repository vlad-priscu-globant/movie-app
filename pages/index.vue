<script lang="ts" setup>
import type { SearchResult, SearchResults } from "~/types/types";
import { ref, watch, computed } from "vue";
import Pagination from "~/components/Pagination.vue";

const movies = ref<SearchResult[] | []>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(1)
const totalResults = ref<number>(0)
const isLoading = ref<boolean>(false)
const error = ref<Error | null>(null)

// New reactive variable for sorting order, including 'none' option
const sortOrder = ref<'none' | 'desc' | 'asc'>('none')

// Computed property for sorted movies
const sortedMovies = computed(() => {
  if (sortOrder.value === 'none') {
    return movies.value
  }
  return [...movies.value].sort((a, b) => {
    const ratingA = a.vote_average ?? 0
    const ratingB = b.vote_average ?? 0
    if (sortOrder.value === 'asc') {
      return ratingA - ratingB
    } else {
      return ratingB - ratingA
    }
  })
})

import { useRuntimeConfig } from '#app'

async function fetchMovies(page: number) {
  isLoading.value = true
  error.value = null
  try {
    const apiUrl = `/api/movies?page=${page}&sort=${sortOrder.value}`
    const { data, error: fetchError } = await useFetch<SearchResults>(apiUrl)
    if (fetchError.value) {
      throw fetchError.value
    }
    if (data.value) {
      movies.value = data.value.results
      totalPages.value = data.value.total_pages
      totalResults.value = data.value.total_results
    }
  } catch (err) {
    error.value = err as Error
  } finally {
    isLoading.value = false
  }
}

// Initial fetch
fetchMovies(currentPage.value)

// Watch currentPage and refetch movies when it changes
watch(currentPage, (newPage) => {
  fetchMovies(newPage)
})
</script>

<template>
  <div class="p-4">
    <!-- Sorting filter -->
    <div class="mb-4 flex items-center space-x-2">
      <label for="sortOrder" class="font-semibold">Sort by rating:</label>
      <select id="sortOrder" v-model="sortOrder" class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
        <option value="none">None</option>
        <option value="desc">High to Low</option>
        <option value="asc">Low to High</option>
      </select>
    </div>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <template v-for="movie in sortedMovies" :key="movie.id">
        <MovieCard :movie="movie"/>
      </template>
    </div>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="currentPage = $event"
    />

    <div v-if="isLoading" class="text-center mt-4">Loading...</div>
    <div v-if="error" class="text-center mt-4 text-red-600">Error: {{ error.message }}</div>
  </div>
</template>

<style scoped>
</style>
