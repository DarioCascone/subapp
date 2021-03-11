<template>
  <q-layout view="lHh lpr lff">
    <q-header class="primary-header q-py-md bg-primary" :style="'border-bottom: 3px solid #165081'">
      <div class="flex justify-between q-mx-lg">
        <router-link to="/">
          <q-avatar style="border-radius: 0 !important;">
           <q-icon name="home" color="white" size="lg"></q-icon>
          </q-avatar>
        </router-link>
          <q-tabs v-if="$route.name !== 'termCondition'"
                  dense
                  align="justify"
                  shrink
                  :breakpoint="0">
              <q-tab v-if="$route.name==='home'" @click="scrollToElement('id_how_works')" label="Come Funziona" />
              <q-tab v-if="$route.name==='home'" @click="scrollToElement('id_pricing')" label="Prezzi" />
              <q-tab v-if="$route.name==='home'" @click="scrollToElement('contact_us')" label="Contatti" />
              <q-tab v-if="!isAuthenticated" @click="openModal('login', 'accedi', false, loginClassObj)" label="Accedi"/>
              <q-tab v-if="!isAuthenticated" @click="openModal('sign-in', 'registrati', true, singInClassObj)" label="Registrati"/>
              <q-tab v-if="isAuthenticated && user" :disable="user.blocked" @click="openBulletinBoard"  label="Bacheca">
                <q-tooltip v-if="user.blocked"
                           transition-show="fade"
                           transition-hide="fade"
                           content-class="bg-accent"
                           content-style="font-size: 16px"
                           anchor="bottom middle" self="top middle">
                  Aggiorna il tuo profilo per continuare l'esperienza su Subapp.it
                </q-tooltip>
              </q-tab>
              <q-tab v-if="isAuthenticated" label="Account">
                <q-menu transition-show="jump-down" transition-hide="jump-up" fit>
                  <div class="row no-wrap q-pa-sm">
                    <div class="column items-start">
                      <div class="text-h6 q-mb-xs q-ml-sm">Impostazioni</div>
                      <q-btn v-if="user.admin" class="no-padding" flat color="primary" size="md" label="Admin" @click="openAdminConsole" icon="admin_panel_settings" />
                      <q-btn flat  color="primary" size="md" label="profilo" @click="editProfile" icon="perm_identity" />
                      <q-btn flat  color="primary" size="md" label="RDO" icon="list" />
                    </div>
                    <q-separator vertical inset class="q-mx-md" />

                    <div class="column items-center justify-center q-gutter-sm">
                      <q-icon color="secondary" name="account_circle" size="xl"></q-icon>
                      <q-btn
                        color="primary"
                        label="Logout"
                        @click="logout"
                        push
                        size="sm"
                        v-close-popup
                      />
                    </div>
                  </div>
                </q-menu>
              </q-tab>
          </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view @refreshAos="refreshAos" ></router-view>
      </transition>
    </q-page-container>

    <q-footer bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <modal  @signupSuccess="signupSuccess" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" is-editing="isEditing" :component="modalComponent" :title="modalTitle"/>

  </q-layout>

</template>

<script>
import { scroll } from 'quasar'
import Modal from 'components/Modal'
import { mapGetters } from 'vuex'
import AOS from 'aos'
import 'aos/dist/aos.css'

const { getScrollTarget, setScrollPosition } = scroll

export default {
  components: { Modal },
  data () {
    return {
      aosNeedRefresh: false,
      name: 'MainLayout',
      isEditing: false,
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
    ...mapGetters([
      'user',
      'isAuthenticated'
    ])
  },
  methods: {
    scrollToElement (id) {
      const el = document.getElementById(id)
      const target = getScrollTarget(el)
      const offset = el.offsetTop + 3
      const duration = 900
      setScrollPosition(target, offset, duration)
    },
    openModal (component, title, isMaximized, classObj, isEditing = false) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
      this.isEditing = isEditing
    },
    editProfile () {
      this.openModal('sign-in', 'Modifica Profilo', true, this.singInClassObj, true)
    },
    signupSuccess () {
      setTimeout(() => {
        this.openModal('login', 'accedi', false, this.loginClassObj)
      }, 1000)
    },
    logout () {
      this.$q.loading.show()
      setTimeout(() => {
        this.$store.commit('DESTROY_AUTH')
        if (this.$route.name !== 'home') {
          this.$router.push('/')
        }
        this.$q.loading.hide()
        this.$q.notify({ type: 'positive', message: 'Logout avvenuto con successo!' })
      }, 1000)
    },
    openAdminConsole () {
      if (this.$route.name !== 'admin') {
        this.$router.push('/admin')
      }
    },
    openBulletinBoard () {
      console.log('BACHECA')
    },
    refreshAos () {
      this.aosNeedRefresh = true
    }
  },
  watch: {
    aosNeedRefresh (newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.aosNeedRefresh = false
          console.log('AOS Refreshing')
          AOS.refresh()
        }, 500)
      }
    }
  }
}
</script>
