<script setup lang="ts">
import type { SearchResult } from "~/types/types";

const props = defineProps<{
  movie: Partial<SearchResult>
}>()
</script>

<template>
  <div :key="props.movie.id"
    class="rounded-lg overflow-hidden shadow hover:drop-shadow-[0_4px_12px_rgba(0,0,0,1)] bottom-0 transition hover:scale-105 duration-600 hover:z-50 hover:-translate-y-8">

    <NuxtLink :to="`movie/${props.movie.id}`">
      <div class="group relative ">
        <div class="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div>
          <img :alt="props.movie.title" :src="`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`"
            class="w-full aspect-[2/3] object-cover" loading="lazy">
          <div class="p-4 absolute bottom-0 inset-x-0 text-center ">
            <h2 class="text-xl font-semibold">{{ props.movie.title }}</h2>
            <p class="text-sm text-grey-400">Release: {{ props.movie.release_date }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>