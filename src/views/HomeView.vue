<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'

const store = useContentStore()
const router = useRouter()

// const textInput = ref('hello world\nni hao bob')
const textInput = ref(
  'Provident cupiditate voluptatem et in. Quaerat fugiat, ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. '
)
function submit() {
  store.submit(textInput.value)
  router.push('/playing')
}
</script>
<template>
  <main class="container mx-auto px-8 h-screen flex flex-col">
    <div class="pt-6 pb-8 grow">
      <textarea
        class="textarea textarea-bordered resize-none w-full h-full"
        v-model="textInput"
        placeholder="输入待翻译的文本"
      ></textarea>
    </div>
    <div class="py-2 invisible"><button class="btn">sitg</button></div>
  </main>
  <div class="absolute bottom-0 left-0 w-screen bg-gray-500">
    <div class="container mx-auto px-8 py-2 flex justify-end">
      <button class="btn btn-sm btn-block" @click="submit">提交</button>
    </div>
  </div>
</template>
<style scoped></style>
