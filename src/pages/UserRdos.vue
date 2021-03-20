<template>
  <q-page>
    <table-rdo v-if="userLogged"></table-rdo>
  </q-page>
</template>

<script>
import TableRdo from 'components/TableRdo'
import { mapGetters } from 'vuex'

export default {
  name: 'UserRdos',
  components: { TableRdo },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  }
}
</script>

<style scoped>

</style>
