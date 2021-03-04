import { ApiFactory } from 'src/common/api/apiFactory'
const AuthService = ApiFactory.get('auth')

export default {
  async login ({ commit }, user) {
    const { data } = await AuthService.login(user)
    commit('LOGIN_SUCCESS', data)
    return data
  },
  async signup ({ commit }, user) {
    const { data } = await AuthService.signup(user)
    return data
  }
}
