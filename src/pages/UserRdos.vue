<template>
  <q-page>
    <h5 class="text-center">Lista RDO caricate</h5>
    <div class="q-px-lg">
      <table-rdo v-if="userLogged"></table-rdo>
    </div>
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
