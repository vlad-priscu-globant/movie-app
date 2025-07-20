<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { SearchResult, SearchResults } from "~/types/types";
import SkeletonMovieCard from '@/components/SkeletonMovieCard.vue'

const movies = ref<SearchResult[] | []>([])

const {data, pending, error} = await useLazyFetch<SearchResults>('/api/movies')

watchEffect(() => {
  if (data.value) {
    movies.value = data.value.results
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
    <SkeletonMovieCard
      v-if="pending && movies.length === 0"
      v-for="n in 20"
      :key="`skeleton-init-${n}`"
    />

    <MovieCard
      v-else
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<style scoped>

</style>