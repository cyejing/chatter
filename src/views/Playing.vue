<script setup lang="ts">
import Content from '@/components/Content.vue'
import Kdb from '@/components/Kdb.vue'
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
    <Content :event="event"></Content>
  </main>
  <div class="absolute bottom-0 left-0 w-screen bg-gray-500">
    <div class="container mx-auto py-2">
      <Kdb></Kdb>
    </div>
  </div>
</template>
<style scoped></style>
