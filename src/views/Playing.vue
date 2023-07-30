<script setup lang="ts">
import Keyboard from '../components/Keyboard.vue'
import ContentDisplay from '../components/ContentDisplay.vue'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

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
  event.value = ev
}
</script>
<template>
  <ContentDisplay :event="event"></ContentDisplay>
  <Keyboard :event="event"></Keyboard>
</template>
<style scoped></style>
