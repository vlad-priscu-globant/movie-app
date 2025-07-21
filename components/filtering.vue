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

watch([sortOrder, selectedGenre], ([newSortOrder, newSelectedGenre]) => {
  emit('filterChange', { sortOrder: newSortOrder, genres: [newSelectedGenre] })
})
</script>

<template>
  <div class="flex items-center gap-10">
    <div class="text-white gap-2 flex items-center">
      <label>Tags</label>
      <select v-model="selectedGenre" class="text-black" style="min-width: 200px;">
        <option v-for="genre in genreOptions" :key="genre.id" :value="genre.id">{{ genre.label }}</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="sortOrder" class="text-white mb-1">Sort Order</label>
      <select id="sortOrder" v-model="sortOrder" class="rounded px-2 py-1 text-black w-32">
        <option value="desc">Most likes</option>
        <option value="asc">Least likes</option>
        <option value="popular">By popularity</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling if needed */
</style>
