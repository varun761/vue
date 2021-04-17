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
        >
          Email or password is incorrect.
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
      invalid: false
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
    handleClick () {
      this.invalid = false
      this.submit = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submit = false
        return false
      }
      Firebase.auth().createUserWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model)
        .then((userCredential) => {
          console.log(userCredential)
          this.$emit('valid', userCredential)
        })
        .catch((e) => {
          const { response } = e
          console.log(response)
          this.invalid = true
          this.$emit('invalid')
        })
        .finally(() => this.submit = false)
    }
  }
};
</script>

<style>
</style>