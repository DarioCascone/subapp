import userMutations from './mutations.js'
import userActions from './actions.js'
import userGetters from './getters.js'

export default {
  state () {
    return {
      users: undefined
    }
  },
  mutations: userMutations,
  actions: userActions,
  getters: userGetters
}
