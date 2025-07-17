import {ref} from 'vue'

export function useSearch() {
    const searchQuery = ref('')
    const results = ref([])
    const loading = ref(false)
    const error = ref(null)


async function handleSearch(query){
    searchQuery.value = query
    loading.value = true
    error.value = null
    try {
        const { data, error: fetchError } = await useFetch(`/api/movies?query=${encodeURIComponent(query)}`)
        results.value = data.value.results
    } catch (e){
        error.value = e
    } finally {
        loading.value = false
    }
}

return {
    searchQuery, 
    results,
    loading,
    error,
    handleSearch
}
}
