import { ApiFactory } from 'src/common/api/apiFactory'
const AuthService = ApiFactory.get('auth')
import { Notify } from 'quasar'

export default {
  async login ({ commit }, user) {
    const { data } = await AuthService.login(user)
    commit('LOGIN_SUCCESS', data)
    const remainingMilliseconds = 60 * 60 * 1000
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds
    )
    window.localStorage.setItem('expiryDate', expiryDate.toISOString())
    setTimeout(() => {
      commit('DESTROY_AUTH')
      this.$router.push('/')
      Notify.create({
        type: 'negative',
        message: 'Sessione scaduta! Effetua nuovamente il login'
      })
    }, remainingMilliseconds)
    return data
  },
  async signup ({ commit }, user) {
    const { data } = await AuthService.signup(user)
    return data
  }
}
