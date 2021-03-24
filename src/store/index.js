import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/index'
import geoModule from './modules/geo/index'
import optionModule from './modules/option/index'
import userModule from './modules/user/index'
import emailModule from './modules/email/index'
import boardModule from './modules/board/index'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = new Vuex.Store({
  modules: {
    authModule,
    geoModule,
    optionModule,
    userModule,
    emailModule,
    boardModule
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default function (/* { ssrContext } */) {
  return store
}

export { store }
