<template>
  <q-form @submit="loadRdo">
    <div class="row wrap justify-center content-center q-pt-lg no-margin q-gutter-x-md q-gutter-y-xs">

      <q-input   outlined
                 :disable="selectedRdo != null"
                 v-model="rdo.contractor"
                 type="text"
                 label="Appaltatore *"
                 class="col-12 col-md-3"
                 reactive-rules name="contractor"
                 :rules="[ (val) => isValid('contractor', val, $v.rdo) ]"/>

      <div v-if="(selectedRdo != null && rdo.user._id != userLogged._id && !userLogged.admin)"
           class="col-12 col-md-3">
        <div>Ribasso del <span style="color: #29ABF4; font-weight: bold">{{ribasso}}%</span></div>
        <template>
          <q-slider
            v-model="ribasso"
            :min="0"
            :max="100"
            :step="1"
            label
            :label-value="ribasso + '%'"
            color="accent"
          />
        </template>
      </div>

      <div v-if="!(selectedRdo != null  && rdo.user._id != userLogged._id && !userLogged.admin)"  class="desktop-only col-md-3"></div>
      <div class="desktop-only col-md-3"></div>

      <!-- Riga -->

      <q-input   outlined
                 label="Descrizione *"
                 class="col-12 col-md-3 "
                 type="textarea"
                 name="description"

                 v-model="rdo.description"
                 :disable="selectedRdo != null"
                 reactive-rules
                 :rules="[ (val) => isValid('description', val, $v.rdo) ]" >
        <template v-slot:append>
          <q-icon class="desktop-only text-secondary" name="info">
            <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
              Fornici una breve descrizione dell’appalto
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <q-input   outlined
                 label="Documenti necessari"
                 class="col-12 col-md-3"
                 type="textarea"
                 name="requiredDocuments"
                 :disable="selectedRdo != null"
                 v-model="rdo.requiredDocuments"
                 reactive-rules
                 :rules="[ (val) => {return true} ]" >
        <template v-slot:append>
          <q-icon class="desktop-only text-secondary" name="info">
            <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
              Indica se vi sono documenti di primaria importanza ai fini del subappalto
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <q-input   outlined
                 label="Eventuali problematiche o peculiarità"
                 class="col-12 col-md-3"
                 type="textarea"
                 name="peculiarity"
                 :disable="selectedRdo != null"
                 v-model="rdo.peculiarity"
                 reactive-rules
                 :rules="[ (val) => {return true} ]" >
        <template v-slot:append>
          <q-icon class="desktop-only text-secondary" name="info">
            <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
              Indica se vi sono problematiche o peculiarità di cui il subappaltatore dovrà tenere conto nella formulazione dell’offerta
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <!-- Riga -->

      <q-input @click="$refs.qDateProxy.show()"
               onkeydown="return false"
               :disable="selectedRdo != null"
               class="col-12 col-md-3" label="Data scadenza *"
               :rules="[ (val) => isValid('expirationDate', val, $v) ]"
               outlined v-model="expirationDate" mask="##/##/####">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date :readonly="selectedRdo" @input="resetStartEndDate"  :locale="currentLocale" v-model="expirationDate" :options="calendarDataScadenza"  mask="DD/MM/YYYY">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Annulla" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input @click="$refs.startDateProxy.show()"
               onkeydown="return false"
               :disable="selectedRdo != null || expirationDate == null"
               class="col-12 col-md-3" label=" Data prevista per inizio appalto *"
               :rules="[ (val) => isValid('startDate', val, $v) ]"
               outlined v-model="startDate" mask="##/##/####">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="startDateProxy" transition-show="scale" transition-hide="scale">
              <q-date :readonly="selectedRdo" @input="resetEndDate" :disable="expirationDate == null" :locale="currentLocale" v-model="startDate" :options="calendarDataInizio"  mask="DD/MM/YYYY">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Annulla" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input @click="$refs.endDateProxy.show()" onkeydown="return false"
               :disable="selectedRdo != null || expirationDate == null || startDate == null"
               class="col-12 col-md-3" label=" Data presunta fine appalto *"
               :rules="[ (val) => isValid('endDate', val, $v) ]" outlined v-model="endDate" mask="##/##/####">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="endDateProxy" transition-show="scale" transition-hide="scale">
              <q-date :locale="currentLocale" v-model="endDate" :options="calendarDataFine"  mask="DD/MM/YYYY">
                <div :disable="expirationDate == null || startDate == null" class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Annulla" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <!-- Riga -->

      <q-select class="col-12 col-md-3"
                outlined
                :options-dense="true"
                v-if="!selectedRdo"
                v-model="country"
                :disable="true"
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
                :disable="(!(country && regions.length>0))" :readonly="!(country && regions.length>0 && !selectedRdo)"
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

      <q-select v-model="rdo.imports"
                :options="imports"
                :disable="selectedRdo != null"
                name="imports"
                outlined
                class="col-12 col-md-3"
                option-dense
                multiple
                label="Importi *"
                use-chips
                transition-show="scale"
                transition-hide="scale"
                reactive-rules
                :rules="[ (val) => isValid('imports', val, $v.rdo) ]"/>

      <div v-if="selectedRdo" class="desktop-only col-md-3"></div>
      <!-- Riga -->

      <q-select @input="getCatRdoOption"
                class="col-12 col-md-3"
                multiple
                use-chips
                outlined option-dense
                :disable="selectedRdo != null"
                v-model="rdosMacrocategories"
                :options="macroRdo" option-label="description"
                label="Macrocategoria RDO"
                name="macrocategory"
                transition-show="scale"
                transition-hide="scale"
                emit-value
                map-options
                reactive-rules
                :rules="[ (val) => isValid('rdosMacrocategories', val, $v) ]"/>

      <q-select @input="getSubcatRdoOption"
                class="col-12 col-md-3"
                :disable="!rdosMacrocategories.length>0 || selectedRdo != null"
                :readonly="!rdosMacrocategories.length>0 || selectedRdo != null"
                outlined
                :options="catRdo" option-label="description"
                :options-dense="true"
                v-model="rdosCategories"
                label="Categoria RDO"
                multiple use-chips
                name="category"
                emit-value
                map-options
                transition-show="scale"
                transition-hide="scale"
                reactive-rules
                :rules="[ (val) => isValid('rdosCategories', val, $v) ]"/>

      <q-select class="col-12 col-md-3"
                :disable="!rdosCategories.length>0 || selectedRdo != null"
                :readonly="!rdosCategories.length>0 || selectedRdo != null"
                outlined
                :options="subRdo" option-label="description"
                :options-dense="true"
                v-model="rdosSubcategories"
                label="Sottocategoria RDO"
                multiple use-chips
                name="subcategory"
                emit-value
                map-options
                transition-show="scale"
                transition-hide="scale"
                reactive-rules
                :rules="[ (val) => isValid('rdosSubcategories', val, $v) ]"/>

      <!-- Riga -->

      <div class="col-12 col-md-3">
        <q-file
          v-if="!selectedRdo"
          v-model="cmeFile"
          label="Carica quì il CME *"
          accept=".pdf"
          outlined
          use-chips
          :rules="[ (val) => isValid('cmeFile', val, $v) ]"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

      </div>

      <div class="col-12 col-md-3">
        <q-file
          v-if="!selectedRdo"
          v-model="images"
          label="Carica quì eventuali immagini"
          accept=".png, .jpeg, .jpg"
          multiple
          outlined
          use-chips
          :rules="[ (val) => { return true }]"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

      </div>

      <div class="col-12 col-md-3">
        <q-file
          v-if="!selectedRdo"
          v-model="technicalFiles"
          label="Carica quì eventuali file tecnici"
          accept=".pdf"
          multiple
          outlined
          use-chips
          :rules="[ (val) => { return true }]"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

      </div>

      <!-- Riga -->

      <q-input outlined
               v-model="rdo.reference"
               label="Contatto referente *"
               class="col-12 col-md-3"
               reactive-rules name="reference"
               :disable="selectedRdo != null"
               :rules="[ (val) => isValid('reference', val, $v.rdo) ]">
        <template v-slot:append>
          <q-icon class="desktop-only text-secondary" name="info">
            <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-accent" content-style="font-size: 13px" :offset="[10, 10]">
              Contatto del responsabile al quale poter eventualmente richiedere maggiori informazioni
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <div class="col-12 col-md-3 flex column justify-center" style="height: 56px">
        <div>
          <span>Disponibilità sopralluoghi</span>
          <q-toggle
            v-model="rdo.needInspection"
            checked-icon="check"
            color="accent"
            unchecked-icon="clear"
            :disable="selectedRdo != null" />
        </div>
      </div>

      <div class="desktop-only col-md-3"></div>

      <div v-if="selectedRdo != null" class="col-12 col-md-3">
        <q-table
          title="Lista file"
          :data="data"
          :columns="columns"
          row-key="name"
          bordered
          separator="cell"
        >
          <template>
            <div class="col-2 q-table__title">Lista file</div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td  key="description" :props="props">
                <div>
                  {{ props.row.file.originalname }} <span v-if="props.row.file.index != null"> n. {{ props.row.file.index+1 }}</span>
                </div>
              </q-td>
              <q-td key="download" :props="props" >
                <q-icon v-if="props.row.file.path" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.file.path)"></q-icon>  </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <div v-if="selectedRdo != null" class="desktop-only col-md-3"></div>
      <div v-if="selectedRdo != null" class="desktop-only col-md-3"></div>

      <div class="col-12 row justify-center q-pt-xl q-pb-xl no-margin">
        <q-btn  v-if="(selectedRdo == null && rdo.user._id != userLogged._id)"
                push
                :ripple="false"
                class="col-3"
                label="Conferma"
                color="secondary"
                type='submit'/>

        <q-btn  v-if="(selectedRdo != null && rdo.user._id != userLogged._id && !userLogged.admin)"
                push
                :ripple="false"
                class="col-3"
                label="Invia Ribasso"
                color="secondary"
                @click="inviaRibasso"
                type='submit'/>
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
  props: ['selectedRdo'],
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
      technicalFiles: [],
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
      },
      ribasso: 0,
      columns: [
        { name: 'description', label: 'File', align: 'center' },
        { name: 'download', label: 'Download', align: 'center' }
      ],
      data: [],
      isTelephoneNumber: validator.isTelephoneNumber
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
      'uploadFile',
      'fetchRdos',
      'sendMail'
    ]),
    getData () {
      if (this.data.length > 0) this.data = []
      this.rdo.images.forEach((img, index) => {
        img.index = index
        const obj = {
          file: img
        }
        this.data.push(obj)
      })
      this.rdo.technicalFiles.forEach((file, index) => {
        file.index = index
        const obj = {
          file: file
        }
        this.data.push(obj)
      })
      if (this.rdo.cmeFile) {
        const obj = {
          file: this.rdo.cmeFile
        }
        this.data.push(obj)
      }
    },
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
        this.rdo.user = this.userLogged
        this.rdo.rdos = this.rdosSubcategories
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
        await this.fetchRdos()
        this.$emit('loadRdoSuccess', false)
        this.$q.loading.hide()
      }
    },
    async postFilesAndUpdateRdo (rdo) {
      const formData = new FormData()
      formData.append('file', this.cmeFile, `cmeFile.${this.cmeFile.name.split('.')[1]}`)
      this.images.forEach((image) => {
        formData.append('file', image, `images.${image.name.split('.')[1]}`)
      })
      this.technicalFiles.forEach((techFile) => {
        formData.append('file', techFile, `technicalFiles.${techFile.name.split('.')[1]}`)
      })
      const uploadedFiles = await this.uploadFile(formData)
      uploadedFiles.files.forEach((file) => {
        if (file.originalname === 'images' || file.originalname === 'technicalFiles') {
          rdo[file.Key.split('.')[1]].push(file)
        } else {
          rdo[file.Key.split('.')[1]] = file
        }
      })
      const obj = {
        pathParam: rdo._id + '/' + this.userLogged._id,
        body: rdo
      }
      await this.updateRdo(obj)
    },
    calendarDataScadenza (date) {
      const currentTime = new Date()
      return date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/')
    },
    calendarDataInizio (date) {
      let dataScadenza
      if (this.expirationDate == null) {
        dataScadenza = new Date()
      } else {
        const dd = this.expirationDate.substr(0, 2)
        const mm = this.expirationDate.substr(3, 2)
        const yyyy = this.expirationDate.substr(6, 4)
        dataScadenza = new Date(mm + '/' + dd + '/' + yyyy)
      }
      return date >= dataScadenza.toLocaleDateString('fr-CA').replaceAll('-', '/')
    },
    calendarDataFine (date) {
      let dataInizio
      if (this.startDate == null) {
        dataInizio = new Date()
      } else {
        const dd = this.startDate.substr(0, 2)
        const mm = this.startDate.substr(3, 2)
        const yyyy = this.startDate.substr(6, 4)
        dataInizio = new Date(mm + '/' + dd + '/' + yyyy)
      }
      return date >= dataInizio.toLocaleDateString('fr-CA').replaceAll('-', '/')
    },
    resetStartEndDate () {
      this.startDate = undefined
      this.endDate = undefined
    },
    resetEndDate () {
      this.endDate = undefined
    },
    async inviaRibasso () {
      this.$q.loading.show()
      const infoRibassoEmail = {
        to: this.rdo.user.username,
        from: 'dario.cascone93@gmail.com',
        subject: 'Ricezione offerta per RDO: ' + this.rdo.description,
        html: 'Spett.le ' + this.rdo.contractor + ', <br/>' +
          'l\'operatore economico <strong>' + this.userLogged.companyName + '</strong> ha inviato la seguente offerta: <br/>' +
          'Ribasso: <strong>' + this.ribasso + '%</strong><br/>' +
          'Note: ' + this.rdo.peculiarity + '<br/>' + this.rdo.requiredDocuments + '<br/><br/>' +
          'Di seguito trova i link ai file relativi all\'azienda: <br/>' +
          '<a target="_blank" href="http://localhost:3000/' + this.rdo.user.durcRegolarityFile.path + '">Regolarità Durc</a><br/>' +
          '<a target="_blank" href="http://localhost:3000/' + this.rdo.user.certificateFile.path + '">Certificato o Visura Camerale</a><br/>' +
          '<a target="_blank" href="http://localhost:3000/' + this.rdo.user.lendingFile.path + '">Presentazione</a><br/>' +
          '<a target="_blank" href="http://localhost:3000/' + this.rdo.user.antimafiaFile.path + '">Dichiarazione sostitutiva antimafia</a><br/>' +
          '<br/>Distinti Saluti,<br/>' +
          '<span style="color:#29ABF4">Subapp.it s.r.l.s</span>'
      }
      await this.sendMail(infoRibassoEmail)
      this.$q.loading.hide()
    },
    async loadSelectedRdo () {
      this.rdo = JSON.parse(JSON.stringify(this.selectedRdo)) // to avoid reference

      this.expirationDate = new Date(this.rdo.expirationDate).toLocaleDateString('fr')
      this.startDate = new Date(this.rdo.startDate).toLocaleDateString('fr')
      this.endDate = new Date(this.rdo.endDate).toLocaleDateString('fr')

      let macroOpt = []
      macroOpt = this.loadSelectedRdoOptions('macroRdo', macroOpt)
      this.rdosMacrocategories = macroOpt.filter((item, i, ar) => ar.indexOf(item) === i) // unique
      await this.getCatRdoOption()

      let catOpt = []
      catOpt = this.loadSelectedRdoOptions('catRdo', catOpt)
      this.rdosCategories = catOpt.filter((item, i, ar) => ar.indexOf(item) === i) // unique
      await this.getSubcatRdoOption()

      let subOpt = []
      subOpt = this.loadSelectedRdoOptions('subRdo', subOpt)
      this.rdosSubcategories = subOpt.filter((item, i, ar) => ar.indexOf(item) === i) // unique
    },
    loadSelectedRdoOptions (key, array) {
      this.rdo.rdos.forEach((rdo) => {
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
    downloadFile (path) {
      const rootPath = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/'
      window.open(rootPath + path)
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
    if (this.selectedRdo) {
      await this.getMacroRdo()
      await this.loadSelectedRdo()
      this.getData()
    } else {
      await this.getCountries()
      if (!this.selectedRdo) {
        this.country = this.countries.find((country) => {
          return country.description === 'Italia'
        })
      }
      await this.getRegionOptions()
      await this.getMacroRdo()
    }
  },
  async mounted () {
    if (!this.selectedRdo) {
      this.rdo.contractor = this.userLogged.companyName
      this.$v.$touch()
    }
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
          required,
          isTelephoneOrEmail: validator.isTelephoneOrEmail
        },
        description: {
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
      },
      cmeFile: {
        required
      }
    }
  }
}
</script>

<style scoped>

</style>
