<template>
  <q-layout view="lHh lpR fff">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          subAPP
        </q-toolbar-title>

        <!--<q-input v-model="name" :value="name"></q-input>-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white q-py-lg">
      <div class="text-center">
        FOOTER
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      name: 'Antonio'
    }
  }
}
</script>
