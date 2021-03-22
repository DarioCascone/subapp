<template>
<q-page>
  <load-rdo v-if="userLogged"></load-rdo>
  <div v-if="userLogged && this.boardRdos.length>0" >
    <h5 class="text-center">Lista RDO di tuo interesse</h5>
    <div class="q-px-lg">
      <table-rdo :allRdos="true"></table-rdo>
    </div>
  </div>
  <div v-if="this.boardRdos && this.boardRdos.length === 0">
    <h5 class="text-center">Ancora nessuna richiesta di offerta caricata.</h5>
  </div>
</q-page>
</template>

<script>
import LoadRdo from 'components/LoadRdo'
import { mapActions, mapGetters } from 'vuex'
import TableRdo from 'components/TableRdo'

export default {
  name: 'Board',
  components: { TableRdo, LoadRdo },
  methods: {
    ...mapActions([
      'fetchRdos'
    ])
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      boardRdos: 'boardRdos'
    })
  },
  async created () {
    await this.fetchRdos()
  }
}
</script>

<style scoped>

</style>
