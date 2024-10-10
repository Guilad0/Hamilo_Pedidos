<script setup>
import { useRouter, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'

const router = useRouter();
</script>

<template>
  <div>
  <header>
    <Nav v-if="router.currentRoute.value.path != '/'"  />
  </header>

  <main class="container">
    <RouterView />

  </main>

  <footer>

  </footer>
  </div>
</template>

<style scoped>

</style>
