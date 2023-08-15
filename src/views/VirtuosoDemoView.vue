<script setup lang="ts">
import { useVirtuosoStore } from '@/stores/virtuoso'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useVirtuosoStore()

const event = ref<KeyboardEvent | {}>({})

onMounted(() => {
  document.addEventListener('keydown', keyHandle)
  console.log(`the component is now mounted.`)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyHandle)
  console.log('the component is now unmounted')
})

function keyHandle(ev: KeyboardEvent) {
  event.value = ev
  store.inputChar(ev.key)
}
</script>
<template>
  <div class="mx-auto w-800 h-96 py-10 relative">
    <!-- <div><button class="bg-cyan-600 text-white rounded-md shadow-sm px-5 py-2 my-1" @click="">Space</button></div> -->
    <div class="p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm">
      {{ store.virtuoso }}
    </div>
    <div class="mt-4 p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm">
      {{ store.currentWord() }}
    </div>
    <div class="mt-4 p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm">
      {{ store.currentChar() }}
    </div>

    <div class="mt-4 p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm" :hidden="!store.compWord">
      {{ store.compWord }}
    </div>
  </div>
</template>
<style scoped></style>
