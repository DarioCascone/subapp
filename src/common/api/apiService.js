import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_BASE_URL } from './config'
import JwtService from './jwtService'
import { Notify, Loading } from 'quasar'
import router from '../../router/routes'

const authInterceptor = (config) => {
  if (JwtService.getToken()) {
    config.headers.Authorization = `Token ${JwtService.getToken()}`
  }
  return config
}

const errorInterceptor = error => {
  // check if it's a server error
  if (!error.response) {
    // notify.warn('Network/Server error')
    return Promise.reject(error)
  }

  // all the other error responses
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message)
      Notify.create({
        type: 'negative',
        message: error.response.data.message
      })
      break

    case 401:
      JwtService.destroyToken()
      Notify.create({
        type: 'negative',
        message: error.response.data.message
      })
      router.push('/')
      break

    default:
      console.error(error.response.status, error.message)
      Notify.create({
        type: 'negative',
        message: error.response.data.message
      })
  }
  Loading.hide()
  return Promise.reject(error)
}

// Interceptor for responses
const responseInterceptor = response => {
  switch (response.status) {
    case 200:
      if (response.data.message) {
        Notify.create({
          type: 'positive',
          message: response.data.message
        })
      }
      break
    default:
  }

  return response
}

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_BASE_URL
    Vue.axios.defaults.headers.common = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    Vue.axios.interceptors.request.use(authInterceptor)
    Vue.axios.interceptors.response.use(responseInterceptor, errorInterceptor)
  },

  setHeader () {
    Vue.axios.defaults.headers.common.Authorization = `Token ${JwtService.getToken()}`
  },

  get (resource) {
    return Vue.axios.get(`${resource}`)
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

  delete (resource, body) {
    return Vue.axios.delete(resource, body)
  }
}

export default ApiService
