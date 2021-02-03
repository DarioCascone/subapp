<template>
  <q-page>
    <q-carousel
      animated
      v-model="slide"
      arrows
      swipeable
      navigation
      infinite
      autoplay="true"
      control-color="white"
      transition-prev="slide-right"
      transition-next="slide-left"
      height="639px"
    >
      <q-carousel-slide class="q-pa-none" :name="1" img-src="/statics/images/image_1.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
          <div class="custom-caption">
            <div class="text-h2 main_line animation_2">WELCOME TO <span :style="'color:'+theme_color">SUBAPP</span></div><br><br><br>
            <div class="text-h4 animation_1">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum<br> Lorem ipsum.</div><br><br><br>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="q-pa-none" :name="2" img-src="/statics/images/image_2.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
          <div class="custom-caption">
            <div class="text-h2 main_line animation_2" style="font-size:65px;"><span :style="'color:'+theme_color">SUBAPP</span> FOR THE BEST</div><br><br><br>
            <div class="text-h4 animation_1">Lorem ipsum Lorem ipsum Lorem ipsum <br>Lorem ipsum.</div><br><br><br>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row" id="id_about_us">
      <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <h5 class="text-center">About Us
          <br>
          <span
            class="text-center text-grey text-h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </h5>
      </div>
    </div>
    <div class="row text-center flex flex-center">
      <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12 q-gutter-md flex flex-center">
        <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12">
          <q-card @mouseover="hoverOver(1)" @mouseout="hoverOutTimeout(1)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
            <q-img
              src="/statics/images/about_1.jpg"
            />

            <q-card-section>
              <div class="text-overline text-orange-9">Overline</div>
              <div :class="about_heading_1" :style="'color: ' + about_heading_color_1" class="about_heading_1 text-h6 q-mt-sm q-mb-xs">OFFICE PHILOSOPHY</div>
              <div class="text-caption text-grey-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12">
          <q-card @mouseover="hoverOver(2)" @mouseout="hoverOutTimeout(2)" :style="'color: ' + about_heading_color_2" style="border: none;" class="my-card text-center box-shadow" flat bordered>
            <q-img
              src="/statics/images/about_2.jpg"
            />

            <q-card-section>
              <div class="text-overline text-orange-9">Overline</div>
              <div :class="about_heading_2" :style="'color: ' + about_heading_color_2" class="text-h6 q-mt-sm q-mb-xs">OFFICE MISSION</div>
              <div class="text-caption text-grey-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12">
          <q-card @mouseover="hoverOver(3)" @mouseout="hoverOutTimeout(3)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
            <q-img
              src="/statics/images/about_3.jpg"
            />

            <q-card-section>
              <div class="text-overline text-orange-9">Overline</div>
              <div :class="about_heading_3" :style="'color: ' + about_heading_color_3" class="text-h6 q-mt-sm q-mb-xs">OFFICE VALUE & RULES</div>
              <div class="text-caption text-grey-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="pricing" id="id_pricing">
      <div class="" style="background-color: #000000ad !important;">
        <div class="row">
          <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <h5 class="text-center text-white">Our Pricing Plan
              <br>
              <span
                class="text-center text-grey text-h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </h5>
          </div>
        </div>
        <div class="row q-col-gutter-sm q-px-xl">
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-6 q-px-lg">
            <q-card>
              <q-card-section class="text-white" style="background: #ec982f">
                <div class="text-h6 text-center">
                  FREE
                </div>
              </q-card-section>
              <q-card-section class="q-pa-md">
                <q-list dense padding style="border-bottom: 1px solid lightgrey;">
                  <q-item><span class="text-weight-bold">For small size companies</span></q-item>
                  <q-item>
                    50 GB storage
                  </q-item>
                  <q-item>
                    10 Domains
                  </q-item>
                  <q-item>
                    15 Projects
                  </q-item>
                  <q-item>
                    Free Deployment
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section class="q-pa-none" style="color: #ec982f">
                <div class="text-center">
                  <span class="text-h2 text-center">$0</span>/mo
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-center q-px-lg">
                  <q-btn size="md" class="full-width q-pa-xs"
                         style="background: #ec982f; color: white" label="Choose Plan"/>
                  <br>
                  <div class="q-mt-md">Terms and Conditions apply</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-6 q-px-lg">
            <q-card>
              <q-card-section class="text-white" style="background: #f4655f">
                <div class="text-h6 text-center">
                  STANDARD
                </div>
              </q-card-section>
              <q-card-section class="q-pa-md">
                <q-list dense padding style="border-bottom: 1px solid lightgrey;">
                  <q-item><span class="text-weight-bold">For medium companies</span></q-item>
                  <q-item>
                    50 GB storage
                  </q-item>
                  <q-item>
                    10 Domains
                  </q-item>
                  <q-item>
                    15 Projects
                  </q-item>
                  <q-item>
                    Free Deployment
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section class="q-pa-none" style="color: #f4655f">
                <div class="text-center">
                  <span class="text-h2 text-center">$50</span>/mo
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-center q-px-lg">
                  <q-btn size="md" class="full-width q-pa-xs"
                         style="background: #f4655f; color: white" label="Choose Plan"/>
                  <br>
                  <div class="q-mt-md">Terms and Conditions apply</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-6 q-px-lg">
            <q-card>
              <q-card-section class="text-white q-pa-md" style="background: #8b3bbd">
                <div class="text-h6 text-center">
                  PREMIUM
                </div>
              </q-card-section>
              <q-card-section class="q-pa-md">
                <q-list dense padding style="border-bottom: 1px solid lightgrey;">
                  <q-item><span class="text-weight-bold">For average companies</span></q-item>
                  <q-item>
                    50 GB storage
                  </q-item>
                  <q-item>
                    10 Domains
                  </q-item>
                  <q-item>
                    15 Projects
                  </q-item>
                  <q-item>
                    Free Deployment
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section class="q-pa-none" style="color: #8b3bbd">
                <div class="text-center">
                  <span class="text-h2 text-center">$250</span>/mo
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-center q-px-lg">
                  <q-btn size="md" class="full-width q-pa-xs"
                         :style="'background: #8b3bbd; color: white'" label="Choose Plan"/>
                  <br>
                  <div class="q-mt-md">Terms and Conditions apply</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-6 q-px-lg">
            <q-card>
              <q-card-section class="text-white" style="background: #3b97d1">
                <div class="text-h6 text-center">
                  PROFESSIONAL
                </div>
              </q-card-section>
              <q-card-section class="q-pa-md">
                <q-list dense padding style="border-bottom: 1px solid lightgrey;">
                  <q-item><span class="text-weight-bold">For large companies</span></q-item>
                  <q-item>
                    50 GB storage
                  </q-item>
                  <q-item>
                    10 Domains
                  </q-item>
                  <q-item>
                    15 Projects
                  </q-item>
                  <q-item>
                    Free Deployment
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section class="q-pa-none" style="color: #3b97d1">
                <div class="text-center">
                  <span class="text-h2 text-center">$500</span>/mo
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-center q-px-lg">
                  <q-btn size="md" class="full-width q-pa-xs"
                         style="background:#3b97d1; color: white" label="Choose Plan"/>
                  <br>
                  <div class="q-mt-md">Terms and Conditions apply</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <br>
        <br>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      review_slide: 'style',
      team_slide: 1,
      bg_color: 'rgb(0, 163, 82)',
      hover: false,
      active: false,
      theme_color: 'rgb(0, 163, 82)',
      background_style: 'background-color:rgba(0, 163, 82, 0.7);',
      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242'
    }
  },
  computed: {
    style () {
      return {
        width: '340px',
        height: '263px',
        backgroundImage: `url('https://raw.githubusercontent.com/quasarframework/quasar-ui-qflashcard/dev/demo/src/statics/bgimg.jpg')`, // eslint-disable-line
        textAlign: 'center',
        boxShadow: '1px 1px 2px #e6e6e6',
        display: 'inline-block'
      }
    },
    team_style () {
      return {
        width: '260px',
        height: '263px',
        backgroundImage: `url('https://raw.githubusercontent.com/quasarframework/quasar-ui-qflashcard/dev/demo/src/statics/bgimg.jpg')`, // eslint-disable-line
        textAlign: 'center',
        boxShadow: '1px 1px 2px #e6e6e6',
        display: 'inline-block'
      }
    }
  },
  methods: {
    changeBgColor () {
      this.theme_color = this.bg_color
      this.background_style = 'background-color:' + this.bg_color.split(')')[0] + ',0.7)'
    },
    hoverOver: function (index) {
      this['about_heading_color_' + index] = this.theme_color
      this['about_heading_' + index] = ['animated', 'bounceIn']
    },
    hoverOutTimeout: function (index) {
      this['about_heading_color_' + index] = '#424242'
      setTimeout(() => {
        this['about_heading_' + index] = []
      }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
.main_line
  font-size: 75px
  letter-spacing: 5px
  line-height: 60px
  font-weight: 600

.custom-caption
  text-align: center
  padding: 12px
  color: white

.animation_1
  -webkit-animation: bounceIn 1s ease-in 800ms both
  animation: bounceIn 1s ease-in 800ms both

.animation_2
  -webkit-animation: flipInX 2s ease-in-out 800ms both
  animation: flipInX 1s ease-in-out 800ms both

.animation_3
  -webkit-animation: lightSpeedIn 1s ease-in 800ms both
  animation: lightSpeedIn 1s ease-in 800ms both

.description
  padding: 10px
  background-color: black
  color: white
  box-shadow: 1px 1px 2px #e6e6e6

.my-header
  width: 200px
  top: 0
  height: 45px
  color: black
  background-color: rgba(255,255,255, 0.8)
  text-transform: uppercase
  text-align: center
  font-size: 17px
  margin: 20px 0 0 68px
  padding: 25px

.my-text
  width: 100%
  top: 0
  height: 90px
  color: white
  text-align: center
  font-size: 15px
  margin: 79px 0 0 0
  padding: 20px
  line-height: normal
  font-family: Georgia, serif
  font-style: italic

.my-button-container
  width: 100%

.my-button
  text-decoration: none
  text-transform: uppercase
  margin: 0 0 20px 0
  text-align: center
  padding: 7px 14px
  background-color: #000
  color: #fff
  box-shadow: 0 0 1px #000
  transition-delay: 0.2s

.my-button:hover
  box-shadow: 0 0 5px #000

.box-shadow:hover
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important

.my-card
  width: 350px
  max-width: 350px
  margin-top: 10px

.team-header
  width: 100%
  top: 0
  height: 45px
  color: white
  text-transform: uppercase
  text-align: center
  font-size: 17px
  margin: 60px 0 0 0
  padding: 12px

.team-text
  width: 100%
  top: 0
  height: 90px
  color: white
  text-align: center
  font-size: 15px
  margin: 100px 0 0 0
  padding: 20px
  line-height: normal
  font-family: Georgia, serif
  font-style: italic

.quote
  background-size: cover
  background-position: center
  background-attachment: fixed
  background-repeat: no-repeat

.pricing
  background-size: cover
  background-position: center
  background-attachment: fixed
  background-repeat: no-repeat

.contact_us
  background-size: cover
  background-position: center
  background-attachment: fixed
  background-repeat: no-repeat

.custom_tab
  width: 130px
</style>
