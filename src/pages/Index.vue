<template>
  <q-page class="login-page flex flex-center">
    <!-- Home Page -->
    <login-in></login-in>
  </q-page>
</template>

<script>
import LoginIn from 'components/LoginIn'
export default {
  name: 'PageIndex',
  components: { LoginIn },
  data () {
    return {
    }
  }
}
</script>
