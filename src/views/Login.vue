<template>
  <div :class="{ 'LoginContent': true, 'shake': shake}">
    <b-container fluid>
      <b-row no-gutters>
        <b-col
          cols="12"
          md="5"
          class="LoginForm"
        >
          <b-tabs content-class="LoginTabContent">
            <b-tab
              title="Login"
              class="px-3 py-3"
            >
              <LoginForm @invalid="()=> shake = true" />
            </b-tab>
            <b-tab
              title="Sign Up"
              class="px-3 py-3"
            >
              <SignUpForm />
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from './forms/LoginForm'
import SignUpForm from './forms/SignUpForm'

export default {
  components: { LoginForm, SignUpForm },
  data () {
    return {
      shake: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.LoginContent {
    background: $top-navbar-background;
    display: flex;
    min-height: 100vh;
    align-items: center;
}
.LoginForm {
    margin: 0 auto;
    border-radius: 5px;
}
.LoginTabContent {
  background: $white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
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