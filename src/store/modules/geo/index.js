import authMutations from './mutations.js'
import authActions from './actions.js'
import authGetters from './getters.js'

export default {
  state () {
    // inital state
    return {
      countries: [],
      regions: [],
      provinces: [],
      cities: []
    }
  },
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}
