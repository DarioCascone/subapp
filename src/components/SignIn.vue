<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog @hide="hideDialog" transition-show="fade" full-width persistent v-model="alert">
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
                  keep-alive
                >
                  <q-step
                    class="scroll"
                    :name="1"
                    title="Informazioni generali"
                    icon="settings"
                    :done="step > 1"
                  >
                    <div class="step-container row">

                      <!-- Ragione Sociale -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-input outlined v-model="companyName" type="text" name="companyName" label="Ragione sociale"
                                   reactive-rules
                                   :rules="[ (val) => isValid('companyName', val, $v) ]" >
                            <template v-slot:append>
                              <q-icon name="info">
                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                  {{$t('signin.tooltip.companyName')}}
                                </q-tooltip>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                      </div>

                      <!-- Forma Giuridica -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-select outlined v-model="legalForm" name="legalForm" :options="legalFormOptions" label="Forma Giuridica"
                                    reactive-rules
                                    :rules="[ (val) => isValid('legalForm', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Codice SDI -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-input outlined v-model="SDICode" type="text" label="Codice SDI"
                                   reactive-rules name="SDICode"
                                   :rules="[ (val) => isValid('SDICode', val, $v) ]" >
                            <template v-slot:append>
                              <q-icon name="info">
                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                  {{$t('signin.tooltip.SDICode')}}
                                </q-tooltip>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                      </div>

                      <!-- P.IVA -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-input outlined v-model="vatNumber" type="text" label="Partita IVA"
                                   reactive-rules name="vatNumber"
                                   :rules="[ (val) => isValid('vatNumber', val, $v) ]" />
                        </div>
                      </div>

                      <!-- CF -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-input outlined v-model="fiscalCode" type="text" label="Codice Fiscale"
                                   reactive-rules name="fiscalCode"
                                   :rules="[ (val) => isValid('fiscalCode', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Nazione -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-select @input="getRegions" outlined v-model="country" :options="countryOptions" label="Nazione"  option-label="name" option-value="code"
                                    reactive-rules name="country"
                                    :rules="[ (val) => isValid('country', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Regione -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-select @input="getProvinces" :disable="!(country && regionOptions.length>0)" :readonly="!(country && regionOptions.length>0)"
                                    option-label="name" option-value="code" outlined
                                    v-model="region" :options="regionOptions" label="Regione"
                                    reactive-rules name="region"
                                    :rules="[ (val) => isValid('region', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Province -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-select @input="getCities" :disable="!(region && provinceOptions.length>0)" :readonly="!(region && provinceOptions.length>0)"
                                    option-label="name" option-value="code" outlined v-model="province" :options="provinceOptions" label="Provincia"
                                    reactive-rules name="region"
                                    :rules="[ (val) => isValid('province', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Città -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-select :disable="!(province && cityOptions.length>0)" :readonly="!(province && cityOptions.length>0)" option-label="name"
                                    option-value="code" outlined v-model="city" :options="cityOptions" label="Città"
                                    reactive-rules name="city"
                                    :rules="[ (val) => isValid('city', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Indirizzo -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-input outlined v-model="registeredOfficeAddress" type="text" label="Indirizzo sede legale"
                                   reactive-rules name="registeredOfficeAddress"
                                   :rules="[ (val) => isValid('registeredOfficeAddress', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Cap -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-input outlined v-model="postalCode" type="number" label="CAP"
                                   reactive-rules name="postalCode"
                                   :rules="[ (val) => isValid('postalCode', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Sito web -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-input outlined v-model="webSite" type="text" label="Sito Web"
                                   reactive-rules name="webSite"
                                   :rules="[ (val) => isValid('webSite', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Pec -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-input outlined v-model="PEC" type="text" label="email PEC"
                                   reactive-rules name="PEC"
                                   :rules="[ (val) => isValid('PEC', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Telefono -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-input outlined v-model="telephoneNumber" type="number" label="Telefono"
                                   reactive-rules name="telephoneNumber"
                                   :rules="[ (val) => isValid('telephoneNumber', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Username -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.username.$error }">
                          <q-input outlined v-model="username" type="text" label="Username"
                                   reactive-rules name="username"
                                   :rules="[ (val) => isValid('username', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Password -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.password.$error }">
                          <q-input outlined v-model="password" label="Password" :type="isPsw ? 'password' : 'text'"
                                   reactive-rules name="password"
                                   :rules="[ (val) => isValid('password', val, $v) ]" >
                            <template v-slot:append>
                              <q-icon
                                :name="isPsw ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPsw = !isPsw"
                              />
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                  </q-step>

                  <q-step
                    class="scroll"
                    :name="2"
                    title="Dati Azienda"
                    icon="create_new_folder"
                    :done="step > 2"
                  >
                    <div class="step-container">

                    </div>
                  </q-step>

                  <q-step
                    class="scroll"
                    :name="3"
                    title="Consensi"
                    icon="add_comment"
                  >
                    Leggi e accetta i consensi per proseguire con la registrazione.
                  </q-step>

                  <template v-slot:navigation>
                    <q-stepper-navigation class="flex justify-between">
                      <div>
                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Indietro" class="q-ml-sm" />
                      </div>
                      <div>
                       <!--<q-btn @click="$refs.stepper.next()" :type="step === 3 ? 'submit' : 'button'"  color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
-->
                        <q-btn @click="$refs.stepper.next()" type="submit"  color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
                      </div>
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
import { required, email } from 'vuelidate/lib/validators'
import { legalFormOptions } from '../costants/options'
import {
  isFiscalCode,
  isSDICode,
  isVatNumber,
  isPostalCode,
  isWebSite,
  isTelephoneNumber,
  isPassword,
  isValid
} from '../validations/validator'

export default {
  name: 'SignIn',
  data () {
    return {
      step: 1,
      alert: false,
      isPsw: true,
      companyName: '',
      legalForm: '',
      legalFormOptions: legalFormOptions,
      SDICode: '',
      vatNumber: '',
      fiscalCode: '',
      country: '',
      region: '',
      province: '',
      city: '',
      registeredOfficeAddress: '',
      postalCode: '',
      webSite: '',
      PEC: '',
      telephoneNumber: '',
      username: '',
      password: '',
      isValid: isValid,
      isFiscalCode: isFiscalCode,
      isSDICode: isSDICode,
      isVatNumber: isVatNumber,
      isPostalCode: isPostalCode,
      isWebSite: isWebSite,
      isTelephoneNumber: isTelephoneNumber,
      isPassword: isPassword,
      countryOptions: ['italia', 'germania', 'francia'],
      regionOptions: ['campania', 'lombardia', 'veneto'],
      provinceOptions: ['Napoli', 'Salerno', 'Avellino'],
      cityOptions: ['Giugliano in Campania', 'Qualiano', 'Villaricca']
    }
  },
  props: ['showAlert'],
  methods: {
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    },
    onSignin () {
      this.$v.$touch()
      this.$forceUpdate()
    },
    getRegions () {

    },
    getProvinces () {

    },
    getCities () {

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
    companyName: {
      required
    },
    legalForm: {
      required
    },
    SDICode: {
      required,
      isSDICode
    },
    vatNumber: {
      required,
      isVatNumber
    },
    fiscalCode: {
      required,
      isFiscalCode
    },
    country: {
      required
    },
    region: {
      required
    },
    province: {
      required
    },
    city: {
      required
    },
    registeredOfficeAddress: {
      required
    },
    postalCode: {
      required,
      isPostalCode
    },
    webSite: {
      required,
      isWebSite
    },
    PEC: {
      required,
      email
    },
    telephoneNumber: {
      required,
      isTelephoneNumber
    },
    username: {
      required,
      email
    },
    password: {
      required,
      isPassword
    }
  }
}
</script>

<style scoped>

</style>
