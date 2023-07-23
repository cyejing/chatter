<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const conter = useCounterStore()
</script>
<template>
  <div class="mx-auto w-800 h-screen py-10 relative">
    <textarea
      class="border-2 border-cyan-600 p-1 rounded-md w-full h-full focus:border-cyan-400 focus-visible:border-cyan-400"
      style="resize: none"
    />
    <button class="absolute -right-24 bg-cyan-600 text-white rounded-md shadow-sm px-5 py-2" @click="conter.increment">
      提交 {{ conter.doubleCount }}
    </button>
  </div>
</template>
<style scoped></style>
