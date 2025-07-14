import { ref } from 'vue'
export const useSearchStore = () => {
  const searchQuery = ref('')
  const triggerSearch = ref(false)
  function setSearch(query: string) {
    searchQuery.value = query
    triggerSearch.value = true
  }
  function resetTrigger() {
    triggerSearch.value = false
  }
  return { searchQuery, triggerSearch, setSearch, resetTrigger }
}
