<template>
  <div class="home-container">
    <div class="row justify-around">
      <div class="logo-container">
        <div>
          <q-img/>
        </div>
        <h4>{{$t('login.title')}}</h4>
      </div>
      <div class="form-container">
          <div>
            <q-form method="post" id="loginForm" @submit="onSubmit">
              <div>
                <div class="form-group">
                  <div  :class="{'form-group--error': $v.username.$error }">
                    <q-input outlined v-model="username" type="text" :name="username" label="Username"  :autofocus=true />
                  </div>
                  <div v-if="$v.username.$dirty">
                    <div class="error" v-if="!$v.username.required">Field is required</div>
                    <div class="error" v-if="!$v.username.minLength">Name must have at least {{$v.username.$params.minLength.min}} letters.</div>
                  </div>
                </div>
                <div class="form-group" >
                  <div :class="{'form-group--error': $v.password.$error }">
                    <q-input outlined label="Password" v-model="password" :name="password" :type="isPwd ? 'password' : 'text'" >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div v-if="$v.username.$dirty">
                    <div class="error" v-if="!$v.password.required">Field is required</div>
                    <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
                  </div>
                </div>
              </div>
              <div class="button-container">
                <q-btn class="button-login" label="Log In" color="secondary" type="submit"/>
              </div>
              <div class="link-container">
                <a class="forgot-psw">Password dimenticata?</a>
              </div>
              <div class="line-separator" />
              <div class="button-container">
                <q-btn label="Registrati" color="accent" @click="showAlert = true" />
              </div>
            </q-form>
          </div>
      </div>
    </div>
    <!-- Registration Dialog -->
    <sign-in  :showAlert.sync="showAlert"></sign-in>
  </div>
</template>

<script>
import SignIn from 'components/SignIn'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'PageSignIn',
  components: { SignIn },
  data () {
    return {
      showAlert: false,
      username: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    ...mapActions([
      'login' // map `this.increment()` to `this.$store.dispatch('increment')` `mapActions` also supports payloads:
    ]),
    async onSubmit () {
      console.log('Submitted')
      const response = await this.login()
      console.log('LoginComponent', response)
      alert(response.message)
      // this.$v.$touch()
    }
  },
  validations: {
    username: {
      required: required,
      minLength: minLength(6)
    },
    password: {
      required: required,
      minLength: minLength(6)
    }
  }
}

</script>
