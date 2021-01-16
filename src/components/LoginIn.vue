<template>
  <div>
    <div>
      <div>
        <div>
          <q-img/>
        </div>
        <h4>{{$t('login.title')}}</h4>
      </div>
      <div>
        <div>
          <div>
            <q-form method="post" id="loginForm" @submit="onSubmit">
              <div>
                <div :class="{'form-group--error': $v.username.$error }">
                  <q-input outlined v-model="username" type="text" :name="username" label="Username"  :autofocus=true />
                </div>
                <div class="error" v-if="!$v.username.required">Field is required</div>
                <div class="error" v-if="!$v.username.minLength">Name must have at least {{$v.username.$params.minLength.min}} letters.</div>
                <div class="form-group">
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
              </div>
              <div>
                <q-btn label="Log In" color="secondary" type="submit"/>
              </div>
              <div>
                <a>Password dimenticata?</a>
              </div>
              <div>
                <q-btn label="Registrati" color="accent" @click="showAlert = true" />
              </div>
            </q-form>
          </div>
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
    onSubmit () {
      console.log('Submitted')
      this.$v.$touch()
    }
  },
  validations: {
    username: {
      required: required,
      minLength: minLength(6)
    }
  }
}

</script>
