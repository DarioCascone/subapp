<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog @hide="hideDialog" persistent v-model="alert">
        <q-card>
          <q-card-section class="flex justify-between">
            <div class="text-h6">{{$t('signin.title')}}</div>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="q-pa-md">
              <q-form @submit="onSignin" class='register-form'>
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
                    <div class="prova">
                      <!-- Ragione Sociale -->
                      <div class="field-container">
                        <div class="form-group" :class="{'form-group--error': $v.ragioneSociale.$error }">
                          <q-input outlined v-model="ragioneSociale" type="text" :name="ragioneSociale" label="Ragione sociale"  :autofocus=true />
                          <q-icon name="info">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                              {{$t('signin.tooltip.ragioneSociale')}}
                            </q-tooltip>
                          </q-icon>
                        </div>
                        <div v-if="$v.ragioneSociale.$dirty">
                          <div class="error" v-if="!$v.ragioneSociale.required">{{$t('signin.required')}}</div>
                        </div>
                      </div>

                      <!-- Forma Giuridica -->
                      <div class="field-container">
                        <div class="form-group" :class="{'form-group--error': $v.formaGiuridica.$error }">
                          <q-select outlined v-model="formaGiuridica" :options="formaGiuridicaOptions" label="Forma Giuridica" />
                        </div>
                        <div v-if="$v.formaGiuridica.$dirty">
                          <div class="error" v-if="!$v.formaGiuridica.required">{{$t('signin.required')}}</div>
                        </div>
                      </div>

                      <!-- Codice SDI -->
                      <div class="field-container">
                        <div class="form-group" :class="{'form-group--error': $v.codiceSDI.$error }">
                          <q-input outlined v-model="codiceSDI" type="text" label="Codice SDI" />
                          <q-icon name="info">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                              {{$t('signin.tooltip.codiceSDI')}}
                            </q-tooltip>
                          </q-icon>
                        </div>
                        <div v-if="$v.codiceSDI.$dirty">
                          <div class="error row" v-if="!$v.codiceSDI.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.codiceSDI.minLength">{{$t('signin.minLength')}}{{$v.codiceSDI.$params.minLength.min}}</div>
                        </div>
                      </div>

                      <!-- P.IVA -->
                      <div class="field-container">
                        <div class="form-group" :class="{'form-group--error': $v.partitaIVA.$error }">
                          <q-input outlined v-model="partitaIVA" type="text" label="Partita IVA" />
                        </div>
                        <div v-if="$v.partitaIVA.$dirty">
                          <div class="error" v-if="!$v.partitaIVA.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.partitaIVA.isPartitaIVA && $v.partitaIVA.required">pfdjsdjkbfsdjhsda</div>
                        </div>
                      </div>

                      <!-- CF -->
                      <div class="field-container">
                        <div class="form-group" :class="{'form-group--error': $v.codiceFiscale.$error }">
                          <q-input outlined v-model="codiceFiscale" type="text" label="Codice Fiscale" />
                        </div>
                        <div v-if="$v.codiceFiscale.$dirty">
                          <div class="error" v-if="!$v.codiceFiscale.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.codiceFiscale.isFiscalCode && $v.codiceFiscale.required">cf non val</div>
                        </div>
                      </div>

                    </div>
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
                      <q-btn @click="$refs.stepper.next()" :type="step === 3 ? 'submit' : 'button'" color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
                      <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Indietro" class="q-ml-sm" />
                    </q-stepper-navigation>
                  </template>
                </q-stepper>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { formaGiuridicaOptions } from '../costants/options'
import { isFiscalCode, isPartitaIVA } from '../validations/validator'

export default {
  name: 'SignIn',
  data () {
    return {
      step: 1,
      alert: false,
      ragioneSociale: '',
      formaGiuridica: '',
      formaGiuridicaOptions: formaGiuridicaOptions,
      codiceSDI: '',
      partitaIVA: '',
      codiceFiscale: '',
      isFiscalCode: isFiscalCode,
      isPartitaIVA: isFiscalCode
    }
  },
  props: ['showAlert'],
  methods: {
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    },
    onSignin () {
      this.$v.$touch()
      if (this.$v.$invalid) {

      } else {

      }
    }
  },
  watch: {
    showAlert (newValue, oldValue) {
      if (oldValue !== newValue) {
        this.alert = newValue
      }
    }
  },
  validations: {
    ragioneSociale: {
      required
    },
    formaGiuridica: {
      required
    },
    codiceSDI: {
      required,
      minLength: minLength(7)
    },
    partitaIVA: {
      required,
      isPartitaIVA
    },
    codiceFiscale: {
      required,
      isFiscalCode
    }
  }
}
</script>

<style scoped>

</style>
