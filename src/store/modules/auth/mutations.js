export default {
  SET_AUTH (state, payload) {
    state.isLoggedIn = payload.isAuth
  }
}
