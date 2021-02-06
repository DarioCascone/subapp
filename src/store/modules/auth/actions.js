import { ApiFactory } from 'src/common/api/apiFactory'
const AuthService = ApiFactory.get('auth')

export default {
  async login ({ commit }) {
    const { data } = await AuthService.login()
    console.log('response', data)
    commit('SET_AUTH', { isAuth: true })
    return data
  },
  async signin ({ commit }, user) {
    const { data } = await AuthService.signin(user)
    return data
  }
}
