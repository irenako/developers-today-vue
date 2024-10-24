<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      year: new Date().getFullYear() as number
    }
  },
})
</script>

<template>
  <div class="flex py-8 items-center justify-center">
    <p>
      &copy; {{ year }}
      <a
        href="https://irena-koval-portfolio.netlify.app/"
        alt="Irena Koval Portfolio"
        class="text-blue-500"
        >irenako</a
      >. All rights reserved.
    </p>
  </div>
</template>
