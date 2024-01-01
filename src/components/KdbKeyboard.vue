<script setup lang="ts">
import { toRefs } from 'vue'
let props = defineProps(['event'])
let { event } = toRefs(props)
function isDown(char: string) {
  let isDown = event?.value?.key == char && event?.value?.type == 'keydown'
  return {
    'border-0': isDown,
    'bg-success': isDown
  }
}
</script>
<template>
  <div class="flex justify-center gap-1 my-1 w-full">
    <kbd class="kbd w-10" :class="isDown('Escape')">⎋</kbd>
    <kbd class="kbd w-8" :class="isDown('1')">1</kbd>
    <kbd class="kbd w-8" :class="isDown('2')">2</kbd>
    <kbd class="kbd w-8" :class="isDown('3')">3</kbd>
    <kbd class="kbd w-8" :class="isDown('4')">4</kbd>
    <kbd class="kbd w-8" :class="isDown('5')">5</kbd>
    <kbd class="kbd w-8" :class="isDown('6')">6</kbd>
    <kbd class="kbd w-8" :class="isDown('7')">7</kbd>
    <kbd class="kbd w-8" :class="isDown('8')">8</kbd>
    <kbd class="kbd w-8" :class="isDown('9')">9</kbd>
    <kbd class="kbd w-8" :class="isDown('0')">0</kbd>
    <kbd class="kbd w-8" :class="isDown('-')">-</kbd>
    <kbd class="kbd w-8" :class="isDown('=')">=</kbd>
    <kbd class="kbd w-14" :class="isDown('Backspace')">⌫</kbd>
  </div>
  <div class="flex justify-center gap-1 my-1 w-full">
    <kbd class="kbd w-14" :class="isDown('Tab')">⇥</kbd>
    <kbd class="kbd w-8" :class="isDown('q')">q</kbd>
    <kbd class="kbd w-8" :class="isDown('w')">w</kbd>
    <kbd class="kbd w-8" :class="isDown('e')">e</kbd>
    <kbd class="kbd w-8" :class="isDown('r')">r</kbd>
    <kbd class="kbd w-8" :class="isDown('t')">t</kbd>
    <kbd class="kbd w-8" :class="isDown('y')">y</kbd>
    <kbd class="kbd w-8" :class="isDown('u')">u</kbd>
    <kbd class="kbd w-8" :class="isDown('i')">i</kbd>
    <kbd class="kbd w-8" :class="isDown('o')">o</kbd>
    <kbd class="kbd w-8" :class="isDown('p')">p</kbd>
    <kbd class="kbd w-8" :class="isDown('[')">[</kbd>
    <kbd class="kbd w-8" :class="isDown(']')">]</kbd>
    <kbd class="kbd w-10" :class="isDown('\\')">\</kbd>
  </div>
  <div class="flex justify-center gap-1 my-1 w-full">
    <kbd class="kbd w-16" :class="isDown('Capslock')">⇪</kbd>
    <kbd class="kbd w-8" :class="isDown('a')">a</kbd>
    <kbd class="kbd w-8" :class="isDown('s')">s</kbd>
    <kbd class="kbd w-8" :class="isDown('d')">d</kbd>
    <kbd class="kbd w-8" :class="isDown('f')">f</kbd>
    <kbd class="kbd w-8" :class="isDown('g')">g</kbd>
    <kbd class="kbd w-8" :class="isDown('h')">h</kbd>
    <kbd class="kbd w-8" :class="isDown('j')">j</kbd>
    <kbd class="kbd w-8" :class="isDown('k')">k</kbd>
    <kbd class="kbd w-8" :class="isDown('l')">l</kbd>
    <kbd class="kbd w-8" :class="isDown(';')">;</kbd>
    <kbd class="kbd w-8" :class="isDown('\'')">'</kbd>
    <kbd class="kbd w-12" :class="isDown('Enter')">⏎</kbd>
  </div>
  <div class="flex justify-center gap-1.5 my-1 w-full">
    <kbd class="kbd w-24" :class="isDown('Shift')">⇧</kbd>
    <kbd class="kbd w-8" :class="isDown('z')">z</kbd>
    <kbd class="kbd w-8" :class="isDown('x')">x</kbd>
    <kbd class="kbd w-8" :class="isDown('c')">c</kbd>
    <kbd class="kbd w-8" :class="isDown('v')">v</kbd>
    <kbd class="kbd w-8" :class="isDown('b')">b</kbd>
    <kbd class="kbd w-8" :class="isDown('n')">n</kbd>
    <kbd class="kbd w-8" :class="isDown('m')">m</kbd>
    <kbd class="kbd w-8" :class="isDown(',')">,</kbd>
    <kbd class="kbd w-8" :class="isDown('.')">.</kbd>
    <kbd class="kbd w-8" :class="isDown('/')">/</kbd>
    <kbd class="kbd w-8" :class="isDown('ArrowUp')">▲</kbd>
    <kbd class="kbd w-8" :class="isDown('Shift')">⇧</kbd>
  </div>
  <div class="flex justify-center gap-1 my-1 w-full">
    <kbd class="kbd w-12" :class="isDown('Control')">⌃</kbd>
    <kbd class="kbd w-12" :class="isDown('Alt')">⌥</kbd>
    <kbd class="kbd w-12" :class="isDown('Meta')">⌘</kbd>
    <kbd class="kbd w-44" :class="isDown(' ')">␣</kbd>
    <kbd class="kbd w-9" :class="isDown('Meta')">⌘</kbd>
    <kbd class="kbd w-9" :class="isDown('Fn')">fn</kbd>
    <kbd class="kbd w-9" :class="isDown('Control')">⌃</kbd>
    <kbd class="kbd w-8" :class="isDown('ArrowLeft')">◀︎</kbd>
    <kbd class="kbd w-8" :class="isDown('ArrowDown')">▼</kbd>
    <kbd class="kbd w-8" :class="isDown('ArrowRight')">▶︎</kbd>
  </div>
</template>
<style scoped>
.kbd {
  font-family:
    Söhne,
    ui-sans-serif,
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    Ubuntu,
    Cantarell,
    'Noto Sans',
    sans-serif,
    'Helvetica Neue',
    Arial,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
  flex: 1 1 auto;
  min-height: 1.2em;
  min-width: 1.2em;
}
</style>
