<template>
  <div class="flex justify-center mt-6 gap-2">
    <button
      class="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >Prev</button>
    <span class="px-3 py-1">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      class="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >Next</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  currentPage: number,
  totalPages: number
}>()

const emit = defineEmits(['update:page'])
</script>

<style scoped>
</style> 