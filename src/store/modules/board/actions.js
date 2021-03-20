import { ApiFactory } from 'src/common/api/apiFactory'
const BoardService = ApiFactory.get('board')

export default {
  async createRdo ({ commit }, body) {
    const { data } = await BoardService.post('/rdo', body)
    return data
  },
  async updateRdo ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.put('/rdo/update' + pathParam, body)
    return data
  },
  async fetchRdos ({ commit }) {
    const { data } = await BoardService.get('/all')
    commit('SET_BOARD_RDOS', data)
    return data
  }
}
