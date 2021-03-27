<template>
  <q-page class="q-pa-xl">
    <q-table
      title="Lista utenti"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
      bordered
      separator="cell"
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
            <div>
              {{ props.row.user.username }}
            </div>
            <q-icon style="font-size: 2rem;" name="search" class="text-secondary cursor-pointer" @click="viewSelectedProfile(props.row.user)"/>
          </q-td>
          <q-td :auto-width="true" key="registrationDate" :props="props">
            {{ date.formatDate(props.row.user.createdAt, 'MM-DD-YYYY') }}
          </q-td>
          <q-td  key="blocked" :props="props">
            <q-btn v-if="props.row.user.blocked" push class="bg-warning text-white" @click="openConfirmDialog(props.row.user, 'Sicuro di voler sbloccare l\'utente selezionato?', update , false, null)">Sblocca</q-btn>
            <q-btn v-else push class="bg-warning text-white" @click="openConfirmDialog(props.row.user, 'Sicuro di voler bloccare l\'utente selezionato?', update, true, null)">Blocca</q-btn>
          </q-td>
          <q-td  key="payed" :props="props">
            <div v-if="props.row.user.payed" class="flex column items-center justify-around full-width">
              <div class="text-negative" style="font-weight: bold">{{getDaysLeftToEndSubscription(props.row.user)}}</div>
              <q-icon  class="text-positive cursor-pointer" style="font-size: 2rem" name="done"></q-icon>
            </div>
            <div v-else>
              <q-icon  class="text-negative cursor-pointer" style="font-size: 2rem" name="error"></q-icon>
            </div>
          </q-td>
          <q-td key="annual" :props="props">
            <q-btn push class="bg-accent text-white" :disable="props.row.user.payed"  @click="openConfirmDialog(props.row.user,'Sicuro di voler attivare l\'abbonamento di un anno?', confirmUser, undefined, 1)">Attiva</q-btn>
          </q-td>
          <q-td key="biennial" :props="props">
            <q-btn push class="bg-secondary text-white" :disable="props.row.user.payed"  @click="openConfirmDialog(props.row.user,'Sicuro di voler attivare l\'abbonamento di un anno?', confirmUser, undefined, 2)">Attiva</q-btn>
          </q-td>
          <q-td  key="soaFile" :props="props">
            <q-icon v-if="props.row.user.soaFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.soaFile.path)"></q-icon>
            <q-icon class="text-negative" v-else name="remove"></q-icon>
          </q-td>
          <q-td  key="isoFile" :props="props" >
            <q-icon v-if="props.row.user.isoFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.isoFile.path)"></q-icon>
            <q-icon class="text-negative" v-else name="remove"></q-icon>
          </q-td>
          <q-td  key="fgasFile" :props="props">
            <q-icon v-if="props.row.user.fgasFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.fgasFile.path)"></q-icon>
            <q-icon class="text-negative" v-else name="remove"></q-icon>
          </q-td>
          <q-td  key="antimafiaFile" :props="props" v-if="props.row.user.antimafiaFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.antimafiaFile.path)"></q-icon>
          </q-td>
          <q-td  key="lendingFile" :props="props" v-if="props.row.user.lendingFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.lendingFile.path)"></q-icon>
          </q-td>
          <q-td  key="certificateFile" :props="props" v-if="props.row.user.certificateFile">
            <div class="flex column items-center full-width" >
              <div class="text-negative text-center" style="font-weight: bold;">{{getDaysLeftToEndFile(props.row.user.certificateDate, props.row.user)}}</div>
              <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem;" @click="downloadFile(props.row.user.certificateFile.path)"></q-icon>
            </div>
          </q-td>
          <q-td  key="durcRegolarityFile" :props="props" v-if="props.row.user.durcRegolarityFile">
            <div class="flex column items-center full-width" >
              <div class="text-negative text-center" style="font-weight: bold;">{{getDaysLeftToEndFile(props.row.user.durcRegolarityDate, props.row.user)}}</div>
              <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem;" @click="downloadFile(props.row.user.durcRegolarityFile.path)"></q-icon>
            </div>
          </q-td>
          <q-td key="delete" :props="props" >
            <q-icon style="font-size: 2rem;" name="delete_forever" class="text-negative cursor-pointer" @click="openConfirmDialog(props.row.user, 'Sicuro di voler eliminare l\'utente selezionato?', removeUser)"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <modal @editSelectedUserSuccess="editSelectedUserSuccess" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :is-editing="isEditing" :component="modalComponent" :title="modalTitle" :is-admin="true" :selected-user="selectedUser"/>
    <confirm-dialog :message="message" :data-obj="dataObj" :callback="callback" :confirm.sync="confirm"></confirm-dialog>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'
import Modal from 'components/Modal'
import ConfirmDialog from 'components/ConfirmDialog'

export default {
  name: 'Admin',
  components: { ConfirmDialog, Modal },
  data () {
    return {
      subscriptionPeriod: null,
      haveToBlock: false,
      message: undefined,
      dataObj: undefined,
      callback: undefined,
      confirm: false,
      selectedUser: undefined,
      isEditing: false,
      modal: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      classObj: {},
      viewProfileClassObj: {
        'bg-white': true
      },
      filter: '',
      date: date,
      users: [],
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
        {
          name: 'blocked',
          required: true,
          label: 'Blocca/Sblocca',
          align: 'center',
          headerClasses: 'text-weight-bold'
        },
        { name: 'payed', required: true, label: 'Abbonamento', align: 'center' },
        { name: 'annual', required: true, label: 'Annuale', align: 'center' },
        { name: 'biennial', required: true, label: 'Biennale', align: 'center' },
        { name: 'soaFile', label: 'Soa File', align: 'center' },
        { name: 'isoFile', label: 'Iso File', align: 'center' },
        { name: 'fgasFile', label: 'FGas File', align: 'center' },
        { name: 'antimafiaFile', required: true, label: 'Antimafia File', align: 'center' },
        { name: 'lendingFile', required: true, label: 'Prestazione File', align: 'center' },
        { name: 'certificateFile', required: true, label: 'Certificato o Visura Camerale File', align: 'center' },
        { name: 'durcRegolarityFile', required: true, label: 'Regolarità Durc File', align: 'center' },
        { name: 'delete', required: true, label: 'Elimina', align: 'center' }
      ],
      data: []
    }
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'updateLoggedUser',
      'deleteUser'
    ]),
    async editSelectedUserSuccess () {
      await this.loadUsers()
    },
    openConfirmDialog (data, message, callback, haveToBlock, period) {
      if (haveToBlock) {
        this.haveToBlock = haveToBlock
      }
      if (period) {
        this.subscriptionPeriod = period
      }
      this.callback = callback
      this.dataObj = data
      this.message = message
      this.confirm = true
    },
    openModal (component, title, isMaximized, classObj, isEditing) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
      this.isEditing = isEditing
    },
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
    viewSelectedProfile (user) {
      this.selectedUser = user
      this.openModal('sign-in', 'MODIFICA UTENTE - VISTA ADMIN', true, this.viewProfileClassObj, true)
    },
    downloadFile (path) {
      window.open('http://localhost:3000/' + path)
    },
    confirmUser (user) {
      if (user) {
        user.payed = true
        user.subscriptionDate = new Date()
        if (this.subscriptionPeriod === 1) {
          user.annual = true
        } else {
          user.biennial = true
        }
        this.update(user)
      }
    },
    async update (user) {
      console.log('this.haveToBlock', this.haveToBlock)
      user.blocked = this.haveToBlock
      const obj = {
        pathParam: user._id,
        body: user
      }
      await this.updateLoggedUser(obj)
      await this.loadUsers()
    },
    async removeUser (user) {
      this.$q.loading.show()
      const obj = {
        pathParam: user._id
      }
      await this.deleteUser(obj)
      await this.loadUsers()
    },
    async loadUsers () {
      const { users } = await this.fetchUsers()
      this.users = users
      this.getData()
      this.$q.loading.hide()
    },
    getDaysLeftToEndSubscription (user) {
      const period = user.annual ? 1 : 2
      const expirySubscriptionDate = date.addToDate(new Date(user.subscriptionDate), { year: period })
      if (date.getDateDiff(expirySubscriptionDate, new Date(), 'days') >= 0) {
        return 'Scade tra: ' + date.getDateDiff(expirySubscriptionDate, new Date(), 'days') + ' giorni'
      } else {
        return 'SCADUTO'
      }
    },
    getDaysLeftToEndFile (fileDate, user) {
      if (date.getDateDiff(fileDate, new Date(), 'days') > 0) {
        user.needBlock = true
        return 'Scade tra: ' + date.getDateDiff(fileDate, new Date(), 'days') + ' giorni'
      } else {
        user.needBlock = true
        return 'SCADUTO'
      }
    }
  },
  async mounted () {
    this.$q.loading.show()
    await this.loadUsers()
  }
}
</script>

<style scoped>

</style>
