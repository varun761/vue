<template>
  <div class="ForgotPasswordForm">
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
          @dismissed="handleErrorDismissed"
        >
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert
          :show="emailSend"
          variant="success"
          dismissible
          @dismissed="$router.push('/login')"
        >
          We have send an email to your email address .Please check your email for further instruction.
        </b-alert>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-form-group
          id="logo-email"
          label="Email"
          label-for="email"
          :state="emailValid"
          :invalid-feedback="emailInvalidFeedback"
        >
          <b-form-input
            id="email"
            v-model="$v.email.$model"
            type="email"
            placeholder="Enter Your Email Address"
            :state="emailValid"
            :aria-state="emailValid"
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
          Send Email Instructions
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="mt-3 text-right">
        <b-link to="login">
          <b-icon-arrow-left /> Back to login
        </b-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { FirebaseAuth } from '../../firebase.config'

export default {
  name: "ForgotPasswordForm",
  data() {
    return {
      email: null,
      submit: false,
      invalid: false,
      emailSend: false,
      error: null,
    };
  },
  validations: {
    email: { required }
  },
  computed: {
    emailValid() {
      return this.$v.email.$anyDirty ? !this.$v.email.$anyError : null;
    },
    emailInvalidFeedback () {
      return this.emailValid === false ? 'Email address is required' : null
    },
  },
  methods: {
    reset () {
      this.handleErrorDismissed()
      this.$v.email.$model = null
      this.$v.password.$model = null
      this.$v.$reset()
    },
    handleErrorDismissed () {
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
      const self = this
      FirebaseAuth.sendPasswordResetEmail(this.$v.email.$model).then(function() {
        self.emailSend = true
        self.email = null
        self.$v.$reset()
      }).catch(function(error) {
        self.invalid = true
        self.error = error.message
      })
      .finally(() => self.submit = false)
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
.ForgotPasswordForm {
  @include form;
}
</style>