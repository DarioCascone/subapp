import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/index'
import rootActions from './actions.js'
import rootGetters from './getters.js'
import rootMutations from './mutations.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      authModule
    },
    state () {
      return {
        isLoggedIn: false
      }
    },
    mutation: rootMutations,
    actions: rootActions,
    getters: rootGetters,
    strict: process.env.DEBUGGING
  })
}
