<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useFetch } from "#app";
import type { SearchResult } from "~/types/types";
import MovieCard from "~/components/MovieCard.vue";
import Filtering from "~/components/filtering.vue";

definePageMeta({
  middleware: 'auth'
})
const movies = ref<SearchResult[] | []>([])
const filteredMovies = ref<SearchResult[] | []>([])
const sortOrder = ref('')
const selectedGenre = ref(0)

const { data: favoritesData } = await useFetch<any>('/api/favorites')

watchEffect(() => {
  if (favoritesData.value) {
    movies.value = favoritesData.value
    applyFilter()
  }
})

const applyFilter = async () => {
  let genreParam = selectedGenre.value !== 0 ? `&genreId=${selectedGenre.value}` : ''
  let sortParam = sortOrder.value ? `&sort=${sortOrder.value}` : ''
  const { data: filteredData } = await useFetch<any>(`/api/movies?page=1${genreParam}${sortParam}`)
    if (filteredData.value && Array.isArray(filteredData.value.results)) {
      // Filter movies to only those in favorites
      const favoriteIds = new Set(movies.value.map(m => m.id))
      filteredMovies.value = filteredData.value.results.filter((movie: any) => favoriteIds.has(movie.id))
    } else {
      filteredMovies.value = []
    }
}

const onFilterChange = ({ sortOrder: newSortOrder, genres }: { sortOrder: string; genres: number[] }) => {
  sortOrder.value = newSortOrder
  selectedGenre.value = genres[0] || 0
  applyFilter()
}

</script>

<template>
  <div>
    <h1>Favorite movies</h1>
    <Filtering @filterChange="onFilterChange" />
    <div
      v-for="movie in filteredMovies" :key="movie.id"
      class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>


<style scoped>

</style>