<template>
  <q-table
    title="Lista utenti"
    :data="data"
    :columns="columns"
    :filter="filter"
    row-key="name"
    bordered
    separator="cell"
  >
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TableRdo',
  data () {
    return {
      columns: [
        { name: 'rdos', required: true, label: 'Descrizione', align: 'center' },
        { name: 'regionOfInterest', required: true, label: 'Regione', align: 'center' },
        { name: 'imports', required: true, label: 'Importo', align: 'center' },
        { name: 'expirationDate', required: true, label: 'Scadenza', align: 'center' }
      ],
      data: []
    }
  },
  methods: {
    ...mapActions([
      'fetchUserRdos'
    ]),
    getData () {
      if (this.data.length > 0) this.data = []
      this.userRdos.forEach((rdo) => {
        const obj = {
          rdo: rdo
        }
        this.data.push(obj)
      })
    },
    async loadRdos () {
      const obj = {
        pathParam: this.userLogged._id
      }
      await this.fetchUserRdos(obj)
      this.getData()
      this.$q.loading.hide()
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      userRods: 'userRdos'
    })
  },
  mounted () {
    this.$q.loading.show()
    this.loadRdos()
  }
}
</script>

<style scoped>

</style>
