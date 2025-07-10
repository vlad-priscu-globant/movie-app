<script setup lang="ts">
import type { SearchResult } from "~/types/types";

const movies = ref<SearchResult[] | []>([])

// const {data, error, pending} = await useFetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`)
// const movies = ref<SearchResult[] | []>([])

const { data, error } = await useFetch<SearchResult[]>('/api/movies')

watchEffect(() => {
  console.log(data.value)
  if (data.value) {
    movies.value = data.value.results
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
    <div v-for="movie in movies" :key="movie.id"
         class="rounded-lg overflow-hidden shadow hover:drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition hover:scale-110 duration-600">

      <NuxtLink :to="`movie/${movie.id}`">
        <div >
          <img :alt="movie.title" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="w-full aspect-[2/3] object-cover" loading="lazy">
          <div class="p-4">
            <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
            <p class="text-sm text-grey-400">Release: {{ movie.release_date }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>