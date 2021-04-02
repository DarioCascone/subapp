<template>
  <div style="min-width: 330px" class="q-pa-lg">
    <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
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
               class="full-width"
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
      this.$v.$touch()
      this.$forceUpdate()
      if (!this.$v.$invalid) {
        this.$q.loading.show()
        await this.login(this.user)
        this.$q.loading.hide()
        this.$emit('loginSuccess', false)
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
