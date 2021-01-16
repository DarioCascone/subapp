<template>
  <q-page class="flex flex-center">
    <div>Registrati!</div>
    <essential-link :name="name" />
  </q-page>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
export default {
  name: 'PageSignIn',
  data () {
    return {
      name: 'Antonio'
    }
  },
  components: {
    EssentialLink
  }
}
</script>
