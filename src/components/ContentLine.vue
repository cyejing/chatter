<script setup lang="ts">
import { useContentStore } from '@/stores/content'

defineProps(['event'])

const store = useContentStore()
const isLinePassed = function (lineIndex: number) {
  return {
    'text-neutral': store.store.lineIndex - 1 >= lineIndex
  }
}
const isLineCharPassed = function (lineIndex: number, charIndex: number) {
  if (
    lineIndex == store.store.lineIndex &&
    charIndex == store.store.currentLineCharIndex
  ) {
    return {
      'text-secondary': true
    }
  } else if (
    lineIndex == store.store.lineIndex &&
    charIndex <= store.store.currentLineCharIndex - 1
  ) {
    return {
      'text-success': true
    }
  } else {
    return {}
  }
}
</script>
<template>
  <div class="text-center pt-4">
    <template v-for="(line, i) in store.store.lines" :key="line">
      <p :class="isLinePassed(i)">
        <template v-for="(char, u) in line" :key="char">
          <span :class="isLineCharPassed(i, u)">{{ char }}</span>
        </template>
      </p>
    </template>
    <p>{{ event.key }}</p>
  </div>
</template>
<style scoped></style>
