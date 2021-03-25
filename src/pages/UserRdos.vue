<template>
  <q-page v-if="userLogged">
    <h5 class="text-center no-margin q-py-lg">Lista RDO caricate</h5>
    <div class="q-px-lg">
      <table-rdo @openSelectedRdo="openSelectedRdo" @resetSelectedRdo="selectedRdo= null" @openModal="openModal('load-rdo', 'Carica RDO', true, loadRdoClassObj, false)"></table-rdo>
    </div>
    <modal :selected-rdo="selectedRdo" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
  </q-page>
</template>

<script>
import TableRdo from 'components/TableRdo'
import { mapGetters } from 'vuex'
import Modal from 'components/Modal'

export default {
  name: 'UserRdos',
  components: { Modal, TableRdo },
  data () {
    return {
      loadRdoClassObj: {
        'q-pa-none': true
      },
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      modal: false,
      selectedRdo: null,
      classObj: {}
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>
