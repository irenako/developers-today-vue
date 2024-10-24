<script lang="ts">
  export default {
    props: ['enableScroll', 'maxHeight']
  }
</script>

<template>
  <div>
    <h2 class="text-4xl"><slot name="heading"></slot></h2>
    <div :class="`mt-6 ${enableScroll ? `${maxHeight} md:max-h-screen overflow-scroll` : ''}`">
      <slot></slot>
    </div>
  </div>
</template>
