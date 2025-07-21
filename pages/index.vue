<script lang="ts" setup>
import type { SearchResults, SearchResult } from "~/types/types";
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from "~/components/Pagination.vue";

const movies = ref<SearchResult[]>([]);
const showCustomAlert = ref(false);
const alertMessage = ref('');
const isSearching = ref(false);
const router = useRouter();

const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const totalResults = ref<number>(0);

const isLoading = ref<boolean>(false);
const error = ref<Error | null>(null);
const sortOrder = ref<'none' | 'desc' | 'asc'>('none');

async function fetchMovies(page: number) {
  isLoading.value = true;
  error.value = null;
  try {
    const apiUrl = `/api/movies?page=${page}&sort=${sortOrder.value}`;
    const { data, error: fetchError } = await useFetch<SearchResults>(apiUrl);
    if (fetchError.value) {
      throw fetchError.value;
    }
    if (data.value) {
      movies.value = data.value.results;
      totalPages.value = data.value.total_pages;
      totalResults.value = data.value.total_results;
    }
  } catch (err) {
    error.value = err as Error;
  } finally {
    isLoading.value = false;
  }
}

fetchMovies(currentPage.value);
watch(currentPage, (newPage) => {
  fetchMovies(newPage);
});
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="showCustomAlert" class="fixed left-1/2 top-8 transform -translate-x-1/2 z-50">
        <div
          class="bg-[#FF1E1E] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 animate-bounce">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="2" />
          </svg>
          {{ alertMessage }}
        </div>
      </div>
    </transition>

    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>

    <div class="p-4 flex justify-center">
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="currentPage = $event" />
    </div>
    <div v-if="isLoading" class="text-center mt-4">Loading...</div>
    <div v-if="error" class="text-center mt-4 text-red-600">Error: {{ error.message }}</div>
  </div>
</template>

<style scoped>
/* your existing styles */
</style>
