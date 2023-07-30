<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ContentLine from './ContentLine.vue'

const index = ref(2)
const partIndex_2 = computed(() => {
  let i = index.value - 2
  if (i < 0) {
    return { hidden: true, part: 'hidden' }
  } else {
    return { part: parts[i], hidden: false }
  }
})

const partIndex_1 = computed(() => {
  let i = index.value - 1
  if (i < 0) {
    return { hidden: true, part: 'hidden' }
  } else {
    return { part: parts[i], hidden: false }
  }
})

const partIndex = computed(() => {
  return { part: parts[index.value], hidden: false }
})
const partIndex1 = computed(() => {
  let i = index.value + 1
  if (i > parts.length) {
    return { hidden: true, part: 'hidden' }
  } else {
    return { part: parts[i], hidden: false }
  }
})
const partIndex2 = computed(() => {
  let i = index.value + 2
  if (i > parts.length) {
    return { hidden: true, part: 'hidden' }
  } else {
    return { part: parts[i], hidden: false }
  }
})

const parts = [
  'Utilities for controlling the box shadow of an element.',
  'Use the shadow-inner utility to apply a subtle inset box shadow to an element.',
  'This can be useful for things like form controls or wells.',
  'Use shadow-none to remove an existing box shadow from an element.',
  'This is most commonly used to remove a shadow that was applied at a smaller breakpoint.',
  'Tailwind lets you conditionally apply utility classes in different states using variant modifiers.',
  'For example, use hover:shadow-lg to only apply the shadow-lg utility on hover.',
  'For a complete list of all available state modifiers, check out the Hover, Focus, & Other States documentation.',
  'You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more.',
  'For example, use md:shadow-lg to apply the shadow-lg utility at only medium screen sizes and above.'
]
</script>
<template>
  <div class="bg-white">
    <div class="mx-auto flex flex-col items-center text-center p-6 px-8 gap-x-12 max-w-6xl">
      <div
        class="text-1xl my-2 py-1 rounded-md text-white w-8/12"
        :class="{ 'bg-white': partIndex_2.hidden, 'bg-stone-500': !partIndex_2.hidden }"
      >
        {{ partIndex_2.part }}
      </div>

      <div
        class="text-2xl my-2 py-1 rounded-md text-white w-10/12"
        :class="{ 'bg-white': partIndex_1.hidden, 'bg-stone-500': !partIndex_1.hidden }"
      >
        {{ partIndex_1.part }}
      </div>
      <div
        class="text-4xl my-2 py-1 rounded-md text-white w-full"
        :class="{ 'bg-white': partIndex_1.hidden, 'bg-stone-500': !partIndex.hidden }"
      >
        {{ partIndex.part }}
      </div>
      <div class="text-2xl my-2 py-1 bg-stone-500 rounded-md text-white w-10/12">{{ partIndex1.part }}</div>
      <div class="text-1xl my-2 py-1 bg-stone-500 rounded-md text-white w-8/12 line-clamp-1">{{ partIndex2.part }}</div>
      <!-- <ContentLine v-for="part in parts" :line="part"></ContentLine> -->
    </div>
  </div>
</template>
<style scoped></style>
