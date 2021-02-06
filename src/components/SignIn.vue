<template>
  <q-form @submit="onSignin">
    <q-stepper
      v-model="step"
      ref="stepper"
      alternative-labels
      done-color="positive"
      error-color="negative"
      active-color="accent"
      transition-prev="fade"
      transition-next="fade"
      animated
      flat
      keep-alive
    >
      <q-step
        class="scroll"
        :name="1"
        title="Informazioni generali"
        icon="settings"
        :done="step > 1">
        <div class="row wrap justify-center content-center no-padding no-margin q-gutter-x-md q-gutter-y-xs">
          <q-input outlined v-model="username" type="text" label="Username *"
                     class="col-12 col-md-3"
                     reactive-rules name="username"
                     :rules="[ (val) => isValid('username', val, $v) ]" />

            <q-input outlined v-model="password" label="Password *" :type="isPsw ? 'password' : 'text'"
                     class="col-12 col-md-3"
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

          <q-input outlined v-model="PEC" type="text" label="email PEC"
                   class="col-12 col-md-3"
                   reactive-rules name="PEC"
                   :rules="[ (val) => isValid('PEC', val, $v) ]" />

          <q-select v-model="legalForm"
                    :options="legalFormOptions"
                    name="legalForm"
                    outlined
                    class="col-12 col-md-3"
                    option-dense
                    label="Forma Giuridica *"
                    reactive-rules
                    :rules="[ (val) => isValid('legalForm', val, $v) ]" />

          <q-input outlined v-model="telephoneNumber" type="number" label="Telefono *"
                   class="col-12 col-md-3"
                   reactive-rules name="telephoneNumber"
                   :rules="[ (val) => isValid('telephoneNumber', val, $v) ]" />

          <q-select @input="getRegionOptions"  class="col-12 col-md-3" outlined :options-dense="true" v-model="country" :options="countries" label="Nazione*"
                    option-label="description" option-value="_id"
                    reactive-rules name="country" emit-value map-options
                    :rules="[ (val) => isValid('country', val, $v) ]" />

          <q-select @input="getProvinceOptions"  class="col-12 col-md-3" :disable="!(country && regions.length>0)" :readonly="!(country && regions.length>0)"
                    option-label="description" option-value="_id" outlined :options-dense="true"
                    v-model="region" :options="regions" label="Regione *" emit-value
                    reactive-rules name="region" map-options
                    :rules="[ (val) => isValid('region', val, $v) ]" />

          <q-select @input="getCityOptions"  class="col-12 col-md-3" :disable="!(region && provinces.length>0)" :readonly="!(region && provinces.length>0)"
                    option-label="description" option-value="_id" outlined option-dense v-model="province" :options="provinces" label="Provincia *"
                    reactive-rules name="region" emit-value map-options
                    :rules="[ (val) => isValid('province', val, $v) ]" />

          <q-select :disable="!(province && cities.length>0)" :readonly="!(province && cities.length>0)"  class="col-12 col-md-3"
                    option-label="description" option-value="_id" outlined option-dense v-model="city" :options="cities" label="Città *"
                    reactive-rules name="city" :options-dense="true" map-options
                    :rules="[ (val) => isValid('city', val, $v) ]" />

          <q-input outlined
                   v-model="vatNumber"
                   class="col-12 col-md-3"
                   type="text"
                   label="Partita IVA *"
                   reactive-rules name="vatNumber"
                   :rules="[ (val) => isValid('vatNumber', val, $v) ]" />

          <q-input outlined
                   v-model="fiscalCode"
                   type="text"
                   class="col-12 col-md-3"
                   label="Codice Fiscale *"
                   reactive-rules name="fiscalCode"
                   :rules="[ (val) => isValid('fiscalCode', val, $v) ]" />

          <q-input outlined v-model="registeredOfficeAddress" type="text" label="Indirizzo sede legale *"
                   reactive-rules name="registeredOfficeAddress"
                   class="col-12 col-md-3"
                   :rules="[ (val) => isValid('registeredOfficeAddress', val, $v) ]" />

          <q-input outlined v-model="postalCode" type="number" label="CAP *"
                   class="col-12 col-md-3"
                   reactive-rules name="postalCode"
                   :rules="[ (val) => isValid('postalCode', val, $v) ]" />

          <q-input outlined v-model="webSite" type="text" label="Sito Web"
                   class="col-12 col-md-3"
                   reactive-rules name="webSite"
                   :rules="[ (val) => isValid('webSite', val, $v) ]" />

          <q-input v-model="companyName"
                   outlined
                   type="text"
                   class="col-12 col-md-3"
                   name="companyName"
                   label="Ragione sociale *"
                   reactive-rules
                   :rules="[ (val) => isValid('companyName', val, $v) ]" >
            <template v-slot:append>
              <q-icon class="desktop-only text-secondary" name="info">
                <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent"  :offset="[10, 10]">
                  {{$t('signin.tooltip.companyName')}}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>

          <q-input outlined
                   v-model="SDICode"
                   class="col-12 col-md-3"
                   type="text"
                   label="Codice SDI *"
                   reactive-rules name="SDICode"
                   :rules="[ (val) => isValid('SDICode', val, $v) ]" >
            <template v-slot:append>
              <q-icon name="info" class="desktop-only text-secondary">
                <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" :offset="[10, 10]">
                  {{$t('signin.tooltip.SDICode')}}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
          <div class="desktop-only col-md-3"></div>
          <div class="desktop-only col-md-3"></div>
        </div>
      </q-step>

      <q-step
        class="scroll full-height"
        :name="2"
        title="Dati Azienda"
        icon="create_new_folder"
        :done="step > 2"
      >

        <div class="row wrap justify-center content-center no-padding no-margin q-gutter-x-md q-gutter-y-xs">

          <!--riga-->
          <div class="col-md-3">
            <span>SOA</span>
            <q-toggle
              v-model="soa"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />
          </div>
          <div class="col-md-3">

            <span>ISO</span>
            <q-toggle
              v-model="iso"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />

          </div>
          <div class="col-md-3">

            <span>Patentino Fgas</span>
            <q-toggle
              v-model="fgas"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />

          </div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              :disable="!soa"
              v-model="isoFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-md-3">
            <q-file
              :disable="!iso"
              v-model="isoFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-md-3">
            <q-file
              :disable="!fgas"
              v-model="fgasFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Dichiarazione sostitutiva comunicazione antimafia
          </div>
          <div class="col-md-3 q-pt-md">
            Prestazione
          </div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              v-model="antimafiaFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-md-3">
            <q-file
              v-model="presentationFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Certificato o Visura Camerale
          </div>
          <div class="desktop-only col-md-3"></div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              v-model="certificateFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <q-input class="col-md-2" label="Data Scadenza" outlined v-model="certificateDate" mask="##/##/####">
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
          <div class="desktop-only col-md-4"></div>
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Regolarità Durc
          </div>
          <div class="desktop-only col-md-3"></div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              v-model="durcRegolarityFile"
              label="Carica quì il documento richiesto"
              outlined
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <q-input class="col-md-2" label="Data Scadenza" outlined v-model="durcRegolarityDate" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :locale="currentLocale" v-model="durcRegolarityDate" :options="calendarOption"  mask="DD/MM/YYYY">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Annulla" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="desktop-only col-md-4"></div>

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
           <!--<q-btn @click="$refs.stepper.next()" :type="step === 3 ? 'submit' : 'button'"  color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />-->
            <q-btn @click="$refs.stepper.next()" type="submit"  color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { legalFormOptions } from '../costants/options'
import { mapActions, mapGetters } from 'vuex'
import validator from '../validations/validator'

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
      isValid: validator.isValid,
      isFiscalCode: validator.isFiscalCode,
      isSDICode: validator.isSDICode,
      isVatNumber: validator.isVatNumber,
      isPostalCode: validator.isPostalCode,
      isWebSite: validator.isWebSite,
      isTelephoneNumber: validator.isTelephoneNumber,
      isPassword: validator.isPassword,
      currentLocale: {
        days: '_Lunedì_Martedì_Mercoledì_Giovedì_Sabato_Domenica'.split('_'),
        daysShort: 'Lun_Mar_Mer_Gio_Ven_Sab_Dom'.split('_'),
        months: 'Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre'.split('_'),
        monthsShort: 'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic'.split('_'),
        firstDayOfWeek: 0
      },
      certificateDate: '',
      certificateFile: null,
      durcRegolarityDate: '',
      durcRegolarityFile: null,
      antimafiaFile: null,
      presentationFile: null,
      soa: false,
      iso: false,
      fgas: false,
      isoFile: null,
      soaFile: null,
      fgasFile: null
    }
  },
  props: ['showAlert'],
  methods: {
    ...mapActions([
      'getCountries',
      'getRegions',
      'getProvinces',
      'getCities',
      'getRdos'
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
      this.region = undefined
      this.province = undefined
      this.city = undefined
      await this.getRegions(this.country)
    },
    async getProvinceOptions () {
      this.province = undefined
      this.city = undefined
      await this.getProvinces(this.region)
    },
    async getCityOptions () {
      this.city = undefined
      await this.getCities(this.province)
    }
  },
  async created () {
    await this.getCountries()
    await this.getRdos()
  },
  computed: {
    ...mapGetters([
      'countries',
      'regions',
      'provinces',
      'cities',
      'rdos'
    ])
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
      isSDICode: validator.isSDICode
    },
    vatNumber: {
      required,
      isVatNumber: validator.isVatNumber
    },
    fiscalCode: {
      required,
      isFiscalCode: validator.isFiscalCode
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
      isPostalCode: validator.isPostalCode
    },
    webSite: {
      required,
      isWebSite: validator.isWebSite
    },
    PEC: {
      required,
      email
    },
    telephoneNumber: {
      required,
      isTelephoneNumber: validator.isTelephoneNumber
    },
    username: {
      required,
      email
    },
    password: {
      required,
      isPassword: validator.isPassword
    }
  }
}
</script>

<style scoped>
</style>
