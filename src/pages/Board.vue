<template>
<q-page>
  <div v-if="userLogged && this.boardRdos.length>0" >
    <h5 class="text-center">Lista RDO di tuo interesse</h5>
    <div class="q-px-lg">
      <table-rdo :allRdos="true"></table-rdo>
    </div>
  </div>
  <div v-if="this.boardRdos && this.boardRdos.length === 0">
    <h5 class="text-center">Ancora nessuna richiesta di offerta caricata.</h5>
    <div class="flex justify-center">
      <q-btn push
             :ripple="false"
             label="Carica RDO"
             class="q-pa-xs"
             @click="openModal('load-rdo', 'Carica RDO', true, loadRdoClassObj, false)"
             color="secondary"
      />
    </div>
  </div>
  <modal  :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
</q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TableRdo from 'components/TableRdo'
import Modal from 'components/Modal'

export default {
  name: 'Board',
  components: { TableRdo, Modal },
  data () {
    return {
      loadRdoClassObj: {
        'q-pa-none': true
      },
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      modal: false,
      classObj: {}
    }
  },
  methods: {
    ...mapActions([
      'fetchRdos'
    ]),
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
    }
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
