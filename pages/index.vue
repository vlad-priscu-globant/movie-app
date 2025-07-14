<script lang="ts" setup>
import type { SearchResult, SearchResults } from "~/types/types";
import { ref, watchEffect } from 'vue';
import Pagination from '~/components/Pagination.vue';

const movies = ref<SearchResult[] | []>([])
const currentPage = ref(1)
const totalPages = ref(1)

const fetchMovies = async (page = 1) => {
  const { data, error } = await useFetch<SearchResults>(`/api/movies?page=${page}`)
  if (data.value) {
    movies.value = data.value.results
    totalPages.value = data.value.total_pages
    currentPage.value = data.value.page
  }
}

watchEffect(() => {
  fetchMovies(currentPage.value)
})
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <template v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie"/>
      </template>
    </div>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="(page) => { currentPage = page }"
    />
  </div>
</template>

<style scoped>
</style>