import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { translate } from '@/api/index'

interface Store {
  raw: string
  lineWords: string[][]
  lines: string[]
  words: string[]
  translateWords: string[]
  chars: string
  lineIndex: number
  wordIndex: number
  charIndex: number
  lineWordIndex: number
  lineWordCharIndex: number
}

enum InputResp {
  CharInc,
  WordInc,
  LineInc,
  SkipInc,
  NoMatch
}

export const useContentStore = defineStore('content', () => {
  const store = reactive<Store>({
    raw: '',
    lineWords: [],
    lines: [],
    words: [],
    translateWords: [],
    chars: '',
    lineIndex: 0,
    wordIndex: 0,
    charIndex: 0,
    lineWordIndex: 0,
    lineWordCharIndex: 0
  })
  function clear() {
    store.raw = ''
    store.lineWords = []
    store.lines = []
    store.words = []
    store.translateWords = []
    store.chars = ''
    store.lineIndex = 0
    store.wordIndex = 0
    store.charIndex = 0
    store.lineWordIndex = 0
    store.lineWordCharIndex = 0
  }

  function currentWord() {
    return store.words[store.wordIndex]
  }

  function currentChar() {
    return store.chars[store.charIndex]
  }

  function currentWordEnd() {
    return (
      store.lineWords[store.lineIndex][store.lineWordIndex].length ==
      store.lineWordCharIndex
    )
  }

  function currentLineEnd() {
    return store.lineWords[store.lineIndex].length == store.lineWordIndex
  }

  function inputChar(input: string): InputResp {
    if (input === 'Escape') {
      incIndex()
      return InputResp.SkipInc
    } else if (input === 'Enter' && currentChar() === '\n') {
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
    const char = currentChar()
    if (char === '\n') {
      if (store.lineIndex + 1 == store.lines.length) {
        console.log('content end')
        return
      }
      store.lineIndex += 1
      store.wordIndex += 1
      translateWord(store.wordIndex + 5)
      store.lineWordIndex = 0
      store.lineWordCharIndex = 0
    } else if (char === ' ') {
      store.wordIndex += 1
      translateWord(store.wordIndex + 5)
      store.lineWordIndex += 1
      store.lineWordCharIndex = 0
    } else {
      store.lineWordCharIndex += 1
    }

    store.charIndex += 1
  }

  function translateWord(wordIndex: number) {
    if (wordIndex > store.words.length) {
      return
    }
    let word = store.words[wordIndex]
    translate({
      q: word,
      to: 'zh-cn',
      provider: 'google'
    }).then((r) => {
      if (r) {
        let trans = r.trans
        console.log('translate: ', word, ' => ', trans)
        store.translateWords[wordIndex] = trans
      }
    })
  }

  function submit(raw: string) {
    clear()
    store.raw = raw
    let lines = splitLine(raw)
    for (let line of lines) {
      let words = splitWord(line)
      let newLine = ''
      for (let word of words) {
        newLine = newLine + word + ' '
      }
      newLine += '\n'
      words.push('\n')

      store.lines.push(newLine)
      store.chars += newLine
      store.words = store.words.concat(words)
      store.lineWords.push(words)
    }

    for (let i = 0; i <= 5; i++) {
      translateWord(i)
    }
  }

  function splitLine(str: string) {
    const lines = str.split(/[.\n]/g)
    return lines.filter((i) => i.trim().length > 0)
  }

  function splitWord(str: string) {
    const words = str.split(/ /g)
    return words.filter((i) => i.trim().length > 0)
  }

  return {
    store,
    submit,
    currentWord,
    currentChar,
    currentWordEnd,
    currentLineEnd,
    inputChar
  }
})
