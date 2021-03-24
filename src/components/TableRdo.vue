<template>
  <q-table
    :data="data"
    :columns="columns"
    row-key="name"
    bordered
    :filter="filter"
    separator="cell"
  >
    <template v-slot:top="props">
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div  class="q-ml-auto">
        <q-btn push
               :ripple="false"
               label="Carica RDO"
               @click="$emit('openModal')"
               color="secondary">
        </q-btn>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </div>
    </template>
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
        <q-td :auto-width="true" key="viewRdo" :props="props">
          <q-icon style="font-size: 2rem;" name="search" class="text-accent cursor-pointer"></q-icon>
        </q-td>
        <q-td v-if="!allRdos" :auto-width="true" key="deleteRdo" :props="props">
          <q-icon style="font-size: 2rem;" name="delete_forever" class="text-negative cursor-pointer"></q-icon>
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
  props: ['allRdos'],
  data () {
    return {
      filter: '',
      columns: [
        { name: 'rdos', required: true, label: 'Descrizione', align: 'center' },
        { name: 'regionOfInterest', required: true, label: 'Regione', align: 'center' },
        { name: 'imports', required: true, label: 'Importo', align: 'center' },
        { name: 'expirationDate', required: true, label: 'Scadenza', align: 'center' },
        { name: 'viewRdo', required: true, label: 'Visualizza RDO', align: 'center' }
      ],
      data: [],
      date: date
    }
  },
  methods: {
    getData (data) {
      if (this.data.length > 0) this.data = []
      data.forEach((rdo) => {
        const obj = {
          rdo: rdo
        }
        this.data.push(obj)
      })
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      boardRdos: 'boardRdos'
    })
  },
  mounted () {
    if (!this.allRdos) {
      this.getData(this.userLogged.loadedRdos)
      this.columns.push({ name: 'deleteRdo', required: true, label: 'Elimina RDO', align: 'center' })
    } else {
      this.getData(this.boardRdos)
    }
  },
  watch: {
    boardRdos: {
      deep: true,
      handler (newVal, oldVal) {
        this.getData(newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
