<template>
  <q-layout view="lHh lpr lff">
    <q-header class="q-py-md bg-primary" :style="'border-bottom: 2px solid #165081'">
      <div class="flex justify-between q-mx-lg">
        <router-link to="/">
          <q-avatar style="border-radius: 0 !important;">
            <img src="../assets/logo-subapp.png">
          </q-avatar>
        </router-link>
        <q-tabs v-if="$route.name !== 'termCondition'"
                dense
                align="justify"
                :breakpoint="0">
          <q-tab  @click="scrollToElement('id_how_works')" label="Come Funziona" />
          <q-tab  @click="scrollToElement('id_pricing')" label="Prezzi" />
          <q-tab v-if="!isAuthenticated" @click="openModal('login', 'accedi', false, loginClassObj)" label="Accedi"/>
          <q-tab v-if="!isAuthenticated" @click="openModal('sign-in', 'registrati', true, singInClassObj)" label="Registrati"/>
          <q-tab v-if="isAuthenticated" label="Logout"/>
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <modal  :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>

  </q-layout>

</template>

<script>
import { scroll } from 'quasar'
import Modal from 'components/Modal'
import { mapGetters } from 'vuex'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  components: { Modal },
  data () {
    return {
      name: 'MainLayout',
      modal: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      classObj: {},
      loginClassObj: {
        'bg-white': true
      },
      singInClassObj: {
        'q-pa-none': true
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isAuthenticated'
    ])
  },
  methods: {
    scrollToElement (id) {
      const el = document.getElementById(id)
      const target = getScrollTarget(el)
      const offset = el.offsetTop + 3
      const duration = 900
      setScrollPosition(target, offset, duration)
    },
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      console.log(this.modalComponent)
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
    }
  },
  created () {

  }
}
</script>
