<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { SearchResult, SearchResults } from "../types/types.ts";
import { fetchPopularMovies } from "../api/tmdb.ts";

// defineProps(['movies'])
const movies = ref<SearchResult[] | []>([])
onMounted(async () => {
  const data: SearchResults = await fetchPopularMovies(1);
  movies.value = data.results;
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
    <div v-for="movie in movies" :key="movie.id" class="rounded-lg overflow-hidden shadow hover:drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition hover:scale-110 duration-600">
      <RouterLink :to="`movie/${movie.id}`">
        <img :alt="movie.title" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`">
        <div class="p-4">
          <h2 class="text-lg font-semibold">{{movie.title}}</h2>
          <p class="text-sm text-grey-400">Release: {{movie.release_date}}</p>
          <p class="text-yellow-400 font-medium text-sm mt-1">⭐ {{ movie.vote_average.toFixed(1) }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>