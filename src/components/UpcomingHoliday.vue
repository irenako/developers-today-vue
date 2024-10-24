<script lang="ts">
import moment from 'moment'
import HolidayFeature from './HolidayFeature.vue'

export default {
  props: ['holiday', 'countryName'],
  components: {
    HolidayFeature,
  },
  methods: {
    formatDate(value: string) {
      if (value) {
        return moment(value).format('Do MMMM YYYY')
      }
    },
  },
}
</script>

<template>
  <div
    class="my-4 rounded overflow-hidden shadow-lg bg-white w-full flex flex-col md:flex-row"
  >
    <div
      class="h-56 md:h-auto flex-none bg-cover overflow-hidden md:w-56 bg-blue-300"
    ></div>
    <div class="p-8 flex-1">
      <div class="mb-4 flex gap-2">
        <HolidayFeature
          v-for="(item, index) in holiday.types"
          :item="item"
          :key="index"
        />
        <HolidayFeature :item="holiday.global ? 'Global' : 'Local'" />
      </div>

      <h3 class="text-xl">{{ holiday.name }}</h3>
      <h6 class="text-md">{{ holiday.localName }}</h6>

      <div class="flex justify-between align-center mt-6 text-sm">
        <h2 class="text-blue-500">
          <router-link
            :to="{
              name: 'Single Country Details Page',
              params: { code: holiday.countryCode },
              query: { name: countryName },
            }"
            >{{ countryName }}</router-link
          >
        </h2>
        <p>{{ formatDate(holiday.date) }}</p>
      </div>
    </div>
  </div>
</template>
