<template>
  <q-page style="overflow-x: hidden">
    <section class="fullpage section-title"  v-bind:style="heroImage">
      <q-carousel
        animated
        v-model="slide"
        swipeable
        padding
        infinite
        :autoplay="10000"
        control-color="white"
        class="home-carousel"
      >
        <q-carousel-slide class="text-center column flex flex-center overflow-hidden" :name="1">
              <div class="text-h2 main_line animation_2">BENVENUTO IN <span :style="'color:'+theme_color">SUBAPP</span></div><br><br><br>
              <div class="text-h4 second-line animation_1">Una piattaforma digitale che permette agli appaltatori di cercare potenziali subappaltatori per lavori, servizi e forniture, su tutto il territorio nazionale.</div><br><br><br>
              <img src="">
        </q-carousel-slide>
        <q-carousel-slide class="text-center column flex flex-center overflow-hidden" :name="2">
              <div class="text-h2 main_line animation_2" style="font-size:65px;">PERCHÈ <span :style="'color:'+theme_color">SUBAPP</span>?</div><br><br><br>
              <div class="text-h4 second-line animation_1"> <br>A differenza di altre piattaforme, con SubApp le imprese appaltatrici ricercano imprese organizzate ed in regola con la documentazione, in grado di eseguire appalti pubblici e privati.</div><br><br><br>
        </q-carousel-slide>
      </q-carousel>
    </section>
    <q-space></q-space>
    <section id="id_how_works" class="fullpage how-works-section">
      <div class="row flex flex-center how-works-section-container">
        <header>
          <p class="cutted_title">
            <span class="cutted_title--text">COME FUNZIONA SUBAPP</span>
          </p>
        </header>
        <div class="how-works-section--grid">
          <div class="how-works-section-block">
            <div data-aos="zoom-in-up" data-aos-easing="ease-in-sine" data-aos-delay="200" class="round">
              <q-badge rounded class="absolute-top-left rounded-badge">1</q-badge>
              <q-icon  class="absolute-center badge-icon" name="app_registration" />
            </div>
            <div class="step-description">
              <p class="step-title">
                REGISTRATI
              </p>
              <p>
                Inserisci i dati della tua impresa.
              </p>
            </div>
          </div>
          <div class="how-works-section-block">
            <div data-aos="zoom-in-up" data-aos-easing="ease-in-sine" data-aos-delay="400" class="round">
              <q-badge rounded class="absolute-top-left rounded-badge">2</q-badge>
              <q-icon   class="absolute-center badge-icon" name="business" />
            </div>
            <div class="step-description">
              <p class="step-title">
                CARICA LA RICHIESTA D'OFFERTA
              </p>
              <p>
                Carica descrizione, documenti
                e foto relativi alla tua RDO.
              </p>
            </div>
          </div>
          <div class="how-works-section-block">
            <div data-aos="zoom-in-up" data-aos-easing="ease-in-sine" data-aos-delay="600" class="round">
              <q-badge rounded class="absolute-top-left rounded-badge">3</q-badge>
              <q-icon  class="absolute-center badge-icon" name="work" />
            </div>
            <div class="step-description">
              <p class="step-title">
                CONCLUDI L'AFFARE
              </p>
              <p>
                Scegli liberamente l'offerta più conveniente.
              </p>
            </div>
          </div>
        </div>
        <footer>
          <q-btn class="full-width q-pa-xs"
                 push
                 :ripple="false"
                 v-if="!userLogged"
                 @click="openModal('login', 'accedi', false, loginClassObj)"
                 style="background: #29ABF4; color: white" label="Sei gia' registrato? Clicca quì"/>
        </footer>
      </div>
    </section>
    <q-space></q-space>
    <section class="fullpage section-card">
      <div class="row text-center flex flex-center">
          <div  class="col-md-5 col-lg-5 col-sx-12 col-sm-12">
            <div class="q-pa-md">
              <q-card data-aos="slide-right" data-aos-delay="200" data-aos-duration="750" class="my-card card-left">
                <q-parallax
                  src="../assets/signature.jpg"
                  :height="350"
                />
                <q-card-section>
                  <div class="text-h6">SEI UN APPALTATORE?</div>
                  <div class="text-subtitle2">
                    Potresti avere bisogno di SubApp.it se:
                    <ul>
                      <li>
                      perdi ore sui motori di ricerca o altre piattaforme alla ricerca di potenziali subappaltatori
                      </li>
                      <li>
                      trovi un’impresa interessata ma ti chiede più di quanto appaltato
                      <li>
                      dopo una estenuante trattativa subentrano problemi con l’iscrizione alla CCIAA, il DURC, la sicurezza ed etc
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div  class="col-md-5 col-lg-5 col-sx-12 col-sm-12">
            <div class="q-pa-md">
              <q-card data-aos="slide-left" data-aos-delay="200" data-aos-duration="750" class="my-card card-right">
                <q-parallax
                  src="../assets/crane.jpg"
                  :height="350"
                />
                <q-card-section>
                  <div class="text-h6">SEI UN SUBAPPALTATORE?</div>
                  <div class="text-subtitle2">
                    Potresti avere bisogno di SubApp.it se:
                    <ul>
                      <li>
                        sei alla ricerca di nuove commesse
                      </li>
                      <li>
                       vuoi creare nuove collaborazioni su tutto il territorio nazionale
                      </li>
                      <li>
                        hai intenzione di incrementare le tue entrate
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
      </div>
    </section>
    <q-space></q-space>
    <section class="fullpage pricing-section" id="id_pricing">
      <div class="pricing-section-container" >
        <div class="row">
          <header>
            <p class="cutted_title">
              <span class="cutted_title--text">PREZZI</span>
            </p>
            <h5 class="text-center ">
              <span
                class="text-center text-h6">Scegli il piano giusto per te!</span>
            </h5>
          </header>
        </div>
        <div class="row q-col-gutter-sm q-px-xl">
          <div class="wrapper">
            <div class="package">
              <div class="name">ANNUALE</div>
              <div class="price one-year">€140</div>
              <div class="trial">Offerta lancio</div>
              <hr>
              <ul>
                <li>
                  <span class="checkIcon">&#10003;</span>  <strong>NO</strong> costi di acquisizione crediti
                </li>
                <li>
                  <span class="checkIcon">&#10003;</span>  <strong>NO</strong> costi di partecipazione alle RDO
                </li>
                <li>
                  <span class="checkIcon">&#10003;</span>  <strong>NO</strong> percentuali sui lavori o sulla conclusione dell’affare
                </li>
              </ul>
              <br>
              <div class="text-center q-px-lg">
                <q-btn v-if="!userLogged" size="md" class="full-width q-pa-xs"
                       @click="openModal('sign-in', 'registrati', true, singInClassObj)"
                       style="background: #29ABF4; color: white" label="Scegli il piano"/>
                <br>
              </div>
            </div>
            <div class="package">
              <div class="name">BIENNALE</div>
              <div class="price two-years">€250</div>
              <div class="trial">Offerta lancio</div>
              <hr>
              <ul>
                <li>
                  <span class="checkIcon">&#10003;</span>  <strong>NO</strong> costi di acquisizione crediti
                </li>
                <li>
                  <span class="checkIcon">&#10003;</span> <strong>NO</strong> costi di partecipazione alle RDO
                </li>
                <li>
                  <span class="checkIcon">&#10003;</span> <strong>NO</strong> percentuali sui lavori o sulla conclusione dell’affare
                </li>
              </ul>
              <br>
              <div class="text-center q-px-lg">
                <q-btn v-if="!userLogged" size="md" class="full-width q-pa-xs"
                       @click="openModal('sign-in', 'registrati', true, singInClassObj)"
                       style="background: #29ABF4; color: white" label="Scegli il piano"/>
                <br>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
      </div>
    </section>
    <section class="fullpage contact-us-section" id="contact_us">
      <div class="row wrap justify-center content-center q-gutter-y-xs contact-us-section-container">
        <div class="row col-12 q-gutter-y-xs">
          <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <header>
              <p class="cutted_title">
                <span class="cutted_title--text">CONTATTI</span>
              </p>
              <h5 class="text-center ">
              <span
                class="text-center text-h6">Utilizza il form sottostante per comunicare con noi</span>
              </h5>
            </header>
          </div>
        </div>
        <q-form @submit.prevent.stop="onSendEmail" class="col-12 col-md-8">
          <div class="col-12 col-md-6 row wrap content-center q-gutter-y-lg">
            <q-input   outlined
                       type="text"
                       label="Indica la tua email *"
                       class="col-12 col-md-5"
                       reactive-rules
                       name="emailFrom"
                       v-model="emailToSend.emailFrom"
                       :rules="[ (val) => isValid('emailFrom', val, $v.emailToSend) ]" />
            <q-input   outlined
                       label="Di cosa hai bisogno? *"
                       class="col-12"
                       type="textarea"
                       reactive-rules
                       name="emailBody"
                       v-model="emailToSend.emailBody"
                       :rules="[ (val) => isValid('emailBody', val, $v.emailToSend) ]" />
            <div class="col-12 row">
                <div>
                  <q-checkbox
                    color="accent"
                    name="privacyAgreement"
                    v-model="privacyAgreement"/>
                  <span>Ho preso visione della <a class="hyperlink" >Privacy Policy</a> ed acconsento al trattamento dei dati. *</span>
                </div>
            </div>
            <div class="col-12 row justify-center">
              <q-btn size="md" class="col-12 col-md-3"
                     :disable="privacyAgreement === false"
                     style="background: #102754;
                     color: white" label="Invia"
                     push
                     :ripple="false"
                     type='submit'>
              </q-btn>
            </div>
          </div>
        </q-form>
        <br>
        <div class="col-12 row justify-center social-container" style="display: none">
          <div class="text-center col-12">
            <div class="text-center text-h6">oppure chiama il</div>
            <div>
              <template>
                <q-icon size="sm" color="secondary" name="fas fa-phone-alt"> </q-icon>
              </template>
              <a href="tel:+393331234567" class="hyperlink">+39 3331234567</a>
            </div>
          </div>
        </div>
      </div>
      <br>

    </section>
    <modal :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
  </q-page>
</template>

<script>

import Modal from 'components/Modal'
import validator from 'src/validations/validator'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Modal },
  data () {
    return {
      slide: 1,
      review_slide: 'style',
      team_slide: 1,
      bg_color: 'rgb(0, 163, 82)',
      hover: false,
      active: false,
      theme_color: '#29ABF4',
      background_style: 'background-color:rgba(0, 163, 82, 0.7);',
      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242',
      modal: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      classObj: {},
      loginClassObj: {
        'bg-white': true
      },
      singInClassObj: {
        'q-pa-none': true
      },
      headerHeight: '100vh',
      isValid: validator.isValid,
      emailToSend: {
        emailFrom: '',
        emailBody: ''
      },
      privacyAgreement: false
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    }),
    heroImage () {
      return {
        background: `linear-gradient(rgba(10,10,10,.5), rgba(10,10,10,.5)), url(${require('../assets/handshake.jpg')})`,
        height: this.headerHeight
      }
    }
  },
  methods: {
    ...mapActions([
      'sendMail'
    ]),
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
    },
    async onSendEmail () {
      this.$v.$touch()
      this.$forceUpdate()
      if (!this.$v.$invalid) {
        this.$q.loading.show()
        const infoEmail = {
          to: 'antonio.cacciapuoti@live.com',
          from: 'dario.cascone93@gmail.com',
          subject: 'Richiesta info - from: ' + this.emailToSend.emailFrom,
          html: 'from: ' + this.emailToSend.emailFrom + '<br><br>' + this.emailToSend.emailBody
        }
        await this.sendMail(infoEmail)
        this.$q.loading.hide()
      }
    }
  },
  validations: {
    emailToSend: {
      emailFrom: {
        required: required,
        email
      },
      emailBody: {
        required: required
      }
    }
  },
  mounted () {
    this.headerHeight = 'calc(100vh - ' + (document.querySelector('.primary-header').offsetHeight) + 'px)'
    this.$emit('refreshAos')
  }
}
</script>
