import authMutations from './mutations.js'
import authActions from './actions.js'
import authGetters from './getters.js'
import JwtService from '../../../common/api/jwtService'

export default {
  state () {
    // inital state
    return {
      user: undefined,
      isAuthenticated: !!JwtService.getToken()
    }
  },
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}
