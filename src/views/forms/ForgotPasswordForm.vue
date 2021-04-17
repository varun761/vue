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
        >
          Email is not valid.
        </b-alert>
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
            :state="emailState"
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
import { Firebase } from '../../firebase.config'

export default {
  name: "ForgotPasswordForm",
  data() {
    return {
      email: null,
      submit: false,
      invalid: false
    };
  },
  validations: {
    email: { required }
  },
  computed: {
    passWordState() {
      return this.$v.password.$anyDirty ? !this.$v.password.$anyError : null;
    },
    emailState() {
      return this.$v.email.$anyDirty ? !this.$v.email.$anyError : null;
    },
  },
  methods: {
    reset () {
      this.$v.email.$model = null
      this.$v.password.$model = null
      this.$v.$reset()
    },
    handleClick () {
      this.invalid = false
      this.submit = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submit = false
        return false
      }
      /* Firebase.auth().createUserWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model)
        .then((userCredential) => {
          this.$emit('valid', userCredential)
        })
        .catch((e) => {
          const { response } = e
          console.log(response)
          this.invalid = true
          this.$emit('invalid')
        })
        .finally(() => this.submit = false) */
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';
.LogoText {
  font-size: 1.25rem;
}
.ForgotPasswordForm {
  font-weight: 100;
  input {
    font-weight: 100;
    font-size: 0.9rem;
  }
  label {
    font-size: 0.9rem;
  }
  .submitBtn {
    background: $top-navbar-link-color;
    border-color: $top-navbar-link-color;
    color: $white;
    &:hover {
      background: $top-navbar-link-color;
      border-color: $top-navbar-link-color;
      color: $white;
    }
  }
}
</style>