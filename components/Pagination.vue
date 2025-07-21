<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage'])

function goPrevious() {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

function goNext() {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="flex justify-center items-center mt-6 space-x-4">
    <button
      class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      :disabled="currentPage === 1"
      @click="goPrevious"
      aria-label="Previous page"
    >
      &laquo; Previous
    </button>

    <span class="text-lg font-medium text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>

    <button
      class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      :disabled="currentPage === totalPages"
      @click="goNext"
      aria-label="Next page"
    >
      Next &raquo;
    </button>
  </div>
</template>

<style scoped>
</style>
