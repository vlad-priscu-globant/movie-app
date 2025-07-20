import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SearchResult } from '../types/types'

export const useMovieStore = defineStore('movieStore', () => {
  // Cache for individual movies by ID
  const movieCache = ref<Record<number, SearchResult>>({})
  // List of movies from the latest search
  const searchResults = ref<SearchResult[]>([])
  // Current search query
  const searchQuery = ref('')
  // Loading state
  const isLoading = ref(false)
  // Error state
  const error = ref<string | null>(null)

  // Fetch a single movie by ID, with caching
  async function fetchMovieById(id: number, fetcher: (id: number) => Promise<SearchResult>) {
    if (movieCache.value[id]) {
      return movieCache.value[id]
    }
    isLoading.value = true
    error.value = null
    try {
      const data = await fetcher(id)
      movieCache.value[id] = data
      return data
    } catch (e: any) {
      error.value = e?.message || 'Failed to fetch movie.'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // Search for movies by query
  async function searchMovies(query: string, searcher: (query: string) => Promise<SearchResult[]>) {
    searchQuery.value = query
    isLoading.value = true
    error.value = null
    try {
      const results = await searcher(query)
      searchResults.value = results
      return results
    } catch (e: any) {
      error.value = e?.message || 'Failed to search movies.'
      searchResults.value = []
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // Clear search results
  function clearSearch() {
    searchResults.value = []
    searchQuery.value = ''
  }

  return {
    movieCache,
    searchResults,
    searchQuery,
    isLoading,
    error,
    fetchMovieById,
    searchMovies,
    clearSearch
  }
})
