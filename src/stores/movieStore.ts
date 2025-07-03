import { ref } from "vue";
import { defineStore } from 'pinia'
import type { SearchResult } from "../types/types.ts";
import { fetchMovieById } from "../api/tmdb.ts";

export const movieStore = defineStore('movieStore', () => {

  const movieCache = ref<Record<any, SearchResult>>({})

  async function fetchMovie(id: number): Promise<SearchResult> {
    if (movieCache.value[id]) {
      return movieCache.value[id];
    }
    const data = await fetchMovieById(id);
    movieCache.value[id] = data || {}
    return data
  }

  return {movieCache, fetchMovie}
})