import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

interface Virtuoso {
  content: string
  sentences: string[][]
  sentenceIndex: number
  wordIndex: number
  charIndex: number
}

export const useVirtuosoStore = defineStore(
  'virtuoso',
  () => {
    const virtuoso = reactive<Virtuoso>({
      content: '',
      sentences: [],
      sentenceIndex: 0,
      wordIndex: 0,
      charIndex: 0
    })
    const compWord = ref('')

    function currentWord() {
      let s = virtuoso.sentences[virtuoso.sentenceIndex]
      if (s) {
        return s[virtuoso.wordIndex]
      }
    }

    function currentChar() {
      let word = currentWord()
      if (word) {
        return word[virtuoso.charIndex]
      }
    }

    function inputChar(char: string) {
      if (char == currentChar()) {
        incIndex()
      } else if (compWord.value && char == ' ') {
        incIndex()
      }
    }

    function incIndex() {
      let word = currentWord()
      if (!word) {
        console.log('inc end')
        return
      }

      // word end
      if (virtuoso.charIndex >= word.length) {
        compWord.value = ''
        let s = virtuoso.sentences[virtuoso.sentenceIndex]
        // sentence end
        if (s && virtuoso.wordIndex + 1 >= s.length) {
          // virtuoso end
          if (virtuoso.sentenceIndex + 1 >= virtuoso.sentences.length) {
            virtuoso.sentenceIndex += 1
            virtuoso.wordIndex = 0
            virtuoso.charIndex = 0
            console.log('sentences is end')
          } else {
            virtuoso.sentenceIndex += 1
            virtuoso.wordIndex = 0
            virtuoso.charIndex = 0
          }
        } else {
          virtuoso.wordIndex += 1
          virtuoso.charIndex = 0
        }
      } else {
        virtuoso.charIndex += 1
        if (virtuoso.charIndex >= word.length) {
          compWord.value = word
        }
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
      virtuoso.charIndex = 0
    }

    function splitContent(str: string) {
      let sentences = str.split(/[\.\n]/g)
      return sentences.filter((i) => i.trim().length > 0)
    }

    function splitSentence(str: string) {
      let words = str.split(/ /g)
      return words.filter((i) => i.trim().length > 0)
    }
    return { virtuoso, submit, currentWord, currentChar, inputChar, compWord }
  },
  { persist: true }
)
