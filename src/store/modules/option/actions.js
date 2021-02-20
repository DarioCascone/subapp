import { ApiFactory } from 'src/common/api/apiFactory'
const OptionService = ApiFactory.get('option')

export default {
  async getMacroRdo ({ commit }) {
    const { data } = await OptionService.get('/rdo_macrocategory')
    commit('SET_MACRORDO', data.macroRdo)
    return data
  },
  async getCatRdo ({ commit }, rdomacroId) {
    const { data } = await OptionService.get('/rdo_category?rdomacroId=' + rdomacroId)
    commit('SET_CATRDO', data.catRdo)
    return data
  },
  async getSubRdo ({ commit }, rdocatId) {
    const { data } = await OptionService.get('/rdo_subcategory?rdocatId=' + rdocatId)
    commit('SET_SUBRDO', data.subRdo)
    return data
  }
}
