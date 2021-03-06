<template>
  <q-form @submit="onSignup">
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
          <q-input   outlined
                     v-model="user.username"
                     type="text"
                     label="Username *"
                     class="col-12 col-md-3"
                     reactive-rules name="username"
                     :rules="[ (val) => isValid('username', val, $v.user) ]" />

            <q-input outlined
                     v-model="user.password"
                     label="Password *"
                     :type="isPsw ? 'password' : 'text'"
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

          <q-input outlined
                   v-model="user.pec"
                   type="text"
                   label="email PEC *"
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
                    :rules="[ (val) => isValid('legalForm', val, $v.user) ]"
                    transition-show="scale"
                    transition-hide="scale"
          />

          <q-input outlined
                   v-model="user.telephoneNumber"
                   type="number"
                   label="Telefono *"
                   class="col-12 col-md-3"
                   reactive-rules name="telephoneNumber"
                   :rules="[ (val) => isValid('telephoneNumber', val, $v.user) ]" />

          <q-select @input="getRegionOptions"
                    class="col-12 col-md-3"
                    outlined
                    :options-dense="true"
                    v-model="user.country"
                    label="Nazione *"
                    :options="countries" option-label="description"
                    reactive-rules
                    name="country"
                    emit-value
                    map-options
                    :rules="[ (val) => isValid('country', val, $v.user) ]"
                    transition-show="scale"
                    transition-hide="scale"
          />

          <q-select @input="getProvinceOptions"
                    class="col-12 col-md-3"
                    :disable="!(user.country && regions.length>0)" :readonly="!(user.country && regions.length>0)"
                    :options="regions" option-label="description"  :options-dense="true"
                    outlined
                    v-model="user.region"
                    label="Regione *"
                    name="region"
                    emit-value
                    reactive-rules
                    :rules="[ (val) => isValid('region', val, $v.user) ]"
                    map-options
                    transition-show="scale"
                    transition-hide="scale"
          />

          <q-select @input="getCityOptions"
                    class="col-12 col-md-3"
                    :disable="!(user.region && provinces.length>0)" :readonly="!(user.region && provinces.length>0)"
                    option-label="description" option-dense v-model="user.province" :options="provinces"
                    label="Provincia *"
                    reactive-rules name="region"
                    :rules="[ (val) => isValid('province', val, $v.user) ]"
                    emit-value
                    map-options
                    outlined
                    transition-show="scale"
                    transition-hide="scale"
          />

          <q-select :disable="!(user.province && cities.length>0)" :readonly="!(user.province && cities.length>0)"
                    class="col-12 col-md-3"
                    option-label="description" option-dense :options="cities"
                    name="city"
                    outlined
                    map-options
                    label="Città *"
                    v-model="user.city"
                    reactive-rules
                    :rules="[ (val) => isValid('city', val, $v.user) ]"
                    transition-show="scale"
                    transition-hide="scale"
          />

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

          <q-input outlined
                   v-model="user.registeredOfficeAddress"
                   type="text"
                   label="Indirizzo sede legale *"
                   reactive-rules name="registeredOfficeAddress"
                   class="col-12 col-md-3"
                   :rules="[ (val) => isValid('registeredOfficeAddress', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.postalCode"
                   type="number" label="CAP *"
                   class="col-12 col-md-3"
                   name="postalCode"
                   reactive-rules
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
              v-model="soaFile"
              label="Carica quì il documento richiesto"
              accept=".pdf"
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
              accept=".pdf"
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
              accept=".pdf"
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Richieste di offerta *
          </div>
          <div class="desktop-only col-md-3"></div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <q-select @input="getCatRdoOption"
                    class="col-md-3"
                    multiple
                    use-chips
                    outlined option-dense
                    v-model="rdosMacrocategories"
                    :options="macroRdo" option-label="description"
                    label="Macrocategoria"
                    name="macrocategory"
                    transition-show="scale"
                    transition-hide="scale"
                    emit-value
                    map-options
                    reactive-rules
                    :rules="[ (val) => isValid('rdosMacrocategories', val, $v) ]"
          />

          <q-select @input="getSubcatRdoOption"
                    class="col-md-3"
                    :disable="!rdosMacrocategories.length>0"
                    :readonly="!rdosMacrocategories.length>0"
                    outlined
                    :options="catRdo" option-label="description"
                    :options-dense="true"
                    v-model="rdosCategories"
                    label="Categoria"
                    multiple use-chips
                    name="category"
                    emit-value
                    map-options
                    transition-show="scale"
                    transition-hide="scale"
                    reactive-rules
                    :rules="[ (val) => isValid('rdosCategories', val, $v) ]"
          />

          <q-select class="col-md-3"
                    :disable="!rdosCategories.length>0"
                    :readonly="!rdosCategories.length>0"
                    outlined
                    :options="subRdo" option-label="description"
                    :options-dense="true"
                    v-model="user.rdos"
                    label="Sottocategoria"
                    multiple use-chips
                    name="subcategory"
                    emit-value
                    map-options
                    transition-show="scale"
                    transition-hide="scale"
                    reactive-rules
                    :rules="[ (val) => isValid('rdos', val, $v.user) ]"
          />
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Importi *
          </div>
          <div class="col-md-3 q-pt-md">
            Regioni di interesse *
          </div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <q-select v-model="user.imports"
                    :options="imports"
                    name="imports"
                    outlined
                    class="col-md-3"
                    option-dense
                    multiple
                    label="Importi *"
                    use-chips
                    transition-show="scale"
                    transition-hide="scale"
                    reactive-rules
                    :rules="[ (val) => isValid('imports', val, $v.user) ]"
          />

          <q-select  class="col-md-3"
                     :disable="!regions.length>0" :readonly="!regions.length>0"
                     outlined
                     :options-dense="true" :options="regions" option-label="description"
                     v-model="user.regionsOfInterest"
                     label="Regioni di interesse *"

                     multiple
                     use-chips
                     emit-value
                     map-options
                     transition-show="scale"
                     transition-hide="scale"
                     reactive-rules
                     :rules="[ (val) => isValid('regionsOfInterest', val, $v.user) ]"
          />

          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Dichiarazione sostitutiva antimafia *
          </div>
          <div class="col-md-3 q-pt-md">
            Prestazione *
          </div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              v-model="antimafiaFile"
              label="Carica quì il documento richiesto"
              accept=".pdf"
              outlined
              use-chips
              :rules="[ (val) => isValid('antimafiaFile', val, $v) ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-md-3">
            <q-file
              v-model="lendingFile"
              label="Carica quì il documento richiesto"
              outlined
              accept=".pdf"
              use-chips
              :rules="[ (val) => isValid('lendingFile', val, $v) ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3 q-pt-md">
            Certificato o Visura Camerale *
          </div>
          <div class="desktop-only col-md-3"></div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              v-model="certificateFile"
              label="Carica quì il documento richiesto"
              outlined
              accept=".pdf"
              use-chips
              :rules="[ (val) => isValid('certificateFile', val, $v) ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <q-input class="col-md-2" label="Data Scadenza" :rules="[ (val) => isValid('certificateDate', val, $v.user) ]" outlined v-model="user.certificateDate" mask="##/##/####">
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
            Regolarità Durc *
          </div>
          <div class="desktop-only col-md-3"></div>
          <div class="desktop-only col-md-3"></div>
          <!--riga-->
          <div class="col-md-3">
            <q-file
              v-model="durcRegolarityFile"
              label="Carica quì il documento richiesto"
              outlined
              accept=".pdf"
              use-chips
              :rules="[ (val) => isValid('durcRegolarityFile', val, $v) ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <q-input class="col-md-2" label="Data Scadenza" :rules="[ (val) => isValid('durcRegolarityDate', val, $v.user) ]" outlined v-model="user.durcRegolarityDate" mask="##/##/####">
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
        <div class="row wrap justify-center content-center no-padding no-margin q-gutter-x-md q-gutter-y-xs">

          <div class="col-md-9 q-pt-md">
            Leggi e accetta il <a class="hyperlink"  @click="goToTeC">regolamento</a> per godere dei vantaggi di Subapp.
          </div>
          <div class="col-md-9 q-pt-md">
            <div class="q-gutter-sm">
              <q-radio dense v-model="regulation" val="true" label="Accetto" />
              <q-radio dense v-model="regulation" val="false" label="Non Accetto" />
            </div>
          </div>
          <div class="col-md-9 q-pt-md">
            Leggi e accetta i <a class="hyperlink" @click="goToTeC">Termini e Condizioni</a> per proseguire con la registrazione.
          </div>
          <div class="col-md-9 q-pt-md">
            <div class="q-gutter-sm">
              <q-radio dense v-model="termAndCondition" val="true" label="Accetto" />
              <q-radio dense v-model="termAndCondition" val="false" label="Non Accetto" />
            </div>
          </div>
        </div>

      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation class="flex justify-between">
          <div>
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Indietro" class="q-ml-sm" />
          </div>
          <div>
            <q-btn type="submit" :disable="(termAndCondition === 'false' || regulation === 'false') && step === 3" color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { legalFormOptions, imports } from '../costants/options'
import { mapActions, mapGetters } from 'vuex'
import validator from '../validations/validator'
import User from '../model/user'
import { date } from 'quasar'

export default {
  name: 'SignIn',
  data () {
    return {
      user: new User(),
      legalFormOptions: legalFormOptions,
      imports: imports,
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
      lendingFile: null,
      isoFile: null,
      soaFile: null,
      fgasFile: null,
      soaToggle: false,
      isoToggle: false,
      fgasToggle: false,
      rdosCategories: [],
      rdosMacrocategories: [],
      regulation: 'false',
      termAndCondition: 'false'

    }
  },
  props: ['showAlert'],
  methods: {
    ...mapActions([
      'getCountries',
      'getRegions',
      'getProvinces',
      'getCities',
      'signup',
      'getMacroRdo',
      'getCatRdo',
      'getSubRdo',
      'uploadFile',
      'updateUser'
    ]),
    viewRegulation () {
      window.open('', '_blank ')
    },
    goToTeC () {
      const routeData = this.$router.resolve({ name: 'termCondition' })
      window.open(routeData.href, '_blank')
    },
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    },
    calendarOption (date) {
      const currentTime = new Date()
      return date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/')
    },
    async onSignup () {
      const tempCertificateDate = this.user.certificateDate
      const tempDurcRegolarityDate = this.user.durcRegolarityDate
      if (!this.$v.$invalid && this.step === 3) {
        this.$q.loading.show()
        try {
          this.user.certificateDate = date.extractDate(this.user.certificateDate, 'DD/MM/YYYY')
          this.user.durcRegolarityDate = date.extractDate(this.user.durcRegolarityDate, 'DD/MM/YYYY')
          const data = await this.signup(this.user)
          await this.postFiles(data.user)
          this.user.certificateDate = tempCertificateDate
          this.user.durcRegolarityDate = tempDurcRegolarityDate
          this.$q.loading.hide()
        } catch (error) {
          this.user.certificateDate = tempCertificateDate
          this.user.durcRegolarityDate = tempDurcRegolarityDate
          this.$q.loading.hide()
          console.log(error)
        }
      }
      this.$refs.stepper.next()
    },
    async postFiles (user) {
      const formData = new FormData()
      formData.append('file', this.antimafiaFile, 'antimafiaFile')
      formData.append('file', this.lendingFile, 'lendingFile')
      formData.append('file', this.certificateFile, 'certificateFile')
      formData.append('file', this.durcRegolarityFile, 'durcRegolarityFile')
      if (this.soaFile) {
        formData.append('file', this.soaFile, 'soaFile')
      }
      if (this.isoFile) {
        formData.append('file', this.isoFile, 'isoFile')
      }
      if (this.fgasFile) {
        formData.append('file', this.fgasFile, 'fgasFile')
      }
      const uploadedFiles = await this.uploadFile(formData)
      uploadedFiles.forEach((file) => {
        user[file.originalname] = file
      })
      await this.putUser(user)
    },
    async putUser (user) {
      const obj = { pathParam: user._id }
      obj.body = user
      await this.updateUser(obj)
    },
    async getRegionOptions () {
      if (this.user.region) this.user.region = undefined
      if (this.user.province) this.user.province = undefined
      if (this.user.city) this.user.city = undefined
      await this.getRegions(this.user.country._id)
    },
    async getProvinceOptions () {
      if (this.user.province) this.user.province = undefined
      if (this.user.city) this.user.city = undefined
      await this.getProvinces(this.user.region._id)
    },
    async getCityOptions () {
      if (this.user.city) this.user.city = undefined
      await this.getCities(this.user.province._id)
    },
    async getCatRdoOption () {
      if (this.rdosMacrocategories && this.rdosMacrocategories.length === 0) {
        this.rdosCategories = []
        this.user.rdos = []
      }
      const queryparams = { rdomacroId: this.rdosMacrocategories.map((rdoMacro) => { return rdoMacro._id }) }
      await this.getCatRdo(queryparams)
    },
    async getSubcatRdoOption () {
      if (this.rdosCategories && this.rdosCategories.length === 0) this.user.rdos = []
      const queryparams = { rdomacroId: this.rdosCategories.map((rdoCat) => { return rdoCat._id }) }
      await this.getSubRdo(queryparams)
    }
  },
  async created () {
    await this.getCountries()
    await this.getMacroRdo()
  },
  mounted () {
    this.$v.$touch()
  },
  computed: {
    ...mapGetters([
      'countries',
      'regions',
      'provinces',
      'cities',
      'macroRdo',
      'catRdo',
      'subRdo'
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
        email,
        required
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
      },
      rdos: {
        required
      },
      imports: {
        required
      },
      regionsOfInterest: {
        required
      },
      durcRegolarityDate: {
        required
      },
      certificateDate: {
        required
      }
    },
    rdosMacrocategories: {
      required
    },
    rdosCategories: {
      required
    },
    durcRegolarityFile: {
      required
    },
    antimafiaFile: {
      required
    },
    certificateFile: {
      required
    },
    lendingFile: {
      required
    }
  }
}
</script>

<style scoped>
</style>
