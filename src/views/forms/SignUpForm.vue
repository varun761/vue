<template>
  <div class="SignUpForm">
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
          variant="danger"
          dismissible
          @dismissed="resetInvalid"
        >
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-form-group
          id="logo-fullname"
          label="Full name"
          label-for="fullname"
          :state="fullNameValid"
          :invalid-feedback="fullNameInvalidFeedback"
        >
          <b-form-input
            id="fullname"
            v-model="$v.fullname.$model"
            type="text"
            :state="fullNameValid"
            placeholder="Enter your full name"
            :aria-invalid="fullNameInvalidFeedback"
          />
        </b-form-group>
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
            placeholder="Enter your email address"
            :state="emailValid"
            :aria-invalid="emailValid"
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
            placeholder="Enter your password"
            :aria-invalid="passWordValid"
          />
        </b-form-group>
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
          Sign Up
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { Firebase } from '../../firebase.config'

export default {
  name: "SignUpForm",
  data() {
    return {
      fullname: null,
      email: null,
      password: null,
      cpass: null,
      submit: false,
      invalid: false,
      error: null
    };
  },
  validations: {
    fullname: { required },
    email: { required },
    password: { required }
  },
  computed: {
    fullNameValid () {
      return this.$v.fullname.$anyDirty ? !this.$v.fullname.$anyError : null
    },
    fullNameInvalidFeedback () {
      return this.fullNameValid === false ? 'Full name is required' : null
    },
    emailValid () {
      return this.$v.email.$anyDirty ? !this.$v.email.$anyError : null
    },
    emailInvalidFeedback () {
      return this.emailValid === false ? 'Email address is required' : null
    },
    passWordValid () {
      return this.$v.password.$anyDirty ? !this.$v.password.$anyError : null
    },
    passWordInvalidFeedback () {
      return this.passWordValid === false ? 'Password is required' : null
    },
  },
  methods: {
    reset () {
      this.resetInvalid()
      this.$v.email.$model = null
      this.$v.password.$model = null
      this.$v.$reset()
    },
    resetInvalid () {
      this.invalid = false
      this.error = null
    },
    handleClick () {
      this.resetInvalid()
      this.submit = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submit = false
        return false
      }
      const self = this
      // Signup new user
      Firebase.auth().createUserWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model)
        .then((userCredential) => {
          const { user } = userCredential
          // Send email verification to new user on success signup
          user.sendEmailVerification().then(function() {
            /*
            * Emit event for verification email sent
            */
            self.$emit('valid', {
              email: self.$v.email.$model,
              password: self.$v.password.$model
            })
          }).catch(function(e) {
            console.log(e)
          });
        })
        .catch((e) => {
          this.error = e.message
          this.invalid = true
          this.$emit('invalid')
        })
        .finally(() => this.submit = false)
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';
@import '../../assets/scss/forms/mixins';
.LogoText {
  @include logo;
}
.SignUpForm {
  @include form;
}
</style>