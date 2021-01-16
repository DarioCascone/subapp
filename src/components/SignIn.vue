<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog @hide="hideDialog" persistent v-model="alert">
        <q-card>
          <q-card-section class="flex justify-between">
            <div class="text-h6">Registrati</div>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="q-pa-md">
              <form class='register-form'>
                <q-stepper
                  v-model="step"
                  ref="stepper"
                  alternative-labels
                  color="primary"
                  animated
                >
                  <q-step
                    :name="1"
                    title="Informazioni generali"
                    icon="settings"
                    :done="step > 1"
                  >

                  </q-step>

                  <q-step
                    :name="2"
                    title="Dati Azienda"
                    icon="create_new_folder"
                    :done="step > 2"
                  >
                    Inserisci quì i dati della tua azienda.
                  </q-step>

                  <q-step
                    :name="3"
                    title="Consensi"
                    icon="add_comment"
                  >
                    Leggi e accetta i consensi per proseguire con la registrazione.
                  </q-step>

                  <template v-slot:navigation>
                    <q-stepper-navigation>
                      <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
                      <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Indietro" class="q-ml-sm" />
                    </q-stepper-navigation>
                  </template>
                </q-stepper>
              </form>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      step: 1,
      alert: false
    }
  },
  props: ['showAlert'],
  methods: {
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    }
  },
  watch: {
    showAlert (newValue, oldValue) {
      if (oldValue !== newValue) {
        this.alert = newValue
      }
    }
  }
}
</script>

<style scoped>

</style>
