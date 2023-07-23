<script setup lang="ts">
const normal_key_width = '57px;'
const last_margin = '15px;'
const keys = [
  { key: 'esc', style: 'margin-top:0; margin-left:0; width: ' + normal_key_width },
  { key: '1&nbsp;&nbsp;!', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '2&nbsp;&nbsp;@', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '3&nbsp;&nbsp;#', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '4&nbsp;&nbsp;$', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '5&nbsp;&nbsp;%', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '6&nbsp;&nbsp;^', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '7&nbsp;&nbsp;&', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '8&nbsp;&nbsp;*', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '9&nbsp;&nbsp;(', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '0&nbsp;&nbsp;)', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '-&nbsp;&nbsp;_', style: 'margin-top:0;width: ' + normal_key_width },
  { key: '=&nbsp;&nbsp;+', style: 'margin-top:0;width: ' + normal_key_width },
  { key: 'delete', style: 'margin-top:0;width: 88px' },
  { key: 'tab', style: 'margin-left:0; width: 88px' },
  { key: 'Q', style: 'width: ' + normal_key_width },
  { key: 'W', style: 'width: ' + normal_key_width },
  { key: 'E', style: 'width: ' + normal_key_width },
  { key: 'R', style: 'width: ' + normal_key_width },
  { key: 'T', style: 'width: ' + normal_key_width },
  { key: 'Y', style: 'width: ' + normal_key_width },
  { key: 'U', style: 'width: ' + normal_key_width },
  { key: 'I', style: 'width: ' + normal_key_width },
  { key: 'O', style: 'width: ' + normal_key_width },
  { key: 'P', style: 'width: ' + normal_key_width },
  { key: '[&nbsp;&nbsp;{', style: 'width: ' + normal_key_width },
  { key: ']&nbsp;&nbsp;}', style: 'width: ' + normal_key_width },
  { key: '\\&nbsp;&nbsp;|', style: 'width: ' + normal_key_width },
  { key: 'caps lock', style: 'margin-left:0; width:108px' },
  { key: 'A', style: 'width: ' + normal_key_width },
  { key: 'S', style: 'width: ' + normal_key_width },
  { key: 'D', style: 'width: ' + normal_key_width },
  { key: 'F', style: 'width: ' + normal_key_width },
  { key: 'G', style: 'width: ' + normal_key_width },
  { key: 'H', style: 'width: ' + normal_key_width },
  { key: 'J', style: 'width: ' + normal_key_width },
  { key: 'K', style: 'width: ' + normal_key_width },
  { key: 'L', style: 'width: ' + normal_key_width },
  { key: ';&nbsp;&nbsp;:', style: 'width: ' + normal_key_width },
  { key: '\'&nbsp;&nbsp;"', style: 'width: ' + normal_key_width },
  { key: 'return', style: 'width: 108px' },
  { key: 'shift', style: 'margin-left:0;width: 147px' },
  { key: 'Z', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'X', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'C', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'V', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'B', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'N', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'M', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: ',&nbsp;&nbsp;<', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: '.&nbsp;&nbsp;>', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: '/&nbsp;&nbsp;?', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: '↑', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'shift', style: 'margin-left:' + last_margin + 'width: ' + normal_key_width },
  { key: 'ctrl', style: 'margin-left:0; width: 65px' },
  { key: 'opt', style: 'width: 65px' },
  { key: 'cmd', style: 'width: 70px' },
  { key: 'space', style: 'width: 364px' },
  { key: 'alt', style: 'width: 50px' },
  { key: 'fn', style: 'width: 50px' },
  { key: 'ctrl', style: 'width: 50px' },
  { key: '←', style: 'width: ' + normal_key_width },
  { key: '↓', style: 'width: ' + normal_key_width },
  { key: '→', style: 'width: ' + normal_key_width }
]
</script>
<template>
  <div class="fixed w-full bg-neutral-100 bottom-0">
    <div class="keyboard">
      <div v-for="k in keys" class="key" :style="k.style">
        <span class="noselect" v-html="k.key"></span>
      </div>
    </div>
  </div>
</template>
<style>
html {
  font-size: 22px;
}
</style>
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
  /* background-color: #ebebeb; */
  @apply bg-neutral-100 shadow-md shadow-neutral-700;
  text-align: center;
  height: 55px;
  padding-top: 5px;
  margin-left: 14px;
  margin-top: 9px;
  border-radius: 0.2rem;
}
</style>
