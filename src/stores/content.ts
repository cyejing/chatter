import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', () => {
  const origin_content = ref('')

  function submit(str: string) {
    origin_content.value = str
  }

  return { origin_content, submit }
})
