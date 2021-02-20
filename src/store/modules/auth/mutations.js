export default {
  SET_AUTH (state, payload) {
    state.isLoggedIn = payload.isAuth
  },
  SET_USER (state, payload) {
    state.user = payload
  }
}
