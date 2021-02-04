<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-md bg-primary" :style="'border-bottom: 2px solid #165081'">
      <div class="flex justify-between q-mx-lg">
        <div :style="'font-size: 35px'" class="text-h6 cursor-pointer">Subapp</div>
        <q-tabs dense
                align="justify"
                :breakpoint="0">
          <q-tab  @click="scrollToElement('id_how_works')" label="Come Funziona" />
          <q-tab  @click="scrollToElement('id_pricing')" label="Prezzi" />
          <q-tab  @click="modal = true" label="Accedi"/>
          <q-tab  label="Registrati"/>
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!--q-footer bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer -->

    <modal :modal.sync="modal" component="login" />

  </q-layout>

</template>

<script>
import { scroll } from 'quasar'
import Modal from 'components/Modal'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  components: { Modal },
  data () {
    return {
      name: 'MainLayout',
      modal: false
    }
  },
  methods: {
    scrollToElement (id) {
      const el = document.getElementById(id)
      const target = getScrollTarget(el)
      const offset = el.offsetTop + 3
      const duration = 900
      setScrollPosition(target, offset, duration)
    }
  }
}
</script>
