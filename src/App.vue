<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Notify } from 'quasar'
export default {
  name: 'App',
  methods: {
    ...mapActions([
      'fetchUser'
    ])
  },
  async created () {
    const token = window.localStorage.getItem('id_token')
    const expiryDate = window.localStorage.getItem('expiryDate')
    const userId = window.localStorage.getItem('userId')
    if (!token || !expiryDate || !userId) {
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      this.$store.commit('DESTROY_AUTH')
    }
    const obj = { pathParam: userId }
    const data = await this.fetchUser(obj)
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime()
    setTimeout(() => {
      this.$store.commit('DESTROY_AUTH')
      if (this.$route.name !== 'home') {
        this.$router.push('/')
      }
      Notify.create({
        type: 'negative',
        message: 'Sessione scaduta! Effettua nuovamente il login'
      })
    }, remainingMilliseconds)
    if (data && data.user.blocked) {
      this.$router.push('/')
    }
  }
}
</script>
