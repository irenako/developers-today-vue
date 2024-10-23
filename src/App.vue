<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
</script>

<template>
  <Header />

  <RouterView />
  <Footer />
</template>
