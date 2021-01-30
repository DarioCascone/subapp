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
                        <div class="form-group" :class="{'form-group--error': $v.companyName.$error }">
                          <q-input outlined v-model="companyName" type="text" :name="companyName" label="Ragione sociale"  :autofocus=true
                                   lazy-rules
                                   :rules="[ val => (val && $v.companyName.required) || 'Field is required!']" >
                            <template v-slot:append>
                              <q-icon name="info">
                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                  {{$t('signin.tooltip.companyName')}}
                                </q-tooltip>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                        <!--<div v-if="$v.companyName.$dirty">
                          <div class="error" v-if="!$v.companyName.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Forma Giuridica -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.legalForm.$error }">
                          <q-select outlined v-model="legalForm" :options="legalFormOptions" label="Forma Giuridica"
                                    lazy-rules
                                    :rules="[ val => (val && $v.legalForm.required) || 'Field is required!']" />
                        </div>
                        <!--<div v-if="$v.legalForm.$dirty">
                          <div class="error" v-if="!$v.legalForm.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Codice SDI -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.SDICode.$error }">
                          <q-input outlined v-model="SDICode" type="text" label="Codice SDI"
                                   lazy-rules
                                   :rules="[ val => (val && $v.SDICode.required) || 'Field is required!', val => (val && $v.SDICode.minLength) || 'SDI code must have 7 letters!']">
                            <template v-slot:append>
                              <q-icon name="info">
                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                  {{$t('signin.tooltip.SDICode')}}
                                </q-tooltip>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                        <!--<div v-if="$v.SDICode.$dirty">
                          <div class="error row" v-if="!$v.SDICode.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.SDICode.minLength">{{$t('signin.minLength')}}{{$v.SDICode.$params.minLength.min}}</div>
                        </div>-->
                      </div>

                      <!-- P.IVA -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.vatNumber.$error }">
                          <q-input outlined v-model="vatNumber" type="text" label="Partita IVA"
                                   lazy-rules
                                   :rules="[ val => (val && $v.vatNumber.required) || 'Field is required!', val => (val && $v.vatNumber.isVatNumber) || 'Vat Number not valid!']" />
                        </div>
                        <!--<div v-if="$v.vatNumber.$dirty">
                          <div class="error" v-if="!$v.vatNumber.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.vatNumber.isVatNumber && $v.vatNumber.required">pfdjsdjkbfsdjhsda</div>
                        </div>-->
                      </div>

                      <!-- CF -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.fiscalCode.$error }">
                          <q-input outlined v-model="fiscalCode" type="text" label="Codice Fiscale" lazy-rules
                                   :rules="[ val => (val && $v.fiscalCode.required) || 'Field is required!', val => (val && $v.fiscalCode.isFiscalCode) || 'Fiscal Code not valid!']" />
                        </div>
                        <!--<div v-if="$v.fiscalCode.$dirty">
                          <div class="error" v-if="!$v.fiscalCode.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.fiscalCode.isFiscalCode && $v.fiscalCode.required">cf non val</div>
                        </div>-->
                      </div>

                      <!-- Nazione -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.country.$error }">
                          <q-select @input="getRegions" outlined v-model="country" :options="countryOptions" label="Nazione"  option-label="name" option-value="code"
                                    lazy-rules
                                    :rules="[ val => (val && $v.country.required) || 'Field is required!']" />
                        </div>
                        <!--<div v-if="$v.country.$dirty">
                          <div class="error" v-if="!$v.country.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Regione -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.region.$error }">
                          <q-select @input="getProvinces" :disable="!(country && regionOptions.length>0)" :readonly="!(country && regionOptions.length>0)" option-label="name" option-value="code" outlined v-model="region" :options="regionOptions" label="Regione"
                                    lazy-rules
                                    :rules="[ val => (val && $v.region.required) || 'Field is required!']" />
                        </div>
                        <!--<div v-if="$v.region.$dirty">
                          <div class="error" v-if="!$v.region.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Province -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.province.$error }">
                          <q-select @input="getCities" :disable="!(region && provinceOptions.length>0)" :readonly="!(region && provinceOptions.length>0)" option-label="name" option-value="code" outlined v-model="province" :options="provinceOptions" label="Provincia"
                                    lazy-rules
                                    :rules="[ val => (val && $v.province.required) || 'Field is required!']" />
                        </div>
                        <!--<div v-if="$v.province.$dirty">
                          <div class="error" v-if="!$v.province.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Città -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.city.$error }">
                          <q-select :disable="!(province && cityOptions.length>0)" :readonly="!(province && cityOptions.length>0)" option-label="name" option-value="code" outlined v-model="city" :options="cityOptions" label="Città"
                                    lazy-rules
                                    :rules="[ val => (val && $v.city.required) || 'Field is required!']" />
                        </div>
                        <!--<div v-if="$v.city.$dirty">
                          <div class="error" v-if="!$v.city.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Indirizzo -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.registeredOfficeAddress.$error }">
                          <q-input outlined v-model="registeredOfficeAddress" type="text" label="Indirizzo sede legale"  lazy-rules
                                   :rules="[ val => (val && $v.registeredOfficeAddress.required) || 'Field is required!']" />
                        </div>
                        <!--<div v-if="$v.registeredOfficeAddress.$dirty">
                          <div class="error" v-if="!$v.registeredOfficeAddress.required">{{$t('signin.required')}}</div>
                        </div>-->
                      </div>

                      <!-- Cap -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.postalCode.$error }">
                          <q-input outlined v-model="postalCode" type="number" label="CAP"  lazy-rules
                            :rules="[ val => (val && $v.postalCode.required) || 'Field is required!', val => (val && $v.postalCode.isPostalCode) || 'Postal Code not valid!']" />
                        </div>
                        <!--<div v-if="$v.postalCode.$dirty">
                          <div class="error" v-if="!$v.postalCode.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.postalCode.isPostalCode && $v.postalCode.required">Cap non valido</div>
                        </div>-->
                      </div>

                      <!-- Sito web -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.webSite.$error }">
                          <q-input outlined v-model="webSite" type="text" label="Sito Web"  lazy-rules
                                   :rules="[ val => (val && $v.webSite.required) || 'Field is required!', val => (val && $v.webSite.isWebSite) || 'Website not valid!']" />
                        </div>
                        <!--<div v-if="$v.webSite.$dirty">
                          <div class="error" v-if="!$v.webSite.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.webSite.isWebSite && $v.webSite.required">sito non validop</div>
                        </div>-->
                      </div>

                      <!-- Pec -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.PEC.$error }">
                          <q-input outlined v-model="PEC" type="text" label="email PEC"  lazy-rules
                                   :rules="[ val => (val && $v.PEC.required) || 'Field is required!', val => (val && $v.PEC.email) || 'Email PEC not valid!']" />
                        </div>
                        <!--<div v-if="$v.PEC.$dirty">
                          <div class="error" v-if="!$v.PEC.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.PEC.email && $v.PEC.required">Pec non valida</div>
                        </div>-->
                      </div>

                      <!-- Telefono -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.telephoneNumber.$error }">
                          <q-input outlined v-model="telephoneNumber" type="number" label="Telefono"  lazy-rules
                                   :rules="[ val => (val && $v.telephoneNumber.required) || 'Field is required!', val => (val && $v.telephoneNumber.isTelephoneNumber) || 'Telephone Number not valid!']" />
                        </div>
                        <!--<div v-if="$v.telephoneNumber.$dirty">
                          <div class="error" v-if="!$v.telephoneNumber.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.telephoneNumber.isTelephoneNumber && $v.telephoneNumber.required">Tel non valido</div>
                        </div>-->
                      </div>

                      <!-- Username -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.username.$error }">
                          <q-input outlined v-model="username" type="text" label="Username"
                                   lazy-rules
                                   :rules="[ val => (val && $v.username.required) || 'Field is required!', val => (val && $v.username.email) || 'Username not valid!']" />
                        </div>
                        <!--<div v-if="$v.username.$dirty">
                          <div class="error" v-if="!$v.username.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.username.email && $v.username.required">Username non valido</div>
                        </div>-->
                      </div>

                      <!-- Password -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" :class="{'form-group--error': $v.password.$error }">
                          <q-input outlined v-model="password" label="Password" :type="isPsw ? 'password' : 'text'" lazy-rules
                                   :rules="[ val => (val && $v.password.required) || 'Field is required!', val => (val && $v.password.isPassword) || 'Password not valid!']" >
                            <template v-slot:append>
                              <q-icon
                                :name="isPsw ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPsw = !isPsw"
                              />
                            </template>
                          </q-input>
                        </div>
                        <!--<div v-if="$v.password.$dirty">
                          <div class="error" v-if="!$v.password.required">{{$t('signin.required')}}</div>
                          <div class="error" v-if="!$v.password.isPassword && $v.password.required">Password non valida</div>
                        </div>-->
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
import { required, minLength, email } from 'vuelidate/lib/validators'
import { legalFormOptions } from '../costants/options'
import { isFiscalCode, isVatNumber, isPostalCode, isWebSite, isTelephoneNumber, isPassword } from '../validations/validator'

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
      isFiscalCode: isFiscalCode,
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
      if (this.$v.$invalid) {

      } else {

      }
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
      minLength: minLength(7)
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
