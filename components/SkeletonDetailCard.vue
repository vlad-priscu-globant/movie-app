<template>
  <div class="max-w-5xl mx-auto mt-8 animate-pulse">
    <div class="flex flex-col md:flex-row gap-6">
      <!--poster-->
      <div class="bg-gray-700 rounded w-full md:w-1/3 aspect-[2/3]"></div>
      <div class="flex-1 space-y-4 py-1">
        <!--titlu-->
        <div class="h-8 bg-gray-700 rounded w-1/2"></div>
        <!--rating-->
        <div class="h-4 bg-gray-700 rounded w-1/4"></div>
        <!--overview rand-->
        <div class="space-y-2">
          <div class="h-4 bg-gray-700 rounded"></div>
          <div class="h-4 bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
        <!--favorites-->
        <div class="h-10 bg-gray-700 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>

.bg-gray-700 { background-color: #333; }
.animate-pulse { animation: pulse 1.5s ease-in-out infinite; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
</style>