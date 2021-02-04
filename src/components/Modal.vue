<template>
  <q-dialog v-model="modal">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" @click="hideDialog"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <login v-if="component === 'login'">

          </login>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>

import Login from 'components/Login'

export default {
  name: 'Modal',
  components: { Login },
  props: ['component', 'modal'],
  methods: {
    hideDialog () {
      this.$emit('update:modal', false)
    }
  }
}

</script>

<style scoped>

</style>
