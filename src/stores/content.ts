import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

interface Store {
  raw: string
  lines: string[]
  words: string[]
  chars: string
  lineIndex: number
  wordIndex: number
  charIndex: number
  currentLineCharIndex: number
}

enum InputResp {
  CharInc,
  WordInc,
  LineInc,
  NoMatch
}

export const useContentStore = defineStore('content', () => {
  const store = reactive<Store>({
    raw: '',
    lines: [],
    words: [],
    chars: '',
    lineIndex: 0,
    wordIndex: 0,
    charIndex: 0,
    currentLineCharIndex: 0
  })
  const compWord = ref('')

  function currentLine() {
    return store.lines[store.lineIndex]
  }
  function currentWord() {
    return store.words[store.wordIndex]
  }

  function currentChar() {
    return store.chars[store.charIndex]
  }

  function inputChar(input: string): InputResp {
    if (input === 'Enter' && currentChar() === '\n') {
      incIndex()
      return InputResp.LineInc
    } else if (input === ' ' && currentChar() == ' ') {
      incIndex()
      return InputResp.WordInc
    } else if (input == currentChar()) {
      incIndex()
      return InputResp.CharInc
    } else {
      return InputResp.NoMatch
    }
  }

  function incIndex() {
    let char = currentChar()
    if (char === '\n') {
      store.lineIndex += 1
      store.wordIndex += 1
      store.currentLineCharIndex = 0
    } else {
      store.currentLineCharIndex += 1
    }
    if (char === ' ') {
      store.wordIndex += 1
    }

    store.charIndex += 1
  }

  function submit(raw: string) {
    clear()
    store.raw = raw
    let lines = splitLine(raw)
    for (let [i, line] of lines.entries()) {
      let words = splitWord(line)
      let newLine = ''
      store.words = store.words.concat(words)
      for (let [u, word] of words.entries()) {
        if (u != 0) {
          newLine = newLine + ' ' + word
        } else {
          newLine = newLine + word
        }
      }
      console.log('newLine', newLine)
      store.lines.push(newLine)
      if (i != 0) {
        store.chars += '\n' + newLine
      } else {
        store.chars += newLine
      }
    }
    console.log(store)
  }

  function clear() {
    store.raw = ''
    store.lines = []
    store.words = []
    store.chars = ''
    store.lineIndex = 0
    store.wordIndex = 0
    store.charIndex = 0
  }

  function splitLine(str: string) {
    const sentences = str.split(/[\.\n]/g)
    return sentences.filter((i) => i.trim().length > 0)
  }

  function splitWord(str: string) {
    const words = str.split(/ /g)
    return words.filter((i) => i.trim().length > 0)
  }

  return {
    store,
    submit,
    currentLine,
    currentWord,
    currentChar,
    inputChar,
    compWord
  }
})
