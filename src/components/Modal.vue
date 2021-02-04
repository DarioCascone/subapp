<template>
  <q-dialog v-model="localModal"
            transition-show="fade"
            @hide="hideDialog">
      <q-card class="my-card">
        <q-card-section>
          <login v-if="component === 'login'" />
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>

import Login from 'components/Login'

export default {
  name: 'Modal',
  components: { Login },
  props: ['component', 'modal'],
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
