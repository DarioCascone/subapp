import boardMutations from './mutations.js'
import boardActions from './actions.js'
import boardGetters from './getters.js'

export default {
  state () {
    // inital state
    return {
      boardRdos: []
    }
  },
  mutations: boardMutations,
  actions: boardActions,
  getters: boardGetters
}
