<script setup lang="ts">
import ContentLine from '@/components/ContentLine.vue'
import KdbKeyboard from '@/components/KdbKeyboard.vue'
import { useContentStore } from '@/stores/content'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useContentStore()
const event = ref<KeyboardEvent | {}>({})

onMounted(() => {
  document.addEventListener('keydown', keyHandle)
  document.addEventListener('keyup', keyHandle)
  console.log(`the component is now mounted.`)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyHandle)
  document.removeEventListener('keyup', keyHandle)
  console.log('the component is now unmounted')
})

function keyHandle(ev: KeyboardEvent) {
  ev.preventDefault()
  event.value = ev
  if (ev.type == 'keydown') {
    store.inputChar(ev.key)
  }
}
</script>
<template>
  <div>
    <div class="w-screen">
      <main class="container mx-auto flex flex-col h-screen">
        <div class="py-2 invisible"><button class="btn">sitg</button></div>
        <div class="py-4 grow">
          <ContentLine :event="event"></ContentLine>
        </div>
        <div class="py-2 invisible">
          <KdbKeyboard></KdbKeyboard>
        </div>
      </main>
    </div>
  </div>
  <div class="fixed bottom-0 left-0 w-screen bg-base-200">
    <div class="container max-w-xl mx-auto py-2">
      <KdbKeyboard :event="event"></KdbKeyboard>
    </div>
  </div>
</template>
<style scoped></style>
