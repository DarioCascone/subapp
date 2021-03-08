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
            {{ props.row.user }}
          </q-td>
          <q-td  key="payed" :props="props">
           <q-icon v-if="props.row.payed" class="text-positive cursor-pointer" style="font-size: 2rem" name="done"></q-icon>
           <q-icon v-else class="text-negative cursor-pointer" style="font-size: 2rem" name="clear"></q-icon>
          </q-td>
          <q-td  key="antimafiaFile" :props="props" v-if="props.row.antimafiaFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.antimafiaFile.path)"></q-icon>
          </q-td>
          <q-td  key="certificateFile" :props="props" v-if="props.row.certificateFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.certificateFile.path)"></q-icon>
          </q-td>
          <q-td  key="durcRegolarityFile" :props="props" v-if="props.row.durcRegolarityFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.durcRegolarityFile.path)"></q-icon>
          </q-td>
          <q-td  key="lendingFile" :props="props" v-if="props.row.lendingFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.lendingFile.path)"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Admin',
  data () {
    return {
      filter: '',
      visibleColumns: ['user', 'payed'],
      columns: [
        {
          name: 'user',
          required: true,
          label: 'Username',
          align: 'left',
          field: row => row.user,
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-weight-bold'
        },
        { name: 'payed', required: true, label: 'Abbonamento', field: row => row.payed, align: 'left' },
        { name: 'antimafiaFile', required: true, label: 'Antimafia File', field: row => row.antimafiaFile.path, align: 'left' },
        { name: 'certificateFile', required: true, label: 'Certificato o Visura Camerale File', field: row => row.certificateFile.path, align: 'left' },
        { name: 'durcRegolarityFile', required: true, label: 'Regolarità Durc File', field: row => row.durcRegolarityFile.path, align: 'left' },
        { name: 'lendingFile', required: true, label: 'Prestazione File', field: row => row.lendingFile.path, align: 'left' }
      ],
      data: []
    }
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ]),
    getData () {
      this.users.forEach((user) => {
        if (!user.admin) {
          const obj = {
            user: user.username,
            payed: user.payed,
            antimafiaFile: user.antimafiaFile,
            certificateFile: user.certificateFile,
            durcRegolarityFile: user.durcRegolarityFile,
            lendingFile: user.lendingFile
          }
          this.data.push(obj)
        }
      })
    },
    downloadFile (path) {
      window.open('http://localhost:3000/' + path)
    }
  },
  computed: {
    ...mapGetters([
      'users'
    ])
  },
  async created () {
    this.$q.loading.show()
    await this.fetchUsers()
    this.$q.loading.hide()
    this.getData()
  }
}
</script>

<style scoped>

</style>
