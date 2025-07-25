<script lang="ts" setup>
import { useFetch, useNuxtApp } from "#app";
import MovieCard from "~/components/MovieCard.vue";
import Filtering from "~/components/filtering.vue";
import SkeletonMovieCard from "~/components/SkeletonMovieCard.vue";
import { ref, watchEffect, computed } from "vue";
import Pagination from "~/components/Pagination.vue";

definePageMeta({
  middleware: 'auth'
})
const currentPage = ref(1);
const itemsPerPage = 20;
const totalPages = computed(() =>
  Math.ceil(movies.value.length / itemsPerPage)
);

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return movies.value.slice(start, end);
});
const nuxtApp = useNuxtApp()
const isServer = computed(() => !!nuxtApp.ssrContext)
const movies = ref<any[]>([])
const allMovies = ref<any[]>([])
const sortOrder = ref('desc')
const selectedGenre = ref(0)
const pending = ref(true)
const fetchFavorites = async () => {
  const url = `/api/movie/favorites?sort=${sortOrder.value}`
  pending.value = true
  const { data, error } = await useFetch<any[]>(url)
  pending.value = false
  if (error.value) {
    console.error('Failed to fetch favorite movies:', error.value)
    allMovies.value = []
    movies.value = []
    return
  }
  if (data.value) {
    allMovies.value = data.value
    applyFilter()
  }
}

watch([sortOrder], () => {
  fetchFavorites()
})

watchEffect(() => {
  fetchFavorites()
})

const applyFilter = () => {
  let filtered = allMovies.value
  if (selectedGenre.value !== 0) {
    filtered = filtered.filter(movie =>
      movie.movie_data.genres.some((genre: any) => genre.id === selectedGenre.value)
    )
  }
  movies.value = filtered
  currentPage.value = 1;
}

function onFilterChange(filters: { sortOrder: string; genres: number[] }) {
  sortOrder.value = filters.sortOrder
  selectedGenre.value = filters.genres[0] || 0
}
</script>

<template>
  <div>
    <h1>Favorite movies</h1>
    <Filtering @filterChange="onFilterChange" />
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <SkeletonMovieCard
        v-if="pending && movies.length === 0"
        v-for="n in 20"
        :key="`skeleton-fav-${n}`"
      />
      <MovieCard
        v-else
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie.movie_data"
      />
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="(page) => currentPage = page"
    />
  </div>
</template>

<style scoped>

</style>