<script setup lang="ts">
import { useContentStore } from '@/stores/content'

defineProps(['event'])

const store = useContentStore()
const isLinePassed = function (lineIndex: number) {
  return {
    'text-red-100': store.store.lineIndex - 1 >= lineIndex
  }
}
const isLineCharPassed = function (lineIndex: number, charIndex: number) {
  if (
    lineIndex == store.store.lineIndex &&
    charIndex == store.store.currentLineCharIndex
  ) {
    return {
      'text-red-500': true
    }
  } else if (
    lineIndex == store.store.lineIndex &&
    charIndex <= store.store.currentLineCharIndex - 1
  ) {
    return {
      'text-red-100': true
    }
  } else {
    return {}
  }
}
</script>
<template>
  <div class="text-center">
    <template v-for="(line, i) in store.store.lines">
      <p :class="isLinePassed(i)">
        <template v-for="(char, u) in line">
          <span :class="isLineCharPassed(i, u)">{{ char }}</span>
        </template>
      </p>
    </template>
    <p>{{ event.key }}</p>
  </div>
</template>
<style scoped></style>
