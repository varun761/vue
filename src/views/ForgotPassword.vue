<template>
  <div :class="{ 'ForgotContent': true, 'shake': shake}">
    <b-container fluid>
      <b-row no-gutters>
        <b-col
          cols="10"
          md="5"
          class="ForgotForm px-3 py-3"
        >
          <ForgotPasswordForm />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ForgotPasswordForm from './forms/ForgotPasswordForm'
export default {
  components: { ForgotPasswordForm },
  data () {
    return {
      shake: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.ForgotContent {
  background: $top-navbar-background;
  display: flex;
  min-height: 100vh;
  align-items: center;
  .ForgotForm {
    background: $white;
    margin: 0 auto;
    border-radius: 5px;
  }
  .nav-tabs {
    transform: rotate(-90deg);
    top: 61px;
    position: absolute;
    left: -105px;
  }
  .nav-link {
    background: $white;
    color: $top-navbar-link-color;
  }
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