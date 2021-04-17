<template>
  <div :class="{ 'LoginContent': true, 'shake': shake}">
    <b-container fluid>
      <b-row>
        <b-col
          cols="12"
          md="5"
          class="LoginForm px-3 py-3"
        >
          <b-row
            no-gutters
            class="text-center"
          >
            <b-col class="LogoText font-weight-lighter mb-3">
              Logo Here
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col>
              <b-form-group
                id="logo-email"
                label="Email"
                label-for="email"
              >
                <b-form-input
                  id="email"
                  v-model="$v.email.$model"
                  type="email"
                  placeholder="Enter Your Email Address"
                  :state="$v.email.$anyDirty && !$v.email.$anyError"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col>
              <b-form-group
                id="logo-password"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  v-model="$v.password.$model"
                  type="password"
                  :state="$v.password.$anyDirty && !$v.password.$anyError"
                  placeholder="Enter your password"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col>
              <b-button
                block
                variant="outline-primary"
                @click="handleClick"
              >
                Submit
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { Firebase } from '../firebase.config'

export default {
  data () {
    return {
      email: null,
      password: null,
      shake: false
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    handleClick () {
      this.shake = false
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      console.log('hello')
      Firebase.auth().signInWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model)
        .then((userCredential) => {
          console.log(userCredential)
        })
        .catch((e) => {
          console.log(e)
          this.shake = true
        })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.LoginContent {
    background: $top-navbar-background;
    display: flex;
    height: 100vh;
    align-items: center;
}
.LoginForm {
    margin: 0 auto;
    background: $white;
    border-radius: 5px;
}
.LogoText {
  font-size: 1.25rem;
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>