import JwtService from '../../../common/api/jwtService'

export default {
  LOGIN_SUCCESS (state, payload) {
    state.isAuthenticated = true
    state.user = payload.user
    state.user.token = payload.token
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  DESTROY_AUTH (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}
