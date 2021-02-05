<template>
  <div class="q-pa-lg">
    <q-form @submit.prevent.stop="onSubmit" class="q-gutter-sm">
      <q-input v-model="user.username"
               type="text"
               name="username"
               label="Username"
               autocomplete="none"
               outlined
               reactive-rules
               :rules="[ (val) => isValid('username', val, $v.user) ]" />
      <q-input v-model="user.password"
               :type="isPwd ? 'password' : 'text'"
               name="password"
               label="Password"
               outlined
               reactive-rules
               :rules="[ (val) => isValid('password', val, $v.user) ]">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div>
        <q-btn push
               :ripple="false"
               class="button-login full-width"
               label="Log In"
               color="secondary"
               type='submit'/>
        <a class="q-pt-md block text-center cursor-pointer text-accent bold text-weight-bold">Password dimenticata?</a>
      </div>
    </q-form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import validator from 'src/validations/validator'

export default {
  name: 'Login',
  data () {
    return {
      showAlert: false,
      user: {
        username: '',
        password: ''
      },
      isValid: validator.isValid,
      isPassword: validator.isPassword,
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
      if (!this.$v.$invalid) {
        console.log('done')
        // TODO agganciare chiamate alla login
      }
    }
  },
  validations: {
    user: {
      username: {
        required: required,
        email
      },
      password: {
        required: required,
        isPassword: validator.isPassword
      }
    }
  }
}

</script>
