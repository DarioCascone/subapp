import { ApiFactory } from 'src/common/api/apiFactory'
const BoardService = ApiFactory.get('board')

export default {
  async createRdo ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.post('/rdo/' + pathParam, body)
    return data
  },
  async updateRdo ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.put('/rdo/' + pathParam, body)
    return data
  },
  async fetchRdos ({ commit }) {
    const { data } = await BoardService.get('/rdo/all')
    commit('SET_BOARD_RDOS', data)
    return data
  },
  async fetchRdo ({ commit }, { pathParam }) {
    const { data } = await BoardService.get('/rdo/' + pathParam)
    commit('SET_RDO', data)
    return data
  },
  async deleteRdo ({ commit }, { pathParam }) {
    const { data } = await BoardService.delete('/rdo/' + pathParam)
    commit('SET_RDO', data)
    return data
  }
}
