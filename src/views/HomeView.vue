<script lang="ts">
import List from '../layout/ListMain.vue'
import CountryCard from '../components/CountryCard.vue'
import UpcomingHoliday from '../components/UpcomingHoliday.vue'
import { defineComponent } from 'vue'
import type { Country, Holiday } from '../types.ts'

export default defineComponent({
  components: {
    List,
    CountryCard,
    UpcomingHoliday,
  },
  data() {
    return {
      search: '' as string,
      countries: [] as Country[],
      holidays: [] as Holiday[],
      number: 3 as number,
      errorFetchingCountries: null as string | null,
      errorFetchingHolidays: null as string | null,
    }
  },
  created() {
    this.fetchCountriesList()
    this.fetchHolidays()
  },
  methods: {
    fetchCountriesList(): void {
      this.errorFetchingCountries = null
      fetch(`${process.env.BASE_API_URL}AvailableCountries`)
        .then(res => {
          res.json().then(data => (this.countries = data))
        })
        .catch(e => {
          console.log(e)
          this.errorFetchingCountries =
            'Oops ... Countries can not be load. Please refresh the page.'
        })
    },
    fetchHolidays(): void {
      this.errorFetchingHolidays = null
      fetch(`${process.env.BASE_API_URL}NextPublicHolidaysWorldwide`)
        .then(res => {
          res.json().then(data => (this.holidays = data))
        })
        .catch(e => {
          console.log(e)
          this.errorFetchingHolidays =
            'Oops ... Holidays can not be load. Please refresh the page.'
        })
    },
    getCountryNameByCode(code: string): string {
      const country = this.countries.find(
        country => country.countryCode === code,
      )
      return country?.name ?? 'Unknown Country'
    },
  },
  computed: {
    filteredCountries(): Country[] {
      return this.countries.filter(country =>
        country.name.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
    limitedHolidays(): Holiday[] {
      return this.holidays.slice(0, this.number)
    },
  },
})
</script>

<template>
  <main
    class="p-8 grid grid-cols-1 md:grid-cols-3 row-auto md:gap-16 bg-blue-50"
  >
    <div class="col-span-1 mb-8 md:mb-0">
      <input
        type="text"
        v-model="search"
        placeholder="Search Country"
        class="border-b-2 border-blue-900 py-2 focus:outline-none focus:border-blue-500 mb-8 bg-blue-50"
      />

      <List :enableScroll="true" maxHeight="max-h-52">
        <template v-slot:heading>Countries List</template>

        <!-- ADD ERROR HANDLING -->
        <CountryCard
          v-for="country in filteredCountries"
          :key="country.countryCode"
          :code="country.countryCode"
          :name="country.name"
        />
      </List>
    </div>

    <div class="col-span-2">
      <List :enableScroll="true">
        <template v-slot:heading>
          <div
            class="flex flex-col justify-start gap-4 md:gap-0 md:flex-row md:justify-between md:items-center"
          >
            Upcoming Holidays
            <div class="text-lg flex gap-2 md:justify-end">
              <p>Select number of holidays:</p>
              <input
                type="number"
                v-model="number"
                class="max-w-10 text-lg bg-transparent"
              />
            </div>
          </div>
        </template>

        <!-- ADD ERROR HANDLING -->
        <UpcomingHoliday
          v-for="(holiday, index) in limitedHolidays"
          :key="index"
          :holiday="holiday"
          :countryName="getCountryNameByCode(holiday.countryCode)"
        />
      </List>
    </div>
  </main>
</template>
