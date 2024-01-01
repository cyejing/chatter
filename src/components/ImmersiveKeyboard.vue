<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

const props = defineProps(['event'])

interface KeyState {
  state: Ref<string>
  keyStr: string
  keyCode: number
}

watch(props, (ev) => {
  console.log('key:', ev.event.key, ', keyCode:', ev.event.keyCode, ev.event)
  let keyState = keyMap[ev.event.keyCode]
  if (keyState == undefined) {
    keyState = keyMap[ev.event.keyCode + ev.event.code]
  }
  if (keyState != undefined) {
    keyState.state.value = ev.event.type
  }
})

function isKeydown(keyState: KeyState | undefined) {
  return keyState != undefined && keyState.state.value === 'keydown'
}

const normal_key_width = '57px;'
const last_margin = '15px;'
const keys = [
  {
    keyState: { state: ref(''), keyStr: 'esc', keyCode: 27 },
    key: 'esc',
    style: 'margin-top:0; margin-left:0; width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '1', keyCode: 49 },
    key: '1&nbsp;&nbsp;!',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 50 },
    key: '2&nbsp;&nbsp;@',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 51 },
    key: '3&nbsp;&nbsp;#',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 52 },
    key: '4&nbsp;&nbsp;$',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 53 },
    key: '5&nbsp;&nbsp;%',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 54 },
    key: '6&nbsp;&nbsp;^',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 55 },
    key: '7&nbsp;&nbsp;&',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 56 },
    key: '8&nbsp;&nbsp;*',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 57 },
    key: '9&nbsp;&nbsp;(',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 48 },
    key: '0&nbsp;&nbsp;)',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 189 },
    key: '-&nbsp;&nbsp;_',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 187 },
    key: '=&nbsp;&nbsp;+',
    style: 'margin-top:0;width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 8 },
    key: 'delete',
    style: 'margin-top:0;width: 88px'
  },
  {
    keyState: { state: ref(''), keyStr: '2', keyCode: 9 },
    key: 'tab',
    style: 'margin-left:0; width: 88px'
  },
  {
    keyState: { state: ref(''), keyStr: 'q', keyCode: 81 },
    key: 'Q',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 87 },
    keyStr: 'w',
    key: 'W',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 69 },
    key: 'E',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 82 },
    key: 'R',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 84 },
    key: 'T',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 89 },
    key: 'Y',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 85 },
    key: 'U',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 73 },
    key: 'I',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 79 },
    key: 'O',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 80 },
    key: 'P',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 219 },

    key: '[&nbsp;&nbsp;{',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 221 },
    key: ']&nbsp;&nbsp;}',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'w', keyCode: 220 },
    key: '\\&nbsp;&nbsp;|',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'CapsLock', keyCode: 20 },
    key: 'caps lock',
    style: 'margin-left:0; width:108px'
  },
  {
    keyState: { state: ref(''), keyStr: 'a', keyCode: 65 },
    key: 'A',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 's', keyCode: 83 },
    key: 'S',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 68 },
    key: 'D',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 70 },
    key: 'F',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 71 },
    key: 'G',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 72 },
    key: 'H',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 74 },
    key: 'J',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 75 },
    key: 'K',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 76 },
    key: 'L',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 186 },
    key: ';&nbsp;&nbsp;:',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 222 },
    key: '\'&nbsp;&nbsp;"',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'd', keyCode: 13 },
    key: 'return',
    style: 'width: 108px'
  },
  {
    keyState: {
      state: ref(''),
      keyStr: 'd',
      keyCode: 16,
      codeStr: 'ShiftLeft'
    },
    key: 'shift',
    style: 'margin-left:0;width: 147px'
  },
  {
    keyState: { state: ref(''), keyStr: 'z', keyCode: 90 },
    key: 'Z',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'x', keyCode: 88 },
    key: 'X',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'c', keyCode: 67 },
    key: 'C',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'v', keyCode: 86 },
    key: 'V',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'b', keyCode: 66 },
    key: 'B',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'n', keyCode: 78 },
    key: 'N',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 77 },
    key: 'M',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 188 },
    key: ',&nbsp;&nbsp;<',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 190 },
    key: '.&nbsp;&nbsp;>',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 191 },
    key: '/&nbsp;&nbsp;?',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 38 },
    key: '↑',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: {
      state: ref(''),
      keyStr: 'm',
      keyCode: 16,
      codeStr: 'ShiftRight'
    },
    key: 'shift',
    style: 'margin-left:' + last_margin + 'width: ' + normal_key_width
  },
  {
    keyState: {
      state: ref(''),
      keyStr: 'm',
      keyCode: 17,
      codeStr: 'ControlLeft'
    },
    key: 'ctrl',
    style: 'margin-left:0; width: 65px'
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 18, codeStr: 'AltLeft' },
    key: 'opt',
    style: 'width: 65px'
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 91, codeStr: 'MetaLeft' },
    key: 'cmd',
    style: 'width: 70px'
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 32 },
    key: 'space',
    style: 'width: 364px'
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 18, codeStr: 'AltRight' },
    key: 'alt',
    style: 'width: 50px'
  },
  { key: 'fn', style: 'width: 50px' },
  {
    keyState: {
      state: ref(''),
      keyStr: 'm',
      keyCode: 17,
      codeStr: 'ControlRight'
    },
    key: 'ctrl',
    style: 'width: 50px'
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 37 },
    key: '←',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 40 },
    key: '↓',
    style: 'width: ' + normal_key_width
  },
  {
    keyState: { state: ref(''), keyStr: 'm', keyCode: 39 },
    key: '→',
    style: 'width: ' + normal_key_width
  }
]

const keyMap: { [index: string]: KeyState } = {}
for (let key of keys) {
  if (key.keyState) {
    let keyIndex
    if (key.keyState.codeStr) {
      keyIndex = key.keyState.keyCode + key.keyState.codeStr
    } else {
      keyIndex = key.keyState.keyCode
    }
    keyMap[keyIndex] = key.keyState
  }
}
</script>
<template>
  <div class="fixed w-full bg-neutral-100 bottom-0 text-black">
    <div class="keyboard">
      <div
        v-for="k in keys"
        class="key"
        :class="{ keydown: isKeydown(k.keyState) }"
        :style="k.style"
        :key="k.key"
      >
        <span class="noselect" v-html="k.key"></span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.keyboard-wrap {
  background-color: #f0f0f0;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.keyboard {
  @apply bg-neutral-300 ring-4 ring-neutral-400;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 1027px;
  height: 323px;
  padding: 5px 8px;
  margin: 2rem auto;
  border-radius: 0.4rem;
  align-content: flex-start;
  font-size: 14px;
}

.key {
  @apply bg-neutral-100 border-2 border-neutral-100 shadow-md shadow-neutral-700;
  text-align: center;
  height: 55px;
  padding-top: 5px;
  margin-left: 14px;
  margin-top: 9px;
  border-radius: 0.2rem;
}

.keydown {
  @apply shadow-sm shadow-neutral-700;
}
</style>
