<script setup lang="ts">
import ContentLine from '@/components/ContentLine.vue'
import KdbKeyboard from '@/components/KdbKeyboard.vue'
import { useContentStore } from '@/stores/content'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useContentStore()
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
  <main class="container mx-auto flex flex-col h-screen">
    <ContentLine :event="event"></ContentLine>
  </main>
  <div class="absolute bottom-0 left-0 w-screen bg-gray-500">
    <div class="container mx-auto py-2">
      <KdbKeyboard></KdbKeyboard>
    </div>
  </div>
</template>
<style scoped></style>
