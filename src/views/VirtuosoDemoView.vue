<script setup lang="ts">
import { useVirtuosoStore } from '@/stores/virtuoso'

const store = useVirtuosoStore()
</script>
<template>
  <div class="mx-auto w-800 h-96 py-10 relative">
    <div><button class="bg-cyan-600 text-white rounded-md shadow-sm px-5 py-2 my-1" @click="">Space</button></div>
    <div>
      {{ store.virtuoso }}
    </div>
    <div class="mt-2">
      {{ store.currentWord() }}
    </div>
    <div class="mt-2">
      {{ store.currentLetter() }}
    </div>
  </div>
</template>
<style scoped></style>
