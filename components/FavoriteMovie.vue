<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useFetch } from '#app'
import { useSupabaseUser } from '#imports'
import type { SearchResult } from '~/types/types'
import LoadingSpinner from "~/components/LoadingSpinner.vue";

interface Favorite {
  movie_id: number
  status: string
  rating: number
}

const props = defineProps<{
  movie: Partial<SearchResult>
  readOnly?: boolean
}>()

const user = useSupabaseUser()
const loading = ref(true)
const pending = ref(false)
const errorMessage = ref<string | null>(null)


const trailerKey = ref<string | null>(null)
const movieStatus = ref('plan_to_watch')
const movieRating = ref(0)
const { data: favorites, error: favoritesError, refresh: refreshFavorites } = useFetch<Favorite[]>(
  '/api/favorites',
  {
    immediate: false,
    server: false,
  }
)
const isFavorite = computed(() => {
  if (!user.value || !props.movie.id || !favorites.value) {
    return false
  }
  return favorites.value.some(f => Number(f.movie_id) === Number(props.movie.id))
})

interface Video {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

interface TrailerResponse {
  videos: {
    results: Video[]
  }
}

onMounted(async () => {
  if (!props.movie.id) {
    loading.value = false
    return
  }

  const trailerFetchPromise = useFetch<TrailerResponse>(`/api/movie/${props.movie.id}`)
  const favoriteFetchPromise = user.value ? refreshFavorites() : Promise.resolve()
  const [trailerResult] = await Promise.all([
    trailerFetchPromise,
    favoriteFetchPromise
  ])

  const trailerData = trailerResult.data.value
  const trailerError = trailerResult.error.value

  if (trailerData?.videos?.results?.length) {
    const trailer = trailerData.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    trailerKey.value = trailer?.key || null
  }

  if (trailerError) console.error('Trailer fetch error', trailerError)
  if (favoritesError.value) console.error('Favorite fetch error', favoritesError.value)
  loading.value = false
})

const updateFavoriteDetails = async () => {
  if (!isFavorite.value || !props.movie.id || pending.value) return

  pending.value = true
  errorMessage.value = null

  const { error } = await useFetch('/api/favorites', {
    method: 'PUT',
    body: {
      movie_id: props.movie.id,
      status: movieStatus.value,
      rating: movieRating.value,
    }
  })

  if (error.value) {
    console.error('Favorite update error:', error.value)
    errorMessage.value = 'Failed to save changes. Please try again.'
  } else {
    // Refresh local data to ensure consistency
    await refreshFavorites()
  }

  pending.value = false
}

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function(this: any, ...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

const debouncedUpdate = debounce(updateFavoriteDetails, 1000)

watch([movieStatus, movieRating], () => {
  if (isFavorite.value) {
    debouncedUpdate()
  }
})

watch(favorites, (newFavorites) => {
  const favoriteData = newFavorites?.find(f => Number(f.movie_id) === Number(props.movie.id))
  if (favoriteData) {
    movieStatus.value = favoriteData.status || 'plan_to_watch'
    movieRating.value = favoriteData.rating ?? 0
  }
}, { immediate: true })

const toggleFavorite = async () => {
  if (!user.value || !props.movie.id) return

  pending.value = true
  errorMessage.value = null

  const method = isFavorite.value ? 'DELETE' : 'POST'
  let body: Record<string, any> = { movie_id: props.movie.id }

  if (method === 'POST') {
    body = {
      ...body,
      movie_data: props.movie,
      status: movieStatus.value,
      rating: movieRating.value
    }
  }

  const { error } = await useFetch('/api/favorites', {
    method,
    body
  })

  if (!error.value) {
    await refreshFavorites()
  } else {
    console.error('Favorite toggle error:', error.value)
    errorMessage.value = 'Failed to update favorite. Please try again.'
  }

  pending.value = false
}
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else-if="!user">
    <RouterLink to="/login" class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700">
      Login to add to favorites
    </RouterLink>
  </div>

  <button v-else :class="[
    'rounded px-3 py-1 border text-sm transition',
    isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
  ]" @click="toggleFavorite" :disabled="pending || readOnly">
    <span v-if="pending">Saving...</span>
    <span v-else>
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </span>
  </button>

  <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
    {{ errorMessage }}
  </p>
  <div v-if="user && !readOnly" class="mt-2">
    <label>Status:</label>
    <select v-model="movieStatus" class="ml-2 text-black">
      <option value="plan_to_watch">Plan to Watch</option>
      <option value="watching">Watching</option>
      <option value="on_hold">On Hold</option>
      <option value="dropped">Dropped</option>
      <option value="watched">Watched</option>
    </select>
  </div>
  <div v-if="user && !readOnly" class="mt-2">
    <label>Rating:</label>
    <input v-model.number="movieRating" type="number" min="0" max="10" step="1" class="ml-2 w-16 text-black" />
  </div>
  <!-- Responsive Trailer -->
  <div v-if="trailerKey" class="mt-4 aspect-video w-full">
    <iframe
      class="w-full h-full"
      :src="`https://www.youtube.com/embed/${trailerKey}`"
      title="YouTube trailer"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>