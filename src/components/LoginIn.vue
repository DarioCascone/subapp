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
            <q-form id="loginForm" @submit="onSubmit">
              <div>
                <div class="form-group">
                  <div>
                    <q-input v-model="username"
                             type="text"
                             name="username"
                             label="Username"
                             autocomplete="none"
                             outlined
                             reactive-rules
                             :rules="[ (val) => isValid('username', val, $v) ]"
                    />
                  </div>
                </div>
                <div class="form-group">
                 <div>
                    <q-input v-model="password"
                             :type="isPwd ? 'password' : 'text'"
                             name="password"
                             label="Password"
                             outlined
                             reactive-rules
                             :rules="[ (val) => isValid('password', val, $v) ]" >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="button-container">
                <q-btn push
                       :ripple="false"
                       class="button-login"
                       label="Log In"
                       color="secondary"
                       type='submit'/>
              </div>
              <div class="link-container">
                <a class="forgot-psw">Password dimenticata?</a>
              </div>
              <div class="line-separator" />
              <div class="button-container">
                <q-btn push
                       label="Registrati"
                       :ripple="false"
                       color="accent"
                       class="glossy"
                       @click="showAlert = true" />
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
/* eslint-disable dot-notation */

import SignIn from 'components/SignIn'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { isValid, isPassword } from 'src/validations/validator'

export default {
  name: 'PageSignIn',
  components: { SignIn },
  data () {
    return {
      showAlert: false,
      username: '',
      password: '',
      isValid: isValid,
      isPassword: isPassword,
      isPwd: true
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async onSubmit () {
      this.$forceUpdate()
      this.$v.$touch()
    }
  },
  validations: {
    username: {
      required: required,
      email
    },
    password: {
      required: required,
      isPassword
    }
  }
}

</script>
