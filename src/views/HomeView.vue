<script lang="ts">
import List from '../layout/List.vue'
import Country from '../components/Country.vue'
import UpcomingHoliday from '../components/UpcomingHoliday.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

export default {
  components: {
    List,
    Country,
    UpcomingHoliday,
    ErrorMessage,
  },
  data() {
    return {
      search: '',
      countries: [],
      holidays: [],
      number: 3,
      errorFetchingCountries: null,
      errorFetchingHolidays: null,
    }
  },
  created() {
    this.fetchCountriesList()
    this.fetchHolidays()
  },
  methods: {
    fetchCountriesList() {
      this.errorFetchingCountries = null
      fetch(`${process.env.VUE_APP_BASE_URL}AvailableCountries`)
        .then(res => {
          res.json().then(data => (this.countries = data))
        })
        .catch(e => {
          console.log(e)
          this.errorFetchingCountries =
            'Oops ... Countries can not be load. Please refresh the page.'
        })
    },
    fetchHolidays() {
      this.errorFetchingHolidays = null
      fetch(`${process.env.VUE_APP_BASE_URL}NextPublicHolidaysWorldwide`)
        .then(res => {
          res.json().then(data => (this.holidays = data))
        })
        .catch(e => {
          console.log(e)
          this.errorFetchingHolidays =
            'Oops ... Holidays can not be load. Please refresh the page.'
        })
    },
    getCountryNameByCode(code) {
      const country = this.countries.find(
        country => country.countryCode === code,
      )
      return country.name ?? 'Unknown Country'
    },
  },
  computed: {
    filteredCountries() {
      return this.countries.filter(country =>
        country.name.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
    limitedHolidays() {
      return this.holidays.slice(0, this.number)
    },
  },
}
</script>

<template>
  <main class="p-8 grid grid-cols-3 row-auto gap-16 bg-blue-50">
    <div>
      <input
        type="text"
        v-model="search"
        placeholder="Search Country"
        class="border-b-2 border-blue-900 py-2 focus:outline-none focus:border-blue-500 mb-8 bg-blue-50"
      />

      <List :enableScroll="true">
        <template v-slot:heading>Countries List</template>

        <!-- ADD ERROR HANDLING -->
        <Country
          v-for="country in filteredCountries"
          :key="country.countryCode"
          :code="country.countryCode"
          :name="country.name"
        />
      </List>
    </div>

    <div class="col-span-2">
      <List>
        <template v-slot:heading>
          <div class="flex justify-between items-center">
            Upcoming Holidays
            <div class="text-lg flex gap-2 justify-end">
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
          v-for="holiday in limitedHolidays"
          :holiday="holiday"
          :countryName="getCountryNameByCode(holiday.countryCode)"
        />
      </List>
    </div>
  </main>
</template>
