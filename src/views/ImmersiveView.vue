<script setup lang="ts">
import ImmersiveKeyboard from '../components/ImmersiveKeyboard.vue'
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
  <ImmersiveKeyboard :event="event"></ImmersiveKeyboard>
</template>
<style scoped></style>
