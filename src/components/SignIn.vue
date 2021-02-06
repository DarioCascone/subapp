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
          <q-input outlined v-model="user.username" type="text" label="Username *"
                     class="col-12 col-md-3"
                     reactive-rules name="username"
                     :rules="[ (val) => isValid('username', val, $v.user) ]" />

            <q-input outlined v-model="user.password" label="Password *" :type="isPsw ? 'password' : 'text'"
                     class="col-12 col-md-3"
                     reactive-rules name="password"
                     :rules="[ (val) => isValid('password', val, $v.user) ]" >
              <template v-slot:append>
                <q-icon
                  :name="isPsw ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPsw = !isPsw"
                />
              </template>
            </q-input>

          <q-input outlined v-model="user.pec" type="text" label="email PEC"
                   class="col-12 col-md-3"
                   reactive-rules name="pec"
                   :rules="[ (val) => isValid('pec', val, $v.user) ]" />

          <q-select v-model="user.legalForm"
                    :options="legalFormOptions"
                    name="legalForm"
                    outlined
                    class="col-12 col-md-3"
                    option-dense
                    label="Forma Giuridica *"
                    reactive-rules
                    :rules="[ (val) => isValid('legalForm', val, $v.user) ]" />

          <q-input outlined v-model="user.telephoneNumber" type="number" label="Telefono *"
                   class="col-12 col-md-3"
                   reactive-rules name="telephoneNumber"
                   :rules="[ (val) => isValid('telephoneNumber', val, $v.user) ]" />

          <q-select @input="getRegionOptions"  class="col-12 col-md-3" outlined :options-dense="true" v-model="user.country" :options="countries" label="Nazione*"
                    option-label="description" option-value="_id"
                    reactive-rules name="country" emit-value map-options
                    :rules="[ (val) => isValid('country', val, $v.user) ]" />

          <q-select @input="getProvinceOptions"  class="col-12 col-md-3" :disable="!(user.country && regions.length>0)" :readonly="!(user.country && regions.length>0)"
                    option-label="description" option-value="_id" outlined :options-dense="true"
                    v-model="user.region" :options="regions" label="Regione *" emit-value
                    reactive-rules name="region" map-options
                    :rules="[ (val) => isValid('region', val, $v.user) ]" />

          <q-select @input="getCityOptions"  class="col-12 col-md-3" :disable="!(user.region && provinces.length>0)" :readonly="!(user.region && provinces.length>0)"
                    option-label="description" option-value="_id" outlined option-dense v-model="user.province" :options="provinces" label="Provincia *"
                    reactive-rules name="region" emit-value map-options
                    :rules="[ (val) => isValid('province', val, $v.user) ]" />

          <q-select :disable="!(user.province && cities.length>0)" :readonly="!(user.province && cities.length>0)"  class="col-12 col-md-3"
                    option-label="description" option-value="_id" outlined option-dense v-model="user.city" :options="cities" label="Città *"
                    reactive-rules name="city" :options-dense="true" map-options
                    :rules="[ (val) => isValid('city', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.vatNumber"
                   class="col-12 col-md-3"
                   type="text"
                   label="Partita IVA *"
                   reactive-rules name="vatNumber"
                   :rules="[ (val) => isValid('vatNumber', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.fiscalCode"
                   type="text"
                   class="col-12 col-md-3"
                   label="Codice Fiscale *"
                   reactive-rules name="fiscalCode"
                   :rules="[ (val) => isValid('fiscalCode', val, $v.user) ]" />

          <q-input outlined v-model="user.registeredOfficeAddress" type="text" label="Indirizzo sede legale *"
                   reactive-rules name="registeredOfficeAddress"
                   class="col-12 col-md-3"
                   :rules="[ (val) => isValid('registeredOfficeAddress', val, $v.user) ]" />

          <q-input outlined v-model="user.postalCode" type="number" label="CAP *"
                   class="col-12 col-md-3"
                   reactive-rules name="postalCode"
                   :rules="[ (val) => isValid('postalCode', val, $v.user) ]" />

          <q-input outlined v-model="user.webSite" type="text" label="Sito Web"
                   class="col-12 col-md-3"
                   reactive-rules name="webSite"
                   :rules="[ (val) => isValid('webSite', val, $v.user) ]" />

          <q-input v-model="user.companyName"
                   outlined
                   type="text"
                   class="col-12 col-md-3"
                   name="companyName"
                   label="Ragione sociale *"
                   reactive-rules
                   :rules="[ (val) => isValid('companyName', val, $v.user) ]" >
            <template v-slot:append>
              <q-icon class="desktop-only text-secondary" name="info">
                <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent"  :offset="[10, 10]">
                  {{$t('signin.tooltip.companyName')}}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>

          <q-input outlined
                   v-model="user.SDICode"
                   class="col-12 col-md-3"
                   type="text"
                   label="Codice SDI *"
                   reactive-rules
                   name="SDICode"
                   :rules="[ (val) => isValid('SDICode', val, $v.user) ]" >
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
              v-model="soaToggle"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />
          </div>
          <div class="col-md-3">

            <span>ISO</span>
            <q-toggle
              v-model="isoToggle"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />

          </div>
          <div class="col-md-3">

            <span>Patentino Fgas</span>
            <q-toggle
              v-model="fgasToggle"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />

          </div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              :disable="!soaToggle"
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
              :disable="!isoToggle"
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
              :disable="!fgasToggle"
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
          <q-input class="col-md-2" label="Data Scadenza" outlined v-model="user.certificateDate" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :locale="currentLocale" v-model="user.certificateDate" :options="calendarOption"  mask="DD/MM/YYYY">
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
          <q-input class="col-md-2" label="Data Scadenza" outlined v-model="user.durcRegolarityDate" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :locale="currentLocale" v-model="user.durcRegolarityDate" :options="calendarOption"  mask="DD/MM/YYYY">
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
import User from '../model/user'

export default {
  name: 'SignIn',
  data () {
    return {
      user: new User(),
      legalFormOptions: legalFormOptions,
      step: 1,
      alert: false,
      isPsw: true,
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
      certificateFile: null,
      durcRegolarityFile: null,
      antimafiaFile: null,
      presentationFile: null,
      isoFile: null,
      soaFile: null,
      fgasFile: null,
      soaToggle: false,
      isoToggle: false,
      fgasToggle: false
    }
  },
  props: ['showAlert'],
  methods: {
    ...mapActions([
      'getCountries',
      'getRegions',
      'getProvinces',
      'getCities',
      'signin',
      'getRdos'
    ]),
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    },
    calendarOption (date) {
      const currentTime = new Date()
      return date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/')
    },
    async onSignin () {
      this.$v.$touch()
      this.$forceUpdate()
      if (!this.$v.$invalid && this.step === 3) {
        await this.signin(this.user)
      }
    },
    async getRegionOptions () {
      this.user.region = undefined
      this.user.province = undefined
      this.user.city = undefined
      await this.getRegions(this.user.country)
    },
    async getProvinceOptions () {
      this.user.province = undefined
      this.user.city = undefined
      await this.getProvinces(this.user.region)
    },
    async getCityOptions () {
      this.user.city = undefined
      await this.getCities(this.user.province)
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
    user: {
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
        isWebSite: validator.isWebSite
      },
      pec: {
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
}
</script>

<style scoped>
</style>
