<script setup lang="ts">
import { useVirtuosoStore } from '@/stores/virtuoso'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const store = useVirtuosoStore()
const router = useRouter()

const textInput = ref('')
function submit() {
  store.submit(textInput.value)
  router.push('/virtuoso')
}
</script>
<template>
  <div class="mx-auto w-800 h-96 py-10 relative" style="height: 42rem">
    <textarea
      class="border-2 border-cyan-600 p-1 rounded-md w-full h-full focus:border-cyan-400 focus-visible:border-cyan-400"
      style="resize: none"
      v-model="textInput"
    />
    <button class="absolute -right-24 bg-cyan-600 text-white rounded-md shadow-sm px-5 py-2" @click="submit">
      提交
    </button>
  </div>
</template>
<style scoped></style>
