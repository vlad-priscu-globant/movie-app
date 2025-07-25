<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['filterChange'])
const sortOrder = ref('desc') 
const selectedGenre = ref(0)
const genreOptions = [
  { id: 0, label: 'All' },
  { id: 10759, label: 'Action & Adventure' },
  { id: 16, label: 'Animation' },
  { id: 35, label: 'Comedy' },
  { id: 80, label: 'Crime' },
  { id: 99, label: 'Documentary' },
  { id: 18, label: 'Drama' },
  { id: 10751, label: 'Family' },
  { id: 10762, label: 'Kids' },
  { id: 9648, label: 'Mystery' },
  { id: 10763, label: 'News' },
  { id: 10764, label: 'Reality' },
  { id: 10765, label: 'Sci-Fi & Fantasy' },
  { id: 10766, label: 'Soap' },
  { id: 10767, label: 'Talk' },
  { id: 10768, label: 'War & Politics' },
  { id: 37, label: 'Western' }
]

const sortOptions = [
  { value: 'desc', label: 'Most likes' },
  { value: 'asc', label: 'Least likes' },
  { value: 'popular', label: 'By popularity' },
  { value: 'recent', label: 'Recent upload' },
  { value: 'old', label: 'Old upload' }
]

const genreDropdownOpen = ref(false)
const sortDropdownOpen = ref(false)

const toggleGenreDropdown = () => {
  genreDropdownOpen.value = !genreDropdownOpen.value
  if (genreDropdownOpen.value) sortDropdownOpen.value = false
}

const toggleSortDropdown = () => {
  sortDropdownOpen.value = !sortDropdownOpen.value
  if (sortDropdownOpen.value) genreDropdownOpen.value = false
}

const selectGenre = (id) => {
  selectedGenre.value = id
  genreDropdownOpen.value = false
}

const selectSort = (value) => {
  sortOrder.value = value
  sortDropdownOpen.value = false
}

watch([sortOrder, selectedGenre], ([newSortOrder, newSelectedGenre]) => {
  emit('filterChange', { sortOrder: newSortOrder, genres: [newSelectedGenre] })
})
</script>

<template>
  <div class="flex items-center gap-10 relative">
    <div class="text-white gap-2 flex items-center relative">
      <button @click="toggleGenreDropdown" class="chip primary white--text chip--outline" tabindex="0" type="button">
        <span class="chip__content">{{ genreOptions.find(g => g.id === selectedGenre)?.label || 'Select Genre' }}</span>
      </button>
      <div v-if="genreDropdownOpen" class="absolute z-10 mt-2 bg-gray-800 rounded shadow-lg max-h-60 overflow-auto" style="min-width: 200px;">
        <button
          v-for="genre in genreOptions"
          :key="genre.id"
          @click="selectGenre(genre.id)"
          :class="['chip white--text chip--outline m-1', { 'primary': genre.id === selectedGenre }]"
          tabindex="0"
          type="button"
        >
          <span class="chip__content">{{ genre.label }}</span>
        </button>
      </div>
    </div>
    <div class="flex flex-col relative">
      <button @click="toggleSortDropdown" class="chip primary white--text chip--outline w-32 text-left" tabindex="0" type="button">
        <span class="chip__content">{{ sortOptions.find(s => s.value === sortOrder)?.label || 'Select Sort' }}</span>
      </button>
      <div v-if="sortDropdownOpen" class="absolute z-10 mt-2 bg-gray-800 rounded shadow-lg max-h-60 overflow-auto w-32">
        <button
          v-for="sort in sortOptions"
          :key="sort.value"
          @click="selectSort(sort.value)"
          :class="['chip white--text chip--outline m-1 w-full text-left', { 'primary': sort.value === sortOrder }]"
          tabindex="0"
          type="button"
        >
          <span class="chip__content">{{ sort.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid currentColor;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}
.chip.primary {
  background-color: #3b82f6; /* Tailwind blue-500 */
  border-color: #3b82f6;
}
.chip.primary:hover {
  background-color: #2563eb; /* Tailwind blue-600 */
  border-color: #2563eb;
}
.chip.chip--outline {
  background-color: transparent;
}
.chip__content {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>