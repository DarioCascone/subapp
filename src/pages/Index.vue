<template>
  <q-page>
    <section class="fullpage section-title" v-bind:style="heroImage">
      <q-carousel
        animated
        v-model="slide"
        swipeable
        padding
        infinite
        :autoplay="true"
        control-color="white"
        class="home-carousel"
      >
        <q-carousel-slide class="text-center column flex flex-center overflow-hidden" :name="1">
              <div class="text-h2 main_line animation_2">BENVENUTO IN <span :style="'color:'+theme_color">SUBAPP.IT</span></div><br><br><br>
              <div class="text-h4 second-line animation_1">Una piattaforma digitale che permette agli appaltatori di cercare potenziali subappaltatori per lavori, servizi e forniture, su tutto il territorio nazionale.</div><br><br><br>
              <img src="">
        </q-carousel-slide>
        <q-carousel-slide class="text-center column flex flex-center overflow-hidden" :name="2">
              <div class="text-h2 main_line animation_2" style="font-size:65px;">PERCHÈ <span :style="'color:'+theme_color">SUBAPP.IT</span>?</div><br><br><br>
              <div class="text-h4 second-line animation_1"> <br>A differenza di altre piattaforme, con SubApp.it le imprese appaltatrici ricercano imprese organizzate ed in regola con la documentazione, in grado di eseguire appalti pubblici e privati.</div><br><br><br>
        </q-carousel-slide>
      </q-carousel>
    </section>
    <q-space></q-space>
    <section id="id_how_works" class="fullpage how-works-section">
      <div class="row flex flex-center how-works-section-container">
        <header>
          <p class="cutted_title">
            <span class="cutted_title--text">COME FUNZIONA SUBAPP.IT</span>
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
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
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
                TROVA L'OFFERTA
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
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
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <footer>
          <q-btn class="full-width q-pa-xs"
                 @click="openModal('login', 'accedi', false, loginClassObj)"
                 style="background: #29ABF4; color: white" label="Sei gia' registrato? Clicca quì"/>
        </footer>
      </div>
    </section>
    <q-space></q-space>
    <section class="fullpage section-card">
      <div class="row text-center flex flex-center">
          <div class="col-md-5 col-lg-5 col-sx-12 col-sm-12">
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-parallax
                  src="../assets/signature.jpg"
                  :height="350"
                />
                <q-card-section>
                  <div class="text-h6">SEI UN APPALTATORE?</div>
                  <div class="text-subtitle2">
                    Potresti avere bisogno di SubApp.it se:
                    <br>
                    - perdi ore sui motori di ricerca o altre piattaforme
                    <br>
                    - trovi un’impresa interessata ma ti chiede più di quanto appaltato
                    <br>
                    - dopo una estenuante trattativa subentrano problemi con l’iscrizione alla CCIAA, il DURC, la sicurezza ed etc
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="col-md-5 col-lg-5 col-sx-12 col-sm-12">
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-parallax
                  src="../assets/crane.jpg"
                  :height="350"
                />
                <q-card-section>
                  <div class="text-h6">SEI UN SUBAPPALTATORE?</div>
                  <div class="text-subtitle2">
                    Potresti avere bisogno di SubApp.it se:
                    <br>
                    - sei alla ricerca di nuove commesse
                    <br>
                    Con SubApp.it hai la possibilità di creare nuove collaborazioni su tutto il territorio nazionale
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
      </div>
    </section>
    <q-space></q-space>
    <section class="fullpage" id="id_pricing">
      <div class="pricing" >
        <div class="" style="background-color: #000000ad !important;">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
              <h5 class="text-center text-white">I Nostri Piani
                <br>
                <span
                  class="text-center text-grey text-h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </h5>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-px-xl">
            <div class="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-xs-12 col-sm-6 q-px-lg">
              <q-card>
                <q-card-section class="text-white" style="background: #21BA45">
                  <div class="text-h6 text-center">
                    ANNUALE
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-md">
                  <q-list dense padding style="border-bottom: 1px solid lightgrey;">
                    <q-item>
                      NO costi di acquisizione crediti
                    </q-item>
                    <q-item>
                      NO costi di partecipazione alle RDO
                    </q-item>
                    <q-item>
                      NO percentuali sui lavori o sulla conclusione dell’affare
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-section class="q-pa-none" style="color: #444444">
                  <div class="text-center">
                    <span class="text-h2 text-center">€140</span>/anno
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="text-center q-px-lg">
                    <q-btn size="md" class="full-width q-pa-xs"
                           @click="openModal('sign-in', 'registrati', true, singInClassObj)"
                           style="background: #21BA45; color: white" label="Scegli il piano"/>
                    <br>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-6 q-px-lg">
              <q-card>
                <q-card-section class="text-white" style="background: #29ABF4">
                  <div class="text-h6 text-center">
                    BIENNALE
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-md">
                  <q-list dense padding style="border-bottom: 1px solid lightgrey;">
                    <q-item>
                      NO costi di acquisizione crediti
                    </q-item>
                    <q-item>
                      NO costi di partecipazione alle RDO
                    </q-item>
                    <q-item>
                      NO percentuali sui lavori o sulla conclusione dell’affare
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-section class="q-pa-none" style="color: #444444">
                  <div class="text-center">
                    <span class="text-h2 text-center">€250</span>/anno
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="text-center q-px-lg">
                    <q-btn size="md" class="full-width q-pa-xs"
                           @click="openModal('sign-in', 'registrati', true, singInClassObj)"
                           style="background: #29ABF4; color: white" label="Scegli il piano"/>
                    <br>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <br>
          <br>
        </div>
      </div>
    </section>
    <modal :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
  </q-page>
</template>

<script>

import Modal from 'components/Modal'

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
      }
    }
  },
  computed: {
    heroImage () {
      return {
        background: `linear-gradient(rgba(10,10,10,.5), rgba(10,10,10,.5)), url(${require('../assets/handshake.jpg')})`
      }
    }
  },
  methods: {
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      console.log(this.modalComponent)
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
    }
  },
  created () {
  }
}
</script>
