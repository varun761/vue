<template>
  <div :class="{ 'LoginContent': true, 'shake': shake}">
    <b-container fluid>
      <b-row no-gutters>
        <b-col
          cols="12"
          sm="7"
          md="5"
          class="LoginForm"
        >
          <b-tabs
            v-model="activeTabs"
            content-class="LoginTabContent"
          >
            <b-tab
              title="Login"
              class="px-3 py-3"
            >
              <LoginForm
                ref="LoginForm"
                @invalid="()=> shake = true"
              />
            </b-tab>
            <b-tab
              title="Sign Up"
              class="px-3 py-3"
            >
              <SignUpForm ref="SignUpForm" />
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
      shake: false,
      activeTabs: 0
    }
  },
  watch: {
    activeTabs: 'resetForms' 
  },
  methods: {
    resetForms (value) {
      if (value === 0) {
        this.$refs.SignUpForm.reset()
      } else if (value === 1) {
        this.$refs.LoginForm.reset()
      }
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
  .nav-tabs {
    transform: rotate(-90deg);
    top: 62px;
    position: absolute;
    left: -105px;
    @media screen and (max-width: map-get($grid-breakpoints, "sm")) {
      position: relative;
      transform: initial;
      left:0;
      top:0;
    }
    .nav-link {
      background: $white;
      color: $top-navbar-link-color;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      &.active {
        background: $top-navbar-link-color;
        color: $white;
        border-color: $top-navbar-link-color;
      }
    }
  }
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
  box-shadow: 9px 9px 10px 0px #676767;
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