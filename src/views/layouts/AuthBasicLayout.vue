<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="profile-information">
        <div class="avatar mr-2">
          <b-avatar />
        </div>
        <div class="details">
          <p class="mb-0 font-weight-bold">
            {{ userDisplayName }}
          </p>
          <b-button
            variant="outline"
            class="logout"
            @click="logoutUser"
          >
            Logout
          </b-button>
        </div>
      </div>
      <div class="left-sidebar">
        <div class="sidebar-item">
          Dashboard
        </div>
        <div class="sidebar-item">
          Popup
        </div>
        <div class="sidebar-item">
          Coupons
        </div>
        <div class="sidebar-item">
          Profile
        </div>
        <div class="sidebar-item">
          Plans
        </div>
      </div>
    </div>
    <div class="main-content">
      <b-row no-gutters>
        <b-col
          class="px-3 py-3 offset-2"
          md="10"
        >
          <slot :user="currentUser" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { FirebaseAuth } from "../../firebase.config";

export default {
  name: "AuthBasicLayout",
  data() {
    return {
        items: [
            {
                title: 'Logout'
            }
        ]
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    userDisplayName() {
      return this.currentUser && this.currentUser.displayName
        ? this.currentUser.displayName
        : null;
    },
  },
  methods: {
    ...mapActions("user", ["setAutheticatedUser"]),
    logoutUser() {
      this.setAutheticatedUser(null);
      FirebaseAuth.signOut()
        .then(() => {
          this.setAutheticatedUser(null);
          this.$router.push("login");
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables.scss';
.sidebar {
  width: 15%;
  float: left;
  height: 100vh;
  position: fixed;
  z-index: 1;
  color: #fff;
  min-width: 205px;
  background: $top-navbar-link-color;
  .profile-information {
    padding: 10px 10px;
    border-bottom: 1px solid #fff;
    display: flex;
    align-items: center;
    .logout {
      font-size: 12px;
      font-weight: 100;
      color: #fff;
      padding: 0;
    }
  }
  .left-sidebar {
    margin-bottom: 0;
    .sidebar-item {
      padding: 10px 10px;
      font-weight: 100;
    }
  }
}
</style>