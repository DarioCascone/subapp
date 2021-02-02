import { ApiFactory } from 'src/common/api/apiFactory'
const GeoService = ApiFactory.get('geo')

export default {
  async getCountries ({ commit }) {
    const { data } = await GeoService.get('/countries')
    return data
  },
  async getRegions ({ commit }, countryId) {
    const { data } = await GeoService.get('/regions?countryId=' + countryId)
    return data
  },
  async getProvinces ({ commit }, regionId) {
    const { data } = await GeoService.get('/provinces?regionId=' + regionId)
    return data
  },
  async getCities ({ commit }, provinceId) {
    const { data } = await GeoService.get('/cities?provinceId=' + provinceId)
    return data
  }
}
