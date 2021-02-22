import { ApiFactory } from 'src/common/api/apiFactory'
const UserService = ApiFactory.get('user')

export default {
  async uploadFile ({ commit }, body) {
    const { data } = await UserService.post('/upload', body)
    return data
  },
  async updateUser ({ commit }, { pathParam, body }) {
    const { data } = await UserService.put('/' + pathParam, body)
    return data
  }
}
