<script setup lang="ts">
import { useContentStore } from '@/stores/content'

defineProps(['event'])

const store = useContentStore()

function isCurrentLine(lineIndex: number) {
  return store.store.lineIndex == lineIndex
}

function isLinePassed(lineIndex: number) {
  return {
    'bg-base-300': store.store.lineIndex == lineIndex
  }
}
function isWordPassed(lineIndex: number, wordIndex: number) {
  return {
    'text-success':
      store.store.lineIndex == lineIndex &&
      store.store.lineWordIndex - 1 >= wordIndex,
    'tooltip-open':
      store.currentWordEnd() && store.store.lineWordIndex == wordIndex
  }
}
function isCharPassed(
  lineIndex: number,
  wordIndex: number,
  charIndex: number,
  char: string
) {
  let isCurrentWord =
    store.store.lineIndex == lineIndex && store.store.lineWordIndex == wordIndex
  let isCurrentChar = charIndex == store.store.lineWordCharIndex

  return {
    'text-secondary': isCurrentWord && isCurrentChar,
    'text-success':
      isCurrentWord && store.store.lineWordCharIndex - 1 >= charIndex,
    'text-base-content':
      isCurrentWord && store.store.lineWordCharIndex + 1 <= charIndex,
    char: isCurrentWord && store.currentChar() == '\n' ? '⏎' : char
  }
}

function isWordEnd(lineIndex: number, wordIndex: number) {
  let isWordEnd =
    store.currentWordEnd() &&
    store.store.lineIndex == lineIndex &&
    store.store.lineWordIndex == wordIndex
  return {
    'text-secondary': isWordEnd,
    char: isWordEnd ? '␣' : ' '
  }
}
function mainTop() {
  let offest = 3 - store.store.lineIndex
  return {
    top: offest * 2 + 'em'
  }
}
function transTip(word: string) {
  if (word == store.currentWord()) {
    let trans = store.store.translateWords[store.store.wordIndex]
    return trans ? trans : '查询中...'
  } else {
    return '查询中...'
  }
}
</script>
<template>
  <div class="relative w-full h-full overflow-hidden">
    <div
      class="text-center absolute w-full leading-8 text-lg/8"
      :style="mainTop()"
    >
      <p
        v-for="(line, x) in store.store.lineWords"
        :key="x"
        :class="isLinePassed(x)"
      >
        <template v-if="isCurrentLine(x)" v-for="(word, y) in line" :key="y">
          <span
            class="tooltip tooltip-bottom inline"
            :data-tip="transTip(word)"
            :class="isWordPassed(x, y)"
          >
            <span
              v-for="(char, z) in word"
              :key="char"
              :class="isCharPassed(x, y, z, char)"
              >{{ isCharPassed(x, y, z, char).char }}</span
            >
            <span :class="isWordEnd(x, y)">{{ isWordEnd(x, y).char }}</span>
          </span>
        </template>
        <span v-else class="opacity-50"> {{ store.store.lines[x] }} </span>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
