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
                          <q-select outlined option-dense v-model="legalForm" name="legalForm" :options="legalFormOptions" label="Forma Giuridica"
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
                          <q-select @input="getRegionOptions" outlined :options-dense="true" v-model="country" :options="countryOptions" label="Nazione"
                                    option-label="description" option-value="_id"
                                    reactive-rules name="country" emit-value map-options
                                    :rules="[ (val) => isValid('country', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Regione -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group" >
                          <q-select @input="getProvinceOptions" :disable="!(country && regionOptions.length>0)" :readonly="!(country && regionOptions.length>0)"
                                    option-label="description" option-value="_id" outlined :options-dense="true"
                                    v-model="region" :options="regionOptions" label="Regione" emit-value
                                    reactive-rules name="region" map-options
                                    :rules="[ (val) => isValid('region', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Province -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-select @input="getCityOptions" :disable="!(region && provinceOptions.length>0)" :readonly="!(region && provinceOptions.length>0)"
                                    option-label="description" option-value="_id" outlined option-dense v-model="province" :options="provinceOptions" label="Provincia"
                                    reactive-rules name="region" emit-value map-options
                                    :rules="[ (val) => isValid('province', val, $v) ]" />
                        </div>
                      </div>

                      <!-- Città -->
                      <div class="field-container col-lg-4 col-md-6">
                        <div class="form-group">
                          <q-select :disable="!(province && cityOptions.length>0)" :readonly="!(province && cityOptions.length>0)"
                                    option-label="description" option-value="_id" outlined option-dense v-model="city" :options="cityOptions" label="Città"
                                    reactive-rules name="city" :options-dense="true" map-options
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

                      <div class="first-panel panel-container row">

                        <!-- Certificato -->
                        <div class="row col-6 justify-between">
                          <p>Certificato o Visura camerale</p>
                          <q-input label="Data Scadenza" outlined v-model="certificateDate" mask="##/##/####">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                  <q-date :locale="currentLocale" v-model="certificateDate" :options="calendarOption"  mask="DD/MM/YYYY">
                                    <div class="row items-center justify-end q-gutter-sm">
                                      <q-btn label="Annulla" color="primary" flat v-close-popup />
                                      <q-btn label="OK" color="primary" flat v-close-popup />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>

                        <!-- Regolarità Durc -->

                        <!-- file picker -->
                        <template>
                          <div class="q-pa-md column items-start q-gutter-y-md col-12">
                            <q-file
                              :value="files"
                              @input="updateFiles"
                              label="Carica quì i documenti richiesti"
                              outlined
                              multiple
                              max-files="3"
                              counter
                              :clearable="!isUploading"
                              style="max-width: 400px"
                            >
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                              <template v-slot:file="{ index, file }">
                                <q-chip
                                  class="full-width q-my-xs"
                                  :removable="isUploading && uploadProgress[index].percent < 1"
                                  square
                                  @remove="cancelFile(index)"
                                >
                                  <q-linear-progress
                                    class="absolute-full full-height"
                                    :value="uploadProgress[index].percent"
                                    :color="uploadProgress[index].color"
                                    track-color="grey-2"
                                  />

                                  <q-avatar>
                                    <q-icon :name="uploadProgress[index].icon" />
                                  </q-avatar>

                                  <div class="ellipsis relative-position">
                                    {{ file.name }}
                                  </div>

                                  <q-tooltip>
                                    {{ file.name }}
                                  </q-tooltip>
                                </q-chip>
                              </template>

                            </q-file>
                          </div>
                        </template>
                      </div>

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
import { mapActions } from 'vuex'
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
      files: null,
      uploadProgress: [],
      uploading: null,
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
      countryOptions: [],
      regionOptions: [],
      provinceOptions: [],
      cityOptions: [],
      currentLocale: {
        days: '_Lunedì_Martedì_Mercoledì_Giovedì_Sabato_Domenica'.split('_'),
        daysShort: 'Lun_Mar_Mer_Gio_Ven_Sab_Dom'.split('_'),
        months: 'Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre'.split('_'),
        monthsShort: 'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic'.split('_'),
        firstDayOfWeek: 0
      },
      certificateDate: '',
      proxycertificateDate: ''
    }
  },
  props: ['showAlert'],
  computed: {
    isUploading () {
      return this.uploading !== null
    },

    canUpload () {
      return this.files !== null
    }
  },
  methods: {
    ...mapActions([
      'getCountries',
      'getRegions',
      'getProvinces',
      'getCities'
    ]),
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    },
    calendarOption (date) {
      const currentTime = new Date()
      console.log(currentTime)
      return date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/')
    },
    onSignin () {
      this.$v.$touch()
      this.$forceUpdate()
    },
    async getRegionOptions () {
      this.regionOptions = []
      this.provinceOptions = []
      this.cityOptions = []
      this.region = undefined
      this.province = undefined
      this.city = undefined
      const resp = await this.getRegions(this.country)
      this.regionOptions = resp.regions
    },
    async getProvinceOptions () {
      this.provinceOptions = []
      this.cityOptions = []
      this.province = undefined
      this.city = undefined
      const resp = await this.getProvinces(this.region)
      this.provinceOptions = resp.provinces
    },
    async getCityOptions () {
      this.cityOptions = []
      this.city = undefined
      const resp = await this.getCities(this.province)
      this.cityOptions = resp.cities
    },
    cancelFile (index) {
      this.uploadProgress[index] = {
        ...this.uploadProgress[index],
        error: true,
        color: 'orange-2'
      }
    },

    updateFiles (files) {
      this.files = files
      this.uploadProgress = (files || []).map(file => ({
        error: false,
        color: 'green-2',
        percent: 0,
        icon: file.type.indexOf('video/') === 0
          ? 'movie'
          : (file.type.indexOf('image/') === 0
            ? 'photo'
            : (file.type.indexOf('audio/') === 0
              ? 'audiotrack'
              : 'insert_drive_file'
            )
          )
      }))
    },

    upload () {
      clearTimeout(this.uploading)

      const allDone = this.uploadProgress.every(progress => progress.percent === 1)

      this.uploadProgress = this.uploadProgress.map(progress => ({
        ...progress,
        error: false,
        color: 'green-2',
        percent: allDone === true ? 0 : progress.percent
      }))

      this.__updateUploadProgress()
    },

    __updateUploadProgress () {
      let done = true

      this.uploadProgress = this.uploadProgress.map(progress => {
        if (progress.percent === 1 || progress.error === true) {
          return progress
        }

        const percent = Math.min(1, progress.percent + Math.random() / 10)
        const error = percent < 1 && Math.random() > 0.95

        if (error === false && percent < 1 && done === true) {
          done = false
        }

        return {
          ...progress,
          error,
          color: error === true ? 'red-2' : 'green-2',
          percent
        }
      })

      this.uploading = done !== true
        ? setTimeout(this.__updateUploadProgress, 300)
        : null
    }
  },
  async created () {
    const resp = await this.getCountries()
    this.countryOptions = resp.countries
  },
  beforeDestroy () {
    clearTimeout(this.uploading)
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
