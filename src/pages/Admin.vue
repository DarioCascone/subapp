<template>
  <q-page class="q-pa-xl">
    <q-table
      title="Lista utenti"
      :data="data"
      :columns="columns"
      row-key="name"
      separator="cell"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Lista utenti</div>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-auto"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="user" :props="props">
            {{ props.row.user }}
          </q-td>
          <q-td key="payed" :props="props">
           <q-icon v-if="props.row.payed" class="text-positive cursor-pointer" style="font-size: 2rem" name="done"></q-icon>
           <q-icon v-else class="text-negative cursor-pointer" style="font-size: 2rem" name="clear"></q-icon>
          </q-td>
          <q-td key="antimafiaFile" :props="props" v-if="props.row.antimafiaFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.antimafiaFile)"></q-icon>
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
        { name: 'payed', required: true, label: 'Abbonamento', field: row => row.payed, align: 'left', sortable: true },
        { name: 'antimafiaFile', required: true, label: 'Antimafia File', field: row => row.antimafiaFile, align: 'left', sortable: true }
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
            antimafiaFile: user.antimafiaFile.path

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
