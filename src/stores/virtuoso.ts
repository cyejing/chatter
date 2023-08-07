import { ref, computed, reactive, Ref } from 'vue'
import { defineStore } from 'pinia'

interface Virtuoso {
  content: string
  sentences: string[][]
  sentenceIndex: number
  wordIndex: number
  letterIndex: number
}

export const useVirtuosoStore = defineStore(
  'virtuoso',
  () => {
    const virtuoso = reactive<Virtuoso>({
      content: '',
      sentences: [],
      sentenceIndex: 0,
      wordIndex: 0,
      letterIndex: 0
    })

    function currentWord() {
      let s = virtuoso.sentences[virtuoso.sentenceIndex]
      if (s) {
        return s[virtuoso.wordIndex]
      }
    }

    function currentLetter() {
      let word = currentWord()
      if (word) {
        return word[virtuoso.letterIndex]
      }
    }

    function submit(contentStr: string) {
      clear()
      virtuoso.content = contentStr
      let sentencesTmp = splitContent(contentStr)
      for (let i in sentencesTmp) {
        let words = splitSentence(sentencesTmp[i])
        virtuoso.sentences[i] = words
      }
    }

    function clear() {
      virtuoso.content = ''
      virtuoso.sentences = []
      virtuoso.sentenceIndex = 0
      virtuoso.wordIndex = 0
      virtuoso.letterIndex = 0
    }

    function splitContent(str: string) {
      return str.split('.')
    }

    function splitSentence(str: string) {
      return str.split(' ')
    }
    return { virtuoso, submit, currentWord, currentLetter }
  },
  { persist: { enabled: true } }
)
