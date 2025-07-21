import { ref } from 'vue'
import type { SearchResult } from '~/types/types'

// Singleton state
const searchQuery = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const error = ref<Error | null>(null)
const showCustomAlert = ref(false)
const alertMessage = ref('')

async function handleSearch(query: string) {
  searchQuery.value = query
  loading.value = true
  error.value = null
  let url = '/api/movies'
  if (query && query.length >= 3) {
    url += `?query=${encodeURIComponent(query)}`
  }
  try {
    const { data } = await useFetch<{ results: SearchResult[] }>(url)
    if (data.value && Array.isArray(data.value.results)) {
      if (data.value.results.length === 0 && query) {
        alertMessage.value = 'No results found. Going back to the front page!';
        showCustomAlert.value = true;
        setTimeout(async () => {
          showCustomAlert.value = false;
          searchQuery.value = ''
          await fetchPopularMovies()
        }, 2500);
        return;
      }
      results.value = data.value.results
    } else {
      results.value = []
    }
  } catch (e: any) {
    results.value = []
    error.value = e instanceof Error ? e : new Error('Unknown error')
  } finally {
    loading.value = false
  }
}

async function handleClear() {
  searchQuery.value = ''
  alertMessage.value = ''
  showCustomAlert.value = false
  await fetchPopularMovies()
}

async function fetchPopularMovies() {
  loading.value = true
  error.value = null
  try {
    const { data: popularData } = await useFetch<{ results: SearchResult[] }>('/api/movies?page=1')
    results.value = (popularData.value && popularData.value.results) || []
  } catch (e: any) {
    results.value = []
    error.value = e instanceof Error ? e : new Error('Unknown error')
  } finally {
    loading.value = false
  }
}

export function useSearch() {
  return {
    searchQuery,
    results,
    loading,
    error,
    showCustomAlert,
    alertMessage,
    handleSearch,
    handleClear,
    fetchPopularMovies
  }
}
