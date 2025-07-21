<script lang="ts" setup>
// can accept multiple ['auth', 'another-middleware']
import { useFetch } from "#app";
import MovieCard from "~/components/MovieCard.vue";
import Filtering from "~/components/filtering.vue";
import { ref, watchEffect } from "vue";


definePageMeta({
  middleware: 'auth'
})
const movies = ref<FavoriteMovie[]>([])
const allMovies = ref<FavoriteMovie[]>([])
const {data, error} = await useFetch<FavoriteMovie[]>('/api/favorites')

watchEffect(() => {
  if (data.value) {
    console.log(data.value)
    allMovies.value = data.value
    movies.value = data.value
  }
})

function onFilterChange(filters: { sortOrder: string; genres: number[] }) {
  let filtered = allMovies.value

  // Filter by genre if not 'All' (id 0)
  if (filters.genres[0] !== 0) {
    filtered = filtered.filter(movie =>
      movie.movie_data.genres.some((genre: Genre) => genre.id === filters.genres[0])
    )
  }

  // Sort based on sortOrder
  if (filters.sortOrder === 'desc') {
    filtered = filtered.sort((a, b) => b.movie_data.vote_count - a.movie_data.vote_count)
  } else if (filters.sortOrder === 'asc') {
    filtered = filtered.sort((a, b) => a.movie_data.vote_count - b.movie_data.vote_count)
  } else if (filters.sortOrder === 'popular') {
    filtered = filtered.sort((a, b) => b.movie_data.popularity - a.movie_data.popularity)
  }

  movies.value = filtered
}
</script>

<template>
  <div>
    <h1>Favorite movies</h1>
    <Filtering @filterChange="onFilterChange" />
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie.movie_data"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
