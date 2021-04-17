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
        <b-form-group
          id="logo-password"
          label="Password"
          label-for="password"
        >
          <b-form-input
            id="password"
            v-model="$v.password.$model"
            type="password"
            :state="passWordState"
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
      email: null,
      password: null,
      cpass: null,
      submit: false,
      invalid: false,
      error: null
    };
  },
  validations: {
    email: { required },
    password: { required }
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
.LogoText {
  font-size: 1.25rem;
}
.SignUpForm {
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
  .alert-danger {
    font-size: 0.9rem;
  }
}
</style>