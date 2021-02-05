<template>
  <q-dialog v-model="localModal"
            persistent
            transition-show="slide-down"
            @hide="hideDialog">
      <q-card class="bg-secondary">
        <q-card-section class="bg-secondary relative-position">
          <div class="text-h6 text-white text-center text-capitalize">{{ title }}</div>
          <div class="absolute-top-right z-max">
            <q-btn class="text-white" icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="bg-white">
          <login v-if="component === 'login'" />
          <sign-in v-if="component === 'sign-in'" ></sign-in>
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>

import Login from 'components/Login'
import SignIn from 'components/SignIn'

export default {
  name: 'Modal',
  components: { SignIn, Login },
  props: ['component', 'modal', 'title'],
  data () {
    return {
      localModal: this.modal
    }
  },
  methods: {
    hideDialog () {
      this.$emit('update:modal', this.localModal)
    }
  },
  watch: {
    modal (newVal, oldVal) {
      if (oldVal !== newVal) {
        this.localModal = newVal
      }
    }
  }
}
</script>
