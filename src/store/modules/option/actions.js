import { ApiFactory } from 'src/common/api/apiFactory'
const OptionService = ApiFactory.get('option')

export default {
  async getRdos ({ commit }) {
    const { data } = await OptionService.get('/rdos')
    console.log('RDO', data)
    commit('SET_RDOS', data.options)
    return data
  }
}
