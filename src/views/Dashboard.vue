<template>
  <b-container fluid>
    <b-row no-gutters>
      <b-col>
        Welcome {{ userDisplayName }} !
      </b-col>
      <b-col>
        <div v-if="userDisplayName">
          <b-btn @click="logoutUser">
            Logout
          </b-btn>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { FirebaseAuth } from '../firebase.config'
export default {
		computed: {
				...mapState('user', ['currentUser']),
				userDisplayName () {
						return this.currentUser && this.currentUser.displayName ? this.currentUser.displayName : null
				}
		},
		methods: {
				...mapActions('user', ['setAutheticatedUser']),
				logoutUser () {
					this.setAutheticatedUser(null)
					FirebaseAuth.signOut()
						.then(() => this.setAutheticatedUser(null))
						.catch((e) => console.log(e))
				}
		}
}
</script>

<style>

</style>