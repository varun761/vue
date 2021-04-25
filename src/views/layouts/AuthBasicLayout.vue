<template>
  <div class="wrapper">
    <!--<b-sidebar
      id="sidebar-1"
      title="Sidebar"
      shadow
      :visible="true"
    >
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        />
      </div>
    </b-sidebar>-->
    <div class="main-content">
      <b-row no-gutters>
        <b-col
          md="3"
        >
          <b-nav
            class="sidebar"
            vertical
          >
            <b-nav-item>
              Dashboard
            </b-nav-item>
            <b-nav-item>
              Projects
            </b-nav-item>
            <b-nav-item>
              Employess
            </b-nav-item>
            <b-nav-item>
              Leaves
            </b-nav-item>
            <b-nav-item>
              Profile
            </b-nav-item>
            <b-nav-item
              href="javascript:void(0);"
              @click="logoutUser"
            >
              Logout
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col class="px-3 py-3">
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
  background: $top-navbar-background;
  height: 100vh;
  li {
    border-bottom: 1px solid #fff;
    a {
      color: $top-navbar-link-color;
      padding: 20px 1rem;
      &:hover {
        color: $top-navbar-link-hover-color;
      }
    }
  }
}
</style>