<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'

const store = useContentStore()
const router = useRouter()

const textInput = ref(
  'Tailwind CSS works by scanning all of your HTML files. JavaScript components. and any other templates for class names. generating the corresponding styles and then writing them to a static CSS file. Its fast, flexible, and reliable — with zero-runtime.'
)

function submit() {
  store.submit(textInput.value)
  router.push('/playing')
}
</script>
<template>
  <div class="w-screen">
    <main class="container mx-auto px-8 h-screen flex flex-col">
      <div class="py-2 invisible"><button class="btn">sitg</button></div>
      <div class="py-6 grow">
        <textarea
          class="textarea textarea-bordered resize-none w-full h-full text-lg"
          v-model="textInput"
          placeholder="输入待翻译的文本"
        ></textarea>
      </div>
      <div class="invisible"><button class="btn">sitg</button></div>
    </main>
  </div>
  <div class="absolute bottom-0 left-0 w-screen bg-base-200">
    <div class="container mx-auto px-8 py-2 flex justify-end">
      <button class="btn btn-primary btn-sm btn-block" @click="submit">
        提交
      </button>
    </div>
  </div>
</template>
<style scoped></style>
