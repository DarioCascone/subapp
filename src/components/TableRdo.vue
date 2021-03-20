<template>
  <q-table
    title="Lista RDO"
    :data="data"
    :columns="columns"
    row-key="name"
    bordered
    separator="cell"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td :auto-width="true" key="rdos" :props="props">
          <div v-for="(rdo, index) in props.row.rdo.rdos" :key="index" >
            {{rdo.description}}
          </div>
        </q-td>
        <q-td :auto-width="true" key="regionOfInterest" :props="props">
          {{ props.row.rdo.regionOfInterest.description }}
        </q-td>
        <q-td :auto-width="true" key="imports" :props="props">
          <div v-for="(item, index) in props.row.rdo.imports" :key="index" >
            {{item}}
          </div>
        </q-td>
        <q-td :auto-width="true" key="expirationDate" :props="props">
          {{ date.formatDate(props.row.rdo.expirationDate, 'MM-DD-YYYY') }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'

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
      data: [],
      date: date
    }
  },
  methods: {
    getData () {
      if (this.data.length > 0) this.data = []
      this.userLogged.loadedRdos.forEach((rdo) => {
        const obj = {
          rdo: rdo
        }
        this.data.push(obj)
      })
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
