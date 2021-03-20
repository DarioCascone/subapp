import { ApiFactory } from 'src/common/api/apiFactory'
const BoardService = ApiFactory.get('board')

export default {
  async updateRdo ({ commit }, body) {
    const { data } = await BoardService.post('/rdo', body)
    return data
  },
  async fetchRdos ({ commit }, body) {
    const { data } = await BoardService.get('/all')
    commit('SET_BOARD_RDOS', data)
    return data
  }
}
