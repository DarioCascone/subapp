<template>
  <q-form @submit="loadRdo">
    <div class="row wrap justify-center content-center no-padding no-margin q-gutter-x-md q-gutter-y-xs">
      <div class="col-md-3">
        <q-input   outlined
                   v-model="rdo.contractor"
                   type="text"
                   label="Appaltatore *"
                   class="col-12 col-md-3"
                   reactive-rules name="contractor"
                   :rules="[ (val) => isValid('contractor', val, $v.rdo) ]"/>

        <q-input class="col-md-2" label="Data scadenza *" :rules="[ (val) => isValid('expirationDate', val, $v) ]" outlined v-model="expirationDate" mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date :locale="currentLocale" v-model="expirationDate" :options="calendarOption"  mask="DD/MM/YYYY">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Annulla" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input outlined
                 v-model="rdo.reference"
                 type="number"
                 label="Contatto referente *"
                 class="col-12 col-md-3"
                 reactive-rules name="reference"
                 :rules="[ (val) => isValid('reference', val, $v.rdo) ]" />

        <div class="col-md-3">
          <span>Disponibilità sopralluoghi</span>
          <q-toggle
            v-model="rdo.needInspection"
            checked-icon="check"
            color="accent"
            unchecked-icon="clear"
          />
        </div>

        <div class="col-md-3 q-pt-md">
          Richieste di offerta *
        </div>
        <div class="desktop-only col-md-3"></div>
        <div class="desktop-only col-md-3"></div>

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
                  :rules="[ (val) => isValid('rdosMacrocategories', val, $v) ]"/>

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
                  :rules="[ (val) => isValid('rdosCategories', val, $v) ]"/>

        <q-select class="col-md-3"
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
                  :rules="[ (val) => isValid('rdosSubcategories', val, $v) ]"/>

        <div class="desktop-only col-md-3"></div>

        <q-select v-model="rdo.imports"
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
                  :rules="[ (val) => isValid('imports', val, $v.rdo) ]"/>

        <q-select @input="getRegionOptions"
                  class="col-12 col-md-3"
                  outlined
                  :options-dense="true"
                  v-model="country"
                  label="Nazione *"
                  :options="countries" option-label="description"
                  reactive-rules
                  name="country"
                  emit-value
                  map-options
                  :rules="[ (val) => isValid('country', val, $v) ]"
                  transition-show="scale"
                  transition-hide="scale"/>

        <q-select class="col-12 col-md-3"
                  :disable="(!(country && regions.length>0))" :readonly="!(country && regions.length>0)"
                  :options="regions" option-label="description"  :options-dense="true"
                  outlined
                  v-model="rdo.regionOfInterest"
                  label="Regione *"
                  name="region"
                  emit-value
                  reactive-rules
                  :rules="[ (val) => isValid('regionOfInterest', val, $v.rdo) ]"
                  map-options
                  transition-show="scale"
                  transition-hide="scale"/>
        <div class="col-md-3 q-pt-md">
          CME *
        </div>
        <div class="col-md-3">
          <q-file
            v-model="cmeFile"
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

        <div class="col-md-3 q-pt-md">
          Immagini
        </div>

        <div class="col-md-3">
          <q-file
            v-model="images"
            label="Carica quì eventuali immagini"
            accept=".png, .jpeg, .jpg"
            multiple
            outlined
            use-chips
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>

        <div class="col-md-3 q-pt-md">
          Eventuali problematiche o particolarità
        </div>
        <div class="col-md-3 q-pb-md">
          <q-input   outlined
                     label="Testo"
                     class="col-12"
                     type="textarea"
                     name="peculiarity"
                     v-model="rdo.peculiarity"/>
        </div>

        <q-input class="col-md-2" label=" Data prevista per inizio *" :rules="[ (val) => isValid('startDate', val, $v) ]" outlined v-model="startDate" mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date :locale="currentLocale" v-model="startDate" :options="calendarOption"  mask="DD/MM/YYYY">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Annulla" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input class="col-md-2" label=" Data presunta fine *" :rules="[ (val) => isValid('endDate', val, $v) ]" outlined v-model="endDate" mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date :locale="currentLocale" v-model="endDate" :options="calendarOption"  mask="DD/MM/YYYY">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Annulla" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="q-pa-xl">
          <q-btn push
                 :ripple="false"
                 class="full-width"
                 label="Carica RDO"
                 color="secondary"
                 type='submit'/>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
import Rdo from 'src/model/rdo'
import validator from 'src/validations/validator'
import { imports } from 'src/costants/options'
import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'LoadRdo',
  data () {
    return {
      rdo: new Rdo(),
      rdosCategories: [],
      rdosMacrocategories: [],
      rdosSubcategories: [],
      isValid: validator.isValid,
      imports: imports,
      country: undefined,
      images: [],
      cmeFile: undefined,
      expirationDate: undefined,
      startDate: undefined,
      endDate: undefined,
      currentLocale: {
        days: '_Lunedì_Martedì_Mercoledì_Giovedì_Sabato_Domenica'.split('_'),
        daysShort: 'Lun_Mar_Mer_Gio_Ven_Sab_Dom'.split('_'),
        months: 'Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre'.split('_'),
        monthsShort: 'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic'.split('_'),
        firstDayOfWeek: 0
      }
    }
  },
  methods: {
    ...mapActions([
      'getMacroRdo',
      'getCatRdo',
      'getSubRdo',
      'getRegions',
      'getCountries',
      'updateRdo',
      'fetchUser',
      'createRdo',
      'uploadFile'
    ]),
    async getRegionOptions () {
      await this.getRegions(this.country._id)
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
    },
    async loadRdo () {
      if (!this.$v.$invalid) {
        this.$q.loading.show()
        this.rdo.expirationDate = date.extractDate(this.expirationDate, 'DD/MM/YYYY')
        this.rdo.startDate = date.extractDate(this.startDate, 'DD/MM/YYYY')
        this.rdo.endDate = date.extractDate(this.endDate, 'DD/MM/YYYY')
        const obj = {
          pathParam: this.userLogged._id,
          body: this.rdo
        }
        const data = await this.createRdo(obj)
        await this.postFilesAndUpdateRdo(data.rdo)
        await this.fetchUser(obj)
        this.$q.loading.hide()
      }
    },
    async postFilesAndUpdateRdo (rdo) {
      const formData = new FormData()
      formData.append('file', this.cmeFile, 'cmeFile')
      this.images.forEach((image) => {
        formData.append('file', image, 'images')
      })
      const uploadedFiles = await this.uploadFile(formData)
      uploadedFiles.forEach((file) => {
        if (file.originalname === 'images') {
          rdo[file.originalname].push(file)
        } else {
          rdo[file.originalname] = file
        }
      })
      const obj = {
        pathParam: rdo._id + '/' + this.userLogged._id,
        body: rdo
      }
      await this.updateRdo(obj)
    },
    calendarOption (date) {
      const currentTime = new Date()
      return date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/')
    }
  },
  computed: {
    ...mapGetters({
      macroRdo: 'macroRdo',
      userLogged: 'user',
      catRdo: 'catRdo',
      regions: 'regions',
      subRdo: 'subRdo',
      countries: 'countries'
    })
  },
  async created () {
    await this.getCountries()
    await this.getMacroRdo()
  },
  async mounted () {
    this.rdo.contractor = this.userLogged.companyName
    this.$v.$touch()
  },
  validations () {
    return {
      rdo: {
        imports: {
          required
        },
        regionOfInterest: {
          required
        },
        contractor: {
          required
        },
        needInspection: {
          required
        },
        reference: {
          required
        }
      },
      country: {
        required
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
      startDate: {
        required
      },
      endDate: {
        required
      },
      expirationDate: {
        required
      }
    }
  }
}
</script>

<style scoped>

</style>
