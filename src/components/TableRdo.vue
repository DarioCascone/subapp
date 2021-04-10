<template>
  <q-table
    :data="data"
    :columns="columns"
    row-key="name"
    bordered
    :filter="filter"
    :filter-method="customFilter"
    separator="cell"
    pagination.sync="pagination"
  >
    <template v-slot:top="props">
      <q-input borderless dense debounce="300" v-model="search" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div  class="q-ml-auto">
        <q-btn push
               :ripple="false"
               label="Carica RDO"
               @click="loadRdo()"
               color="accent">
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
        <!-- <q-td :auto-width="true" key="rdos" :props="props">
         <div v-for="(rdo, index) in props.row.rdo.rdos" :key="index" >
            {{rdo.description}}
          </div>
        </q-td>-->
        <q-td :auto-width="true" key="contractor" :props="props">
          {{ props.row.rdo.contractor }}
        </q-td>
        <q-td :auto-width="true" key="rdos" :props="props">
          {{ props.row.rdo.description }}
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
          {{ date.formatDate(props.row.rdo.expirationDate, 'DD-MM-YYYY') }}
        </q-td>
        <q-td :auto-width="true" key="viewRdo" :props="props">
          <q-icon style="font-size: 2rem;" name="search" @click="openRdo(props.row.rdo)" class="text-accent cursor-pointer"></q-icon>
        </q-td>
        <q-td v-if="!allRdos" :auto-width="true" key="deleteRdo" :props="props">
          <q-icon style="font-size: 2rem;" name="delete_forever" class="text-negative cursor-pointer" @click="cancelRdo(props.row.rdo)"></q-icon>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'TableRdo',
  props: ['allRdos'],
  data () {
    return {
      search: '',
      columns: [
        { name: 'contractor', required: true, label: 'Appaltatore', align: 'center' },
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
    ...mapActions([
      'deleteRdo',
      'fetchRdos',
      'fetchUser'
    ]),
    getData (data) {
      if (this.data.length > 0) this.data = []
      data.forEach((rdo) => {
        const obj = {
          rdo: rdo
        }
        this.data.push(obj)
      })
    },
    openRdo (rdo) {
      this.$emit('openSelectedRdo', rdo)
    },
    loadRdo () {
      this.$emit('resetSelectedRdo')
      this.$emit('openModal')
    },
    async cancelRdo (rdo) {
      this.$q.loading.show()
      const objDelete = {
        pathParam: rdo._id + '/' + this.userLogged._id
      }
      const objUser = {
        pathParam: this.userLogged._id
      }
      await this.deleteRdo(objDelete)
      await this.fetchUser(objUser)
      this.getData(this.userLogged.loadedRdos)
      this.$q.loading.hide()
    },
    customFilter (rows, terms) {
      const lowerSearch = terms.search ? terms.search.toLowerCase() : ''

      const filteredRows = rows.filter(
        (row, i) => {
          let ans = false
          let s1 = true

          if (lowerSearch !== '') {
            s1 = false
            const s1Values = Object.values(row.rdo)
            const s1Lower = s1Values.map(x => x.toString().toLowerCase())

            for (let val = 0; val < s1Lower.length; val++) {
              if (s1Lower[val].includes(lowerSearch)) {
                s1 = true
                break
              }
            }
          }

          ans = false
          if (s1) {
            ans = true
          }

          return ans
        })

      return filteredRows
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      boardRdos: 'boardRdos'
    }),
    filter () {
      return {
        search: this.search
      }
    }
  },
  mounted () {
    if (!this.allRdos) {
      this.getData(this.userLogged.loadedRdos)
      this.columns.push({ name: 'deleteRdo', required: true, label: 'Elimina RDO', align: 'center' })
    } else {
      const filteredRdos = this.boardRdos.filter((rdo) => { return rdo.user._id !== this.userLogged._id })
      this.getData(filteredRdos)
    }
  },
  watch: {
    boardRdos: {
      deep: true,
      handler (newVal, oldVal) {
        if (this.allRdos) {
          const filteredRdos = newVal.filter((rdo) => { return rdo.user._id !== this.userLogged._id })
          this.getData(filteredRdos)
        }
      }
    },
    userLogged: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal && !this.allRdos) {
          this.getData(newVal.loadedRdos)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
