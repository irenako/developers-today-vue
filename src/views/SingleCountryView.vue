<script lang="ts">
import UpcomingHoliday from '../components/UpcomingHoliday.vue'
import { defineComponent } from 'vue'
import type { Holiday, CountryDetails } from '../types.ts'

export default defineComponent({
  components: {
    UpcomingHoliday,
  },
  data() {
    return {
      details: {} as CountryDetails,
      error: null as string | null,
      selectedYear: new Date().getFullYear() as number,
      holidays: [] as Holiday[],
    }
  },
  created() {
    this.fetchCountryDetails()
    this.fetchHolidaysByYear()
  },
  mounted() {
    this.scrollToSelectedYear()
  },
  methods: {
    async fetchCountryDetails(): Promise<void> {
      try {
        console.log(import.meta.env)
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}CountryInfo/${this.$route.params.code}`,
        )
        if (!res.ok)
          throw new Error(
            'Oops ... Country details can not be load. Please refresh the page.',
          )
        this.details = await res.json()
      } catch (e) {
        console.error(e)
        this.error =
          'Oops ... Country details cannot be loaded. Please refresh the page.'
      }
    },
    getImageUrl(): string {
      return `${import.meta.env.VITE_FLAG_API_URL}${this.$route.params.code}/flat/64.png`
    },
    async fetchHolidaysByYear(): Promise<void> {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}PublicHolidays/${this.selectedYear}/${this.$route.params.code}`,
        )
        if (!res.ok)
          throw new Error(
            'Oops ... Country holidays can not be load. Please refresh the page.',
          )
        this.holidays = await res.json()
      } catch (e) {
        console.error(e)
        this.error =
          'Oops ... Country holidays cannot be loaded. Please refresh the page.'
      }
    },
    handleHomePageReturn(): void {
      this.$router.push('/')
    },
    scrollToSelectedYear(): void {
      this.$nextTick(() => {
        const selectedButton = this.$refs.selectedYearButton as HTMLElement[]
        console.log(selectedButton)
        if (selectedButton && selectedButton?.length) {
          selectedButton[0].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          })
        }
      })
    },
  },
  computed: {
    getYearsRange(): number[] {
      const result = []
      const currentYear = new Date().getFullYear()
      const maxYearRange = 10

      for (
        let i = currentYear - maxYearRange;
        i <= currentYear + maxYearRange;
        i++
      ) {
        result.push(i)
      }
      return result
    },
  },
  watch: {
    selectedYear() {
      this.fetchHolidaysByYear()
    },
    '$route.params.code': function () {
      this.fetchCountryDetails()
      this.fetchHolidaysByYear()
    },
  },
})
</script>
<template>
  <div class="p-8 bg-blue-50" v-if="!error">
    <h1 class="text-3xl flex gap-2 items-center">
      Welcome to {{ details?.commonName }} <img :src="getImageUrl()" />
    </h1>

    <ul>
      <li>Official name: {{ details?.officialName ?? 'Unknown' }}</li>
      <li>Country code: {{ details?.countryCode ?? 'Unknown' }}</li>
      <li>Region: {{ details?.region ?? 'Unknown' }}</li>
      <li>
        Borders:
        <template v-if="details?.borders?.length">
          <router-link
            v-for="(c, index) in details?.borders"
            :to="{
              name: 'Single Country Details Page',
              params: { code: c.countryCode },
              query: { name: c.commonName },
            }"
            :key="index"
            class="mr-1 text-blue-500"
            >{{ c.commonName
            }}{{
              index !== details?.borders.length - 1 ? ',' : ''
            }}</router-link
          >
        </template>
        <span v-else>No Borders</span>
      </li>
    </ul>

    <div class="flex gap-2 mt-6 overflow-scroll pb-6">
      <button
        v-for="year in getYearsRange"
        :key="year"
        @click="selectedYear = year"
        :class="`${year === selectedYear ? 'bg-blue-500 text-white' : 'border border-blue-50 bg-white'} py-2 px-4 text-sm rounded`"
        :ref="year === selectedYear ? 'selectedYearButton' : ''"
      >
        {{ year }}
      </button>
    </div>

    <div v-if="holidays.length">
      <UpcomingHoliday
        v-for="(holiday, index) in holidays"
        :key="index"
        :country-name="details?.commonName"
        :holiday="holiday"
      />
    </div>
  </div>
  <div
    v-else
    class="text-red-500 flex flex-col max-w-md mx-auto text-center py-12"
  >
    <h2 class="text-2xl">{{ error }}</h2>
    <button
      @click="handleHomePageReturn"
      class="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
    >
      Return back to home page
    </button>
  </div>
</template>
