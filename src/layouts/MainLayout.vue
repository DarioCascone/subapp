<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-sm bg-primary" :style="'border-bottom: 2px solid #165081'">
      <q-toolbar>
        <span :style="'font-size: 35px'" class="my-font text-h6 q-mr-md cursor-pointer">Subapp</span>
        <q-space ></q-space>
        <q-tabs>
          <q-tab class="q-mr-sm q-py-xs custom_tab" @click="scrollToElement('id_about_us')" style="width:120px;min-height:auto !important;color: white" label="About Us" />
          <q-tab class="q-mr-sm q-py-xs custom_tab" @click="scrollToElement('id_pricing')" style="width:120px;min-height:auto !important;color: white" label="Prezzi" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-primary text-white">
      <!-- q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar -->
    </q-footer>

  </q-layout>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  data () {
    return {
      left: false,
      name: 'MainLayout'
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
