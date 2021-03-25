<template>
<q-page>
  <div v-if="userLogged && boardRdosLoaded" >
    <h5 class="text-center">Lista RDO di tuo interesse</h5>
    <div class="q-px-lg">
      <table-rdo @resetSelectedRdo="selectedRdo= null" @openSelectedRdo="openSelectedRdo" @openModal="openModal('load-rdo', 'Carica RDO', true, loadRdoClassObj, false)" :allRdos="true"></table-rdo>
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
  <modal :selected-rdo="selectedRdo" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
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
      boardRdosLoaded: true,
      selectedRdo: null
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
    },
    openSelectedRdo (rdo) {
      this.selectedRdo = rdo
      this.openModal('load-rdo', 'RDO di ' + rdo.contractor, true, this.loadRdoClassObj, false)
    },
    async loadBoard () {
      this.$q.loading.show()
      await this.fetchRdos()
      this.$q.loading.hide()
      this.boardRdosLoaded = this.boardRdos.length > 0
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      boardRdos: 'boardRdos'
    })
  },
  watch: {
    boardRdos: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          this.boardRdosLoaded = newVal.length > 0
        }
      }
    }
  },
  async mounted () {
    await this.loadBoard()
  }
}
</script>

<style scoped>

</style>
