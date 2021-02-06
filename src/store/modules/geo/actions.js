import { ApiFactory } from 'src/common/api/apiFactory'
const GeoService = ApiFactory.get('geo')

export default {
  async getCountries ({ commit }) {
    const { data } = await GeoService.get('/countries')
    console.log('NAZIONI', data)
    commit('SET_COUNTRIES', data.countries)
    return data
  },
  async getRegions ({ commit }, countryId) {
    const { data } = await GeoService.get('/regions?countryId=' + countryId)
    console.log('REGIONI', data)
    commit('SET_REGIONS', data.regions)
    return data
  },
  async getProvinces ({ commit }, regionId) {
    const { data } = await GeoService.get('/provinces?regionId=' + regionId)
    console.log('PROVINCE', data)
    commit('SET_PROVINCES', data.provinces)
    return data
  },
  async getCities ({ commit }, provinceId) {
    const { data } = await GeoService.get('/cities?provinceId=' + provinceId)
    console.log('CITTA', data)
    commit('SET_CITIES', data.cities)
    return data
  }
}
