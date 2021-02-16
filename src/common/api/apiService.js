import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_BASE_URL } from './config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_BASE_URL
    Vue.axios.defaults.headers.common = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },

  get (resource) {
    return Vue.axios.get(`${resource}`).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  },

  post (resource, body) {
    return Vue.axios.post(`${resource}`, body)
  },

  update (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  put (resource, body) {
    return Vue.axios.put(`${resource}`, body)
  },

  delete (resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

export default ApiService
