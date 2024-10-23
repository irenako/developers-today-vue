<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
</script>

<template>
  <header class="flex flex-col gap-6 md:gap-0 md:flex-row justify-between py-4 px-8 items-center">
    <a href="/" class="flex items-center gap-4">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/countries-logo.png"
        width="100"
        height="100"
      />
      <h1 class="text-2xl">Countries Info</h1>
    </a>

    <!-- <HelloWorld msg="You did it!" /> -->

    <nav class="flex gap-4">
      <RouterLink to="/" custom v-slot="{ isActive, href, navigate }">
        <a
          :href="href"
          @click="navigate"
          :class="{ 'text-blue-500': isActive, 'text-gray-500': !isActive }"
        >
          Home
        </a>
      </RouterLink>

      <RouterLink to="/about" custom v-slot="{ isActive, href, navigate }">
        <a
          :href="href"
          @click="navigate"
          :class="{ 'text-blue-500': isActive, 'text-gray-500': !isActive }"
        >
          About
        </a>
      </RouterLink>
    </nav>
  </header>
</template>
