<script lang="ts">
export default {
  props: ['name', 'code'],
}
</script>

<template>
  <div
    class="transition ease-in-out rounded overflow-hidden shadow-lg my-4 text-blue-500 bg-white hover:bg-blue-500 hover:text-white  "
  >
    <a :href="`/country/${code}`"
      ><h3 class="p-4 text-lg">{{ name }}</h3></a
    >
  </div>
</template>
