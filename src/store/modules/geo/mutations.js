export default {
  SET_COUNTRIES (state, countries) {
    state.countries = countries
  },
  SET_REGIONS (state, regions) {
    state.regions = regions
  },
  SET_PROVINCES (state, provinces) {
    state.provinces = provinces
  },
  SET_CITIES (state, cities) {
    state.cities = cities
  },
  RESET_REGIONS (state) {
    state.regions = []
  },
  RESET_PROVINCES (state) {
    state.provinces = []
  },
  RESET_CITIES (state) {
    state.cities = []
  }
}
