import emailMutations from './mutations.js'
import emailActions from './actions.js'
import emailGetters from './getters.js'

export default {
  state () {
    // inital state
    return {
      email: undefined
    }
  },
  mutations: emailMutations,
  actions: emailActions,
  getters: emailGetters
}
