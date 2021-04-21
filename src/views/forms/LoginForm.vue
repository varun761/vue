<template>
  <div class="LoginFormComponent">
    <b-row
      no-gutters
      class="text-center"
    >
      <b-col class="LogoText font-weight-lighter mb-3">
        Logo Here
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert
          :show="invalid"
          role="alert"
          variant="danger"
          dismissible
        >
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-form-group
          id="logo-email"
          label="Email"
          label-for="email"
          :invalid-feedback="emailInvalidFeedback"
          :state="emailValid"
        >
          <b-form-input
            id="email"
            v-model="$v.email.$model"
            type="email"
            placeholder="Enter Your Email Address"
            aria-placeholder="Enter Your Email Address"
            :state="emailValid"
            :aria-invalid="emailValid"
            size="md"
            autocomplete="off"
            aria-autocomplete="off"
            aria-required="true"
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
          :state="passWordValid"
          :invalid-feedback="passWordInvalidFeedback"
        >
          <b-form-input
            id="password"
            v-model="$v.password.$model"
            type="password"
            :state="passWordValid"
            size="md"
            placeholder="Enter your password"
            aria-placeholder="Enter your password"
            autocomplete="off"
            :aria-invalid="passWordValid"
            aria-autocomplete="off"
            aria-required="true"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row
      no-gutters
      class="mb-3"
    >
      <b-col class="text-center">
        <b-link to="forgot">
          Forgot Password ?
        </b-link>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-button
          block
          variant="outline-primary"
          :disabled="submit"
          class="submitBtn"
          @click="handleClick"
        >
          Login
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { FirebaseAuth } from '../../firebase.config'

export default {
  name: 'LoginForm',
  data () {
    return {
      email: 'sharma.varun208552@gmail.com',
      password: 'va16P3639@',
      invalid: false,
      submit: false,
      error: null
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
  computed: {
    passWordValid () {
      return this.$v.password.$anyDirty ? !this.$v.password.$anyError : null
    },
    emailValid () {
      return this.$v.email.$anyDirty ? !this.$v.email.$anyError : null
    },
    emailInvalidFeedback () {
      return this.emailValid === false ? 'Email address is required' : null
    },
    passWordInvalidFeedback () {
      return this.passWordValid === false ? 'Password is required' : null
    },
  },
  methods: {
    reset () {
      this.handleDismissAlert()
      this.$v.email.$model = null
      this.$v.password.$model = null
      this.$v.$reset()
    },
    handleDismissAlert () {
      this.invalid = false
      this.error = null
    },
    handleClick () {
      this.invalid = false
      this.submit = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submit = false
        return false
      }
      FirebaseAuth.signInWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model)
        .then((userCredential) => {
          const { user } = userCredential
          this.$emit('valid', user)
        })
        .catch((e) => {
          this.invalid = true
          this.error = e.message
          this.$emit('invalid')
        })
        .finally(() => this.submit = false)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables';
@import '../../assets/scss/forms/mixins';
.LoginFormComponent {
  @include form;
}
.LogoText {
  @include logo;
}
</style>