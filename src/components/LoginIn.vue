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
                <div class="form-group">
                  <q-input outlined v-model="username" type="text" name="username" label="Username"  :autofocus=true />
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
export default {
  name: 'PageSignIn',
  components: { SignIn },
  data () {
    return {
      showAlert: false,
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
