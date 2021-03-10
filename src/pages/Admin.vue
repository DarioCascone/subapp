<template>
  <q-page class="q-pa-xl">
    <q-table
      title="Lista utenti"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
      separator="cell"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Lista utenti</div>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-auto"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :auto-width="true" key="user" :props="props">
            {{ props.row.user.username }}
          </q-td>
          <q-td :auto-width="true" key="registrationDate" :props="props">
            {{ date.formatDate(props.row.user.createdAt, 'YYYY-MM-DD') }}
          </q-td>
          <q-td  key="payed" :props="props">
            <div v-if="props.row.user.payed" class="flex items-center justify-around full-width">
              <q-icon  class="text-positive cursor-pointer" style="font-size: 2rem" name="done"></q-icon>
              <div class="text-negative" style="font-weight: bold">Scade tra: {{getDaysLeftToEndSubscription(props.row.user)}} giorni</div>
            </div>
            <div v-else class="flex items-center justify-around">
              <q-btn push class="bg-accent text-white"  @click="confirmUser(props.row.user, 1)">Attiva annuale</q-btn>
              <q-btn push class="bg-secondary text-white"  @click="confirmUser(props.row.user, 2)">Attiva biennale</q-btn>
              <q-btn push class="bg-negative text-white"  @click="deleteUser(props.row.user)">Cancella</q-btn>
            </div>
          </q-td>
          <q-td  key="antimafiaFile" :props="props" v-if="props.row.user.antimafiaFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.antimafiaFile.path)"></q-icon>
          </q-td>
          <q-td  key="certificateFile" :props="props" v-if="props.row.user.certificateFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.certificateFile.path)"></q-icon>
          </q-td>
          <q-td  key="durcRegolarityFile" :props="props" v-if="props.row.user.durcRegolarityFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.durcRegolarityFile.path)"></q-icon>
          </q-td>
          <q-td  key="lendingFile" :props="props" v-if="props.row.user.lendingFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.lendingFile.path)"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'Admin',
  data () {
    return {
      filter: '',
      date: date,
      visibleColumns: ['user', 'payed'],
      columns: [
        {
          name: 'user',
          required: true,
          label: 'Username',
          align: 'center',
          sortable: true,
          headerClasses: 'text-weight-bold'
        },
        { name: 'registrationDate', required: true, label: 'Data iscrizione', sortable: true, align: 'center' },
        { name: 'payed', required: true, label: 'Abbonamento', align: 'center' },
        { name: 'antimafiaFile', required: true, label: 'Antimafia File', align: 'center' },
        { name: 'certificateFile', required: true, label: 'Certificato o Visura Camerale File', align: 'center' },
        { name: 'durcRegolarityFile', required: true, label: 'Regolarità Durc File', align: 'center' },
        { name: 'lendingFile', required: true, label: 'Prestazione File', align: 'center' }
      ],
      data: []
    }
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'updateLoggedUser'
    ]),
    getData () {
      if (this.data.length > 0) this.data = []
      this.users.forEach((user) => {
        if (!user.admin) {
          const obj = {
            user: user
          }
          this.data.push(obj)
        }
      })
    },
    downloadFile (path) {
      window.open('http://localhost:3000/' + path)
    },
    async confirmUser (user, period) {
      if (user) {
        user.payed = true
        user.subscriptionDate = new Date()
        if (period === 1) {
          user.annual = true
        } else {
          user.biennial = true
        }
        const obj = {
          pathParam: user._id,
          body: user
        }
        this.$q.loading.show()
        await this.updateLoggedUser(obj)
        await this.loadUsers()
      }
    },
    deleteUser () {

    },
    async loadUsers () {
      this.$q.loading.show()
      await this.fetchUsers()
      this.$q.loading.hide()
      this.getData()
    },
    getDaysLeftToEndSubscription (user) {
      const period = user.annual ? 1 : 2
      const expirySubscriptionDate = date.addToDate(new Date(user.subscriptionDate), { year: period })
      return date.getDateDiff(expirySubscriptionDate, new Date(user.subscriptionDate), 'days')
    }
  },
  computed: {
    ...mapGetters([
      'users'
    ])
  },
  created () {
    this.loadUsers()
  }
}
</script>

<style scoped>

</style>
