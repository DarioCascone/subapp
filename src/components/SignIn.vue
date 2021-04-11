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
        <div class="row wrap justify-center content-center no-padding no-margin q-gutter-x-md q-gutter-y-md">
          <q-input   outlined
                     v-model="user.username"
                     type="text"
                     :disable="isEditing"
                     label="Username *"
                     class="col-12 col-md-3"
                     reactive-rules name="username"
                     :rules="[ (val) => isValid('username', val, $v.user) ]" >
            <template v-slot:append>
              <q-icon class="desktop-only text-secondary" name="info">
                <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
                  {{$t('signin.tooltip.username')}}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>

            <q-input outlined
                     v-if="!isEditing"
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
<!--
          <q-select v-model="user.legalForm"
                    :options="legalFormOptions"
                    name="legalForm"
                    :disable="isEditing && !isAdmin"
                    outlined
                    class="col-12 col-md-3"
                    option-dense
                    label="Forma Giuridica *"
                    reactive-rules
                    :rules="[ (val) => isValid('legalForm', val, $v.user) ]"
                    transition-show="scale"
                    transition-hide="scale"
          />
-->
          <q-input v-model="user.companyName"
                   outlined
                   type="text"
                   :disable="isEditing && !isAdmin"
                   class="col-12 col-md-3"
                   name="companyName"
                   label="Ragione sociale *"
                   reactive-rules
                   :rules="[ (val) => isValid('companyName', val, $v.user) ]" >
            <template v-slot:append>
              <q-icon class="desktop-only text-secondary" name="info">
                <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
                  {{$t('signin.tooltip.companyName')}}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>

          <q-select class="col-12 col-md-3"
                    outlined
                    :disable="true"
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
                    :disable="(!(user.country && regions.length>0)) || (isEditing && !isAdmin)" :readonly="!(user.country && regions.length>0)"
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
                    :disable="(!(user.region && provinces.length>0)) || (isEditing && !isAdmin)" :readonly="!(user.region && provinces.length>0)"
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

          <q-select :disable="(!(user.province && cities.length>0)) || (isEditing && !isAdmin)" :readonly="!(user.province && cities.length>0)"
                    class="col-12 col-md-3"
                    option-label="description" option-dense :options="cities"
                    name="city"
                    outlined
                    map-options
                    emit-value
                    label="Città *"
                    v-model="user.city"
                    reactive-rules
                    :rules="[ (val) => isValid('city', val, $v.user) ]"
                    transition-show="scale"
                    transition-hide="scale"
          />

          <q-input outlined
                   :disable="isEditing && !isAdmin"
                   v-model="user.postalCode"
                   type="number" label="CAP *"
                   class="col-12 col-md-3"
                   name="postalCode"
                   reactive-rules
                   :rules="[ (val) => isValid('postalCode', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.registeredOfficeAddress"
                   type="text"
                   :disable="isEditing && !isAdmin"
                   label="Indirizzo sede legale *"
                   reactive-rules name="registeredOfficeAddress"
                   class="col-12 col-md-3"
                   :rules="[ (val) => isValid('registeredOfficeAddress', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.vatNumber"
                   :disable="isEditing && !isAdmin"
                   class="col-12 col-md-3"
                   type="text"
                   label="Partita IVA *"
                   reactive-rules name="vatNumber"
                   :rules="[ (val) => isValid('vatNumber', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.fiscalCode"
                   type="text"
                   :disable="isEditing && !isAdmin"
                   class="col-12 col-md-3"
                   label="Codice Fiscale *"
                   reactive-rules name="fiscalCode"
                   :rules="[ (val) => isValid('fiscalCode', val, $v.user) ]" />

          <q-input outlined v-model="user.webSite" type="text" label="Sito Web"
                   class="col-12 col-md-3"
                   reactive-rules name="webSite"
                   :rules="[ (val) => isValid('webSite', val, $v.user) ]" />

          <q-input outlined
                   v-model="user.telephoneNumber"
                   type="number"
                   label="Telefono *"
                   class="col-12 col-md-3"
                   reactive-rules name="telephoneNumber"
                   :rules="[ (val) => isValid('telephoneNumber', val, $v.user) ]" />

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
                <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
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
          <div class="col-12 col-md-3 order-1">
            <span>SOA</span>
            <q-toggle
              v-model="soaToggle"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />
          </div>
          <div class="col-12 col-md-3 order-3">

            <span>ISO</span>
            <q-toggle
              v-model="isoToggle"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />

          </div>
          <div class="col-12 col-md-3 order-5">

            <span>Patentino Fgas</span>
            <q-toggle
              v-model="fgasToggle"
              checked-icon="check"
              color="accent"
              unchecked-icon="clear"
            />

          </div>
          <!--riga-->
          <div class="col-12 col-md-3 order-2">
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
          <div class="col-12 col-md-3 order-4">
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
          <div class="col-12 col-md-3 order-6">
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
          <div class="col-12 col-md-3 q-pt-md order-7">
            Richieste di offerta *
          </div>
          <div class="desktop-only col-12 col-md-3"></div>
          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <q-select @input="getCatRdoOption"
                    class="col-12 col-md-3 order-8"
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
                    class="col-12 col-md-3 order-9"
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

          <q-select class="col-12 col-md-3 order-10"
                    :disable="!rdosCategories.length>0"
                    :readonly="!rdosCategories.length>0"
                    outlined
                    :options="subRdo" option-label="description"
                    :options-dense="true"
                    v-model="rdosSubcategories"
                    label="Sottocategoria"
                    multiple use-chips
                    name="subcategory"
                    emit-value
                    map-options
                    transition-show="scale"
                    transition-hide="scale"
                    reactive-rules
                    :rules="[ (val) => isValid('rdosSubcategories', val, $v) ]"
          />
          <!--riga-->
          <div class="col-12 col-md-3 q-pt-md order-11">
            Importi *
          </div>
          <div class="col-12 col-md-3 q-pt-md order-13">
            Regioni di interesse *
          </div>
          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <q-select v-model="user.imports"
                    :options="imports"
                    name="imports"
                    outlined
                    class="col-12 col-md-3 order-12"
                    option-dense
                    multiple
                    label="Importi *"
                    use-chips
                    transition-show="scale"
                    transition-hide="scale"
                    reactive-rules
                    :rules="[ (val) => isValid('imports', val, $v.user) ]"
          />

          <q-select  class="col-12 col-md-3 order-14"
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

          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <div class="col-12 col-md-3 q-pt-md order-15">
            Iscrizione White List o Dichiarazione Antimafia *
          </div>
          <div class="col-12 col-md-3 q-pt-md order-17">
            Presentazione Aziendale *
          </div>
          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <div class="col-12 col-md-3 order-16">
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
          <div class="col-12 col-md-3 order-18">
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
          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <div class="col-12 col-md-3 q-pt-md order-19">
            Certificato o Visura Camerale *
          </div>
          <div class="desktop-only col-12 col-md-3"></div>
          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <div class="col-12 col-md-3 order-20">
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
          <q-input class="col-12 col-md-2 order-21" label="Data Scadenza" :rules="[ (val) => isValid('certificateDate', val, $v.user) ]" outlined v-model="user.certificateDate" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :locale="currentLocale" v-model="user.certificateDate" :options="calendarOptionCertificate"  mask="DD/MM/YYYY">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Annulla" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="desktop-only col-12 col-md-4"></div>
          <!--riga-->
          <div class="col-12 col-md-3 q-pt-md order-22">
            Regolarità Durc *
          </div>
          <div class="desktop-only col-12 col-md-3"></div>
          <div class="desktop-only col-12 col-md-3"></div>
          <!--riga-->
          <div class="col-12 col-md-3 order-23">
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
          <q-input class="col-12 col-md-2 order-24" label="Data Scadenza" :rules="[ (val) => isValid('durcRegolarityDate', val, $v.user) ]" outlined v-model="user.durcRegolarityDate" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :locale="currentLocale" v-model="user.durcRegolarityDate" :options="calendarOptionDurc"  mask="DD/MM/YYYY">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Annulla" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="desktop-only col-12 col-md-4"></div>
          <div v-if="isEditing" class=" col-12 col-md-9 q-pt-md row">
            <div class="col-12 company-category">
              <div>
                Ai sensi dell’art. 3 – aa, Decreto Legislativo n. 50/2016 e s.m.i., appartiene alla categoria:
              </div>
              <div class="q-pt-md q-pb-md">
                <q-option-group
                  v-model="user.companyCategory"
                  :options="compCatOptions"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>

      </q-step>

      <q-step
        v-if="!isEditing"
        class="scroll"
        :name="3"
        title="Consensi"
        icon="add_comment"
      >
        <div class="row wrap justify-center content-center no-padding no-margin q-gutter-x-md q-gutter-y-xs">
          <div class="col-12 col-md-9 q-pt-md">
           * Tutti i campi sono obbligatori.
          </div>
          <div class="col-12 col-md-9 q-pt-md">
           Al termine, riceverai una mail con le istruzioni da seguire per effettuare il pagamento e completare il processo di registrazione.
          </div>
          <div class="col-12 col-md-9 q-pt-md">
            Leggi e accetta il <a class="hyperlink"  @click="goToTeC">regolamento</a> per godere dei vantaggi di Subapp.
          </div>
          <div class="col-12 col-md-9 q-pt-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio dense v-model="regulation" val="true" label="Accetto" />
              <q-radio dense v-model="regulation" val="false" label="Non Accetto" />
            </div>
          </div>
          <div class="col-12 col-md-9 q-pt-md">
            Leggi e accetta i <a class="hyperlink" @click="goToTeC">Termini e Condizioni</a> per proseguire con la registrazione.
          </div>
          <div class="col-12 col-md-9 q-pt-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio dense v-model="termAndCondition" val="true" label="Accetto" />
              <q-radio dense v-model="termAndCondition" val="false" label="Non Accetto" />
            </div>
          </div>
          <div class="col-12 col-md-9 q-pt-md">
            Ai sensi dell’art. 46 del D.P.R. 28 dicembre 2000 n. 445, la Ditta, consapevole delle sanzioni penali, previste dall’art. 76 del D.P.R. n. 445/2000, per le ipotesi di falsità in atti e dichiarazioni mendaci ivi indicate, dichiara:
            <ul>
              <li>di non trovarsi nelle condizioni previste dall’art. 80 del Decreto Legislativo 18 aprile 2016 n. 50 e s.m.i.</li>
              <li>di non essere oggetto di provvedimenti di sospensione o interdittivi di cui all’art. 14, comma 1, D.Lgs. 81/08</li>
              <li>di essere in regola con quanto previsto con il D.Lgs 81/08, in materia di sicurezza</li>
              <li>di conoscere i limiti previsti dalla disciplina del subappalto</li>
            </ul>
          </div>
          <div class="col-12 col-md-9 q-pb-md">
            <div class="q-gutter-sm">
              <q-radio dense v-model="compDeclaration" val="true" label="Si" />
              <q-radio dense v-model="compDeclaration" val="false" label="No" />
            </div>
          </div>
          <div v-if="false" class="col-12 col-md-9 q-pt-md row">
            <div class="col-12 company-category">
              <div>
              Ai sensi dell’art. 3 – aa, Decreto Legislativo n. 50/2016 e s.m.i., appartiene alla categoria:
              </div>
              <div class="q-pt-md q-pb-md">
                <q-option-group
                  v-model="user.companyCategory"
                  :options="compCatOptions"
                  color="primary"
                />
              </div>
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
            <q-btn type="submit" :disable="(termAndCondition === 'false' || regulation === 'false' || compDeclaration !== 'true') && step === 3"
                   color="primary" :label="getBtnLabel" />
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { imports, compCatOptions } from '../costants/options'
import { mapActions, mapGetters } from 'vuex'
import validator from '../validations/validator'
import User from '../model/user'
import { date } from 'quasar'

export default {
  name: 'SignIn',
  data () {
    return {
      user: new User(),
      // legalFormOptions: legalFormOptions,
      imports: imports,
      compCatOptions: compCatOptions,
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
      rdosSubcategories: [],
      regulation: 'false',
      termAndCondition: 'false',
      compDeclaration: ''

    }
  },
  props: ['showAlert', 'isEditing', 'isAdmin', 'selectedUser'],
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
      'updateUser',
      'fetchUser',
      'updateLoggedUser',
      'deleteFiles'
    ]),
    viewRegulation () {
      window.open('', '_blank ')
    },
    async buildEditProfilePage () {
      if (!this.isAdmin) {
        this.user = JSON.parse(JSON.stringify(this.userLogged)) // to avoid reference
      } else {
        this.user = JSON.parse(JSON.stringify(this.selectedUser)) // to avoid reference
      }

      this.loadUserLoggedFile()

      this.user.certificateDate = new Date(this.user.certificateDate).toLocaleDateString('fr')
      this.user.durcRegolarityDate = new Date(this.user.durcRegolarityDate).toLocaleDateString('fr')

      await this.getRegions(this.user.country._id)
      await this.getProvinces(this.user.region._id)
      await this.getCities(this.user.province._id)

      let macroOpt = []
      macroOpt = this.loadEditProfileOptions('macroRdo', macroOpt)
      this.rdosMacrocategories = macroOpt.filter((item, i, ar) => ar.indexOf(item) === i) // unique
      await this.getCatRdoOption()

      let catOpt = []
      catOpt = this.loadEditProfileOptions('catRdo', catOpt)
      this.rdosCategories = catOpt.filter((item, i, ar) => ar.indexOf(item) === i) // unique
      await this.getSubcatRdoOption()

      let subOpt = []
      subOpt = this.loadEditProfileOptions('subRdo', subOpt)
      this.rdosSubcategories = subOpt.filter((item, i, ar) => ar.indexOf(item) === i) // unique
    },
    loadEditProfileOptions (key, array) {
      this.user.rdos.forEach((rdo) => {
        this[key].forEach((item) => {
          if (key === 'macroRdo') {
            if (item._id === rdo.macrocategory) {
              array.push(item)
            }
          }
          if (key === 'catRdo') {
            if (item._id === rdo.category) {
              array.push(item)
            }
          }
          if (key === 'subRdo') {
            if (item._id === rdo._id) {
              array.push(item)
            }
          }
        })
      })
      return array
    },
    loadUserLoggedFile () {
      if (this.user.soaFile) {
        this.soaToggle = true
        this.soaFile = new File([''], 'Soa')
      }
      if (this.user.isoFile) {
        this.isoToggle = true
        this.isoFile = new File([''], 'Iso')
      }
      if (this.user.fgasFile) {
        this.fgasToggle = true
        this.fgasFile = new File([''], 'Fgas')
      }
      this.antimafiaFile = new File([''], 'Antimafia')
      this.lendingFile = new File([''], 'Prestazione')
      this.certificateFile = new File([''], 'Visura Camerale')
      this.durcRegolarityFile = new File([''], 'Durc')
    },
    goToTeC () {
      const routeData = this.$router.resolve({ name: 'termCondition' })
      window.open(routeData.href, '_blank')
    },
    hideDialog () {
      this.$emit('update:showAlert', this.alert)
    },
    calendarOptionCertificate (date) {
      const currentTime = new Date()
      const expirationTime = new Date()
      this.addMonths(expirationTime, 6)
      return (date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/') && date <= expirationTime.toLocaleDateString('fr-CA').replaceAll('-', '/'))
    },
    calendarOptionDurc (date) {
      const currentTime = new Date()
      const expirationTime = new Date()
      this.addMonths(expirationTime, 4)
      return (date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/') && date <= expirationTime.toLocaleDateString('fr-CA').replaceAll('-', '/'))
    },
    addMonths (date, months) {
      var d = date.getDate()
      date.setMonth(date.getMonth() + +months)
      if (date.getDate() !== d) {
        date.setDate(0)
      }
      return date
    },
    async onSignup () {
      const tempCertificateDate = this.user.certificateDate
      const tempDurcRegolarityDate = this.user.durcRegolarityDate
      if ((!this.$v.$invalid && this.step === 3) || (!this.$v.$invalid && this.step === 2 && this.isEditing)) {
        this.step = 1
        this.user.rdos = this.rdosSubcategories
        this.$q.loading.show()
        try {
          this.user.certificateDate = date.extractDate(this.user.certificateDate, 'DD/MM/YYYY')
          this.user.durcRegolarityDate = date.extractDate(this.user.durcRegolarityDate, 'DD/MM/YYYY')
          let data = {}
          if (!this.isEditing) {
            data = await this.signup(this.user)
          } else {
            data.user = this.user
          }
          await this.postFilesAndUpdateUser(data.user) // this function update user if isEditing is true
          if (this.isEditing) {
            this.$emit('editSuccess', false)
          }
          if (this.isAdmin) {
            this.$emit('editSelectedUserSuccess')
          }
          this.user.certificateDate = tempCertificateDate
          this.user.durcRegolarityDate = tempDurcRegolarityDate
          this.$q.loading.hide()
          if (!this.isEditing) {
            this.$emit('signupSuccess', false)
          }
        } catch (error) {
          this.user.certificateDate = tempCertificateDate
          this.user.durcRegolarityDate = tempDurcRegolarityDate
          this.$q.loading.hide()
          console.log(error)
        }
      }
      this.$refs.stepper.next()
    },
    async postFilesAndUpdateUser (user) {
      const formData = new FormData()
      let needUploadFile = false
      const fileToRemove = []
      if (this.antimafiaFile.size > 0) {
        formData.append('file', this.antimafiaFile, `antimafiaFile.${this.antimafiaFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.antimafiaFile && this.user.antimafiaFile.path) {
          fileToRemove.push(this.user.antimafiaFile.path)
        }
      }
      if (this.lendingFile.size > 0) {
        formData.append('file', this.lendingFile, `lendingFile.${this.lendingFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.lendingFile && this.user.lendingFile.path) {
          fileToRemove.push(this.user.lendingFile.path)
        }
      }
      if (this.certificateFile.size > 0) {
        formData.append('file', this.certificateFile, `certificateFile.${this.certificateFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.certificateFile && this.user.certificateFile.path) {
          fileToRemove.push(this.user.certificateFile.path)
        }
      }
      if (this.durcRegolarityFile.size > 0) {
        formData.append('file', this.durcRegolarityFile, `durcRegolarityFile.${this.durcRegolarityFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.durcRegolarityFile && this.user.durcRegolarityFile.path) {
          fileToRemove.push(this.user.durcRegolarityFile.path)
        }
      }
      if (this.soaFile && this.soaFile.size > 0) {
        formData.append('file', this.soaFile, `soaFile.${this.soaFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.soaFile && this.user.soaFile.path) {
          fileToRemove.push(this.user.soaFile.path)
        }
      }
      if (this.isoFile && this.isoFile.size > 0) {
        formData.append('file', this.isoFile, `isoFile.${this.isoFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.isoFile && this.user.isoFile.path) {
          fileToRemove.push(this.user.isoFile.path)
        }
      }
      if (this.fgasFile && this.fgasFile.size > 0) {
        formData.append('file', this.fgasFile, `fgasFile.${this.fgasFile.name.split('.')[1]}`)
        needUploadFile = true
        if (this.isEditing && this.user.fgasFile && this.user.fgasFile.path) {
          fileToRemove.push(this.user.fgasFile.path)
        }
      }
      if (needUploadFile) {
        if (fileToRemove.length > 0) {
          const obj = {
            pathParam: this.user._id,
            body: fileToRemove
          }
          await this.deleteFiles(obj)
        }
        const uploadedFiles = await this.uploadFile(formData)
        uploadedFiles.files.forEach((file) => {
          user[file.Key.split('.')[1]] = file
        })
      }
      if (this.isEditing) {
        let obj = {
          pathParam: user._id,
          body: user
        }
        await this.updateLoggedUser(obj)
        obj = {
          pathParam: user._id
        }
        if (!this.isAdmin) {
          await this.fetchUser(obj)
        }
      } else {
        await this.postUser(user)
      }
    },
    async postUser (user) {
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
        this.rdosSubcategories = []
      }
      const queryparams = { rdomacroId: this.rdosMacrocategories.map((rdoMacro) => { return rdoMacro._id }) }
      await this.getCatRdo(queryparams)
    },
    async getSubcatRdoOption () {
      if (this.rdosCategories && this.rdosCategories.length === 0) this.rdosSubcategories = []
      const queryparams = { rdocatId: this.rdosCategories.map((rdoCat) => { return rdoCat._id }) }
      await this.getSubRdo(queryparams)
    }
  },
  async mounted () {
    await this.getCountries()
    this.user.country = this.countries.find((country) => {
      return country.description === 'Italia'
    })
    await this.getRegionOptions()
    await this.getMacroRdo()
    if (this.isEditing) {
      await this.buildEditProfilePage()
    }
    this.$v.$touch()
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      countries: 'countries',
      regions: 'regions',
      provinces: 'provinces',
      cities: 'cities',
      macroRdo: 'macroRdo',
      catRdo: 'catRdo',
      subRdo: 'subRdo'
    }),
    getBtnLabel () {
      if (this.step === 2 && this.isEditing) {
        return 'Modifica'
      } else if (this.step === 3) {
        return 'Registrati'
      } else {
        return 'Continua'
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
  validations () {
    return {
      user: {
        companyName: {
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
          required: this.isEditing ? false : required,
          isPassword: this.isEditing ? true : validator.isPassword
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
      rdosSubcategories: {
        required
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
}
</script>

<style scoped>
</style>
