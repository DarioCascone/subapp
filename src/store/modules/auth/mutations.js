import JwtService from '../../../common/api/jwtService'

export default {
  LOGIN_SUCCESS (state, payload) {
    state.isAuthenticated = true
    state.user = payload.user
    state.user.token = payload.token
    state.errors = {}
    JwtService.saveToken(state.user.token)
    window.localStorage.setItem('userId', payload.user._id)
  },
  DESTROY_AUTH (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('expiryDate')
  },
  SET_USER (state, payload) {
    state.user = payload.user
  }
}
