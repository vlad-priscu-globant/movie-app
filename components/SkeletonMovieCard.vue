<template>
  <div class="skeleton-card">
    <div class="skeleton-poster"></div>
    <div class="skeleton-title"></div>
    <div class="skeleton-date"></div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.skeleton-card {  }
.skeleton-poster {
  width: 100%; height: 300px; border-radius: 8px;
  background: #333; animation: pulse-bg 1.2s infinite;
}

.skeleton-title { width: 70%; height: 16px; background: #333; margin: 12px 0; }
.skeleton-date  { width: 40%; height: 12px; background: #333; }

@keyframes pulse-bg {
  0%   { background-color: #2a2a2a; }
  50%  { background-color: #333; }
  100% { background-color: #2a2a2a; }
}
</style>