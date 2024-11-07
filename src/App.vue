<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
</script>

<template>
  <main>
    <Toast class="w-10rem max-w-90%"></Toast>
    <RouterView />
  </main>
</template>

<style scoped></style>
