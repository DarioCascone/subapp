<template>
  <q-page class="flex flex-center">
    <!-- Home Page -->
      <div>
        <div>
          <div>
            <q-img/>
          </div>
          <h4>Condividi i tuoi progetti.</h4>
        </div>
        <div>
          <div>
            <div>
              <q-form method="post" id="loginForm" @submit="onSubmit">
                <div>
                  <div class="form-group">
                    <q-input outlined v-model="username" type="text" name="username" label="Username"  autofocus="1"/>
                    <div v-show="true" class="invalid-feedback">Inserire Username!</div>
                  </div>
                  <div class="form-group">
                    <q-input outlined v-model="password" type="password" name="password" label="Password" id="password"/>
                    <div v-show="true" class="invalid-feedback">Inserire Password!</div>
                  </div>
                </div>
                <div>
                  <q-btn label="Log In" color="secondary" type="submit"/>
                </div>
                <div>
                  <a>Password dimenticata?</a>
                </div>
                <div>
                  <q-btn label="Registrati" color="accent" @click="alert = true" />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </div>
    <!-- Registration Dialog -->
      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">Registrati</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="q-pa-md">
                <form class='register-form'>
                  <q-stepper
                    v-model="step"
                    ref="stepper"
                    alternative-labels
                    color="primary"
                    animated
                  >
                    <q-step
                      :name="1"
                      title="Informazioni generali"
                      icon="settings"
                      :done="step > 1"
                    >

                    </q-step>

                    <q-step
                      :name="2"
                      title="Dati Azienda"
                      icon="create_new_folder"
                      :done="step > 2"
                    >
                      Inserisci quì i dati della tua azienda.
                    </q-step>

                    <q-step
                      :name="3"
                      title="Consensi"
                      icon="add_comment"
                    >
                      Leggi e accetta i consensi per proseguire con la registrazione.
                    </q-step>

                    <template v-slot:navigation>
                      <q-stepper-navigation>
                        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Registrati' : 'Continua'" />
                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Indietro" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </template>
                  </q-stepper>
                </form>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      alert: false,
      confirm: false,
      prompt: false,
      step: 1,
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('Submitted')
    }
  }
}
</script>
