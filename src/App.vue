<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './layout/HeaderMain.vue'
import Footer from './layout/FooterMain.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
