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
        <b-form-group
          id="logo-cpassword"
          label="Confirm Password"
          label-for="cpassword"
          :state="cpassWordValid"
          :invalid-feedback="cpassWordInvalidFeedback"
        >
          <b-form-input
            id="cpassword"
            v-model="$v.cpassword.$model"
            type="password"
            :state="cpassWordValid"
            placeholder="Confirm your password"
            :aria-invalid="cpassWordValid"
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
import { required, sameAs, minLength } from "vuelidate/lib/validators"
import { FirebaseAuth, firestore } from '../../firebase.config'

const strongPassword = (value) => {
  const capLettersRegex = new RegExp(/[A-Z]/)
  const smaLetterRegex = new RegExp(/[a-z]/)
  const numberRegex = new RegExp(/[0-9]/)
  const specialRegex = new RegExp(/["#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/)
  if (!capLettersRegex.test(value) || !smaLetterRegex.test(value) || !numberRegex.test(value) || !specialRegex.test(value)) {
    return false
  }
  return true
}

export default {
  name: "SignUpForm",
  data() {
    return {
      fullname: null,
      email: null,
      password: null,
      cpassword: null,
      submit: false,
      invalid: false,
      error: null
    };
  },
  validations: {
    fullname: { required },
    email: { required },
    password: {
      required,
      minLength: minLength(6),
      strongPassword
    },
    cpassword: {
      required,
      sameAsPassword: sameAs('password')
    },
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
      if (this.passWordValid === false) {
        if (!this.$v.password.required) {
          return 'Enter your password'
        } else if (!this.$v.password.minLength) {
          return 'Password need to be contain 5 or more than 6 characters'
        } else if (!this.$v.password.strongPassword) {
          return 'Password need to be contain one lowercase letter, one uppercase letter, one number and one special character'
        }
      }
      return null
    },
    cpassWordValid () {
      return this.$v.cpassword.$anyDirty ? !this.$v.cpassword.$anyError : null
    },
    cpassWordInvalidFeedback () {
      if (this.cpassWordValid === false) {
        if (!this.$v.cpassword.required) {
          return 'Re-type your password'
        } else if (!this.$v.cpassword.sameAsPassword) {
          return 'Confirm password need to be same as password'
        }
      }
      return null
    },
  },
  methods: {
    reset () {
      this.resetInvalid()
      this.$v.fullname.$model = null
      this.$v.email.$model = null
      this.$v.password.$model = null
      this.$v.cpassword.$model = null
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
      FirebaseAuth.createUserWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model)
        .then((userCredential) => {
          const { user } = userCredential
          // Update user display name
          user.updateProfile({
            displayName: self.$v.fullname.$model
          })
          // Send email verification to new user on success signup
          user.sendEmailVerification().then(() => {
            // Save user details to database
            firestore.collection('users')
              .doc(user.uid)
              .set({
                uid: user.uid,
                fullname: self.$v.fullname.$model,
                email: self.$v.email.$model
              })
              .then(() => {
                self.submit = false
                /*
                * Emit event for verification email sent
                */
                self.$emit('valid', {
                  email: self.$v.email.$model,
                  password: self.$v.password.$model
                })
              })
              .catch(function(e) {
                self.submit = false
                self.error = e.message
                self.invalid = true
                self.$emit('invalid')
              });
          }).catch(function(e) {
            self.submit = false
            self.error = e.message
            self.invalid = true
            self.$emit('invalid')
          });
        })
        .catch((e) => {
          this.submit = false
          this.error = e.message
          this.invalid = true
          this.$emit('invalid')
        })
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