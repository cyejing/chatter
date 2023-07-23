<script setup lang="ts"></script>
<template>
  <header class="border-b-gray-100 border-b-2">
    <nav class="mx-auto flex max-w-7xl items-center justify-start p-6 px-8 gap-x-12" aria-label="Global">
      <div class="flex flex-initial">
        <RouterLink to="/" class="-m-1.5 p-1.5">Chatter</RouterLink>
      </div>
      <div class="flex gap-x-12">
        <div class="text-sm font-semibold leading-6 text-gray-900">
          <RouterLink to="/playing">Playing</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped></style>
