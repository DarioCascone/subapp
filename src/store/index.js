import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/index'

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
    strict: process.env.NODE_ENV !== 'production'
  })
}
