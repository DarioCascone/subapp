import { ApiFactory } from 'src/common/api/apiFactory'
const AuthService = ApiFactory.get('auth')

export default {
  async login ({ commit }) {
    const { data } = await AuthService.get()
    console.log('response', data)
    commit('SET_AUTH', { isAuth: true })
    // rimuovere successivamente il return data è solo per esempio per tonino
    return data
  }
}
