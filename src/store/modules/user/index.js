import userMutations from './mutations.js'
import userActions from './actions.js'
import userGetters from './getters.js'

export default {
  state () {
    // inital state
    return {
    }
  },
  mutations: userMutations,
  actions: userActions,
  getters: userGetters
}