<template>
  <q-dialog v-model="localConfirm"
            persistent
            @hide="hideDialog"
  >
    <q-card class="q-pa-md">
      <q-card-actions class="column" align="center">
        <div class="q-ml-sm q-pb-lg" style="font-size: 1.3rem">{{message}}</div>
        <div class="flex justify-around full-width">
          <q-btn push label="Annulla" color="negative" v-close-popup />
          <q-btn push label="Conferma" color="positive" @click="executeCallback" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: ['confirm', 'callback', 'dataObj', 'message'],
  data () {
    return {
      localConfirm: this.confirm
    }
  },
  methods: {
    hideDialog () {
      this.$emit('update:confirm', this.localConfirm)
    },
    async executeCallback () {
      this.$emit('update:confirm', false)
      await this.callback(this.dataObj)
    }
  },
  watch: {
    confirm (newVal, oldVal) {
      if (oldVal !== newVal) {
        this.localConfirm = newVal
      }
    }
  }
}
</script>

<style scoped>

</style>
