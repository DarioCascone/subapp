<template>
  <q-dialog v-model="localModal"
            persistent
            :maximized="isMaximized"
            transition-show="slide-up"
            transition-hide="slide-down"
            @hide="hideDialog">
      <q-card :class="{'bg-secondary': component === 'login'}">
        <q-card-section class="relative-position bg-secondary ">
          <div class="text-h6 text-white text-center text-capitalize">{{ title }}</div>
          <div class="absolute-top-right z-max">
            <q-btn class="text-white" icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section :class="classObj">
          <login @loginSuccess="loginSuccess" v-if="component === 'login'" />
          <sign-in :is-editing="isEditing" @signupSuccess="signupSuccess" v-if="component === 'sign-in'" ></sign-in>
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
  props: ['component', 'modal', 'title', 'isMaximized', 'classObj', 'isEditing'],
  data () {
    return {
      localModal: this.modal
    }
  },
  methods: {
    loginSuccess (value) {
      this.$emit('update:modal', value)
    },
    signupSuccess (value) {
      this.$emit('update:modal', value)
      this.$emit('signupSuccess')
    },
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
