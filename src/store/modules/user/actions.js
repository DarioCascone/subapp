import { ApiFactory } from 'src/common/api/apiFactory'
const UserService = ApiFactory.get('user')

export default {
  async uploadFile ({ commit }, body) {
    const { data } = await UserService.post('/upload', body)
    return data
  },
  async deleteFiles ({ commit }, { pathParam, body }) {
    const { data } = await UserService.post('/' + pathParam + '/deletefiles', body)
    return data
  },
  async updateUser ({ commit }, { pathParam, body }) {
    const { data } = await UserService.post('/' + pathParam, body)
    return data
  },
  async fetchUser ({ commit }, { pathParam }) {
    const { data } = await UserService.get('/' + pathParam)
    commit('SET_USER', data)
    return data
  },
  async fetchUsers () {
    const { data } = await UserService.get('/all')
    return data
  },
  async updateLoggedUser ({ commit }, { pathParam, body }) {
    const { data } = await UserService.post('/update/' + pathParam, body)
    return data
  },
  async deleteUser ({ commit }, { pathParam }) {
    const { data } = await UserService.delete('/' + pathParam)
    return data
  }
}
