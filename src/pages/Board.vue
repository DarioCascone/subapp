<template>
<q-page>
  <div v-if="userLogged && boardRdosLoaded" >
    <h5 class="text-center">Lista RDO di tuo interesse</h5>
    <div class="q-px-lg">
      <table-rdo @openModal="openModal('load-rdo', 'Carica RDO', true, loadRdoClassObj, false)" :allRdos="true"></table-rdo>
    </div>
  </div>
  <div v-if="userLogged && !boardRdosLoaded" class="flex column justify-center items-center q-pt-xl" >
    <h5 class="text-center no-margin q-pb-lg">Ancora nessuna richiesta di offerta caricata.</h5>
    <q-btn push
             :ripple="false"
             label="Carica RDO"
             class="q-pa-xs"
             @click="openModal('load-rdo', 'Carica RDO', true, loadRdoClassObj, false)"
             color="secondary"
    />
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
      classObj: {},
      boardRdosLoaded: true
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
  async mounted () {
    await this.fetchRdos()
    this.boardRdosLoaded = this.boardRdos.length > 0
  }
}
</script>

<style scoped>

</style>
