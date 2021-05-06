<template>
  <div class="dashboard">
    <AuthBasicLayout>
      <template v-slot:default="userDetails">
        <b-row>
          <b-col>
            <h3>
              Welcome {{ userDetails.user.displayName }}!
            </h3>
            <p>
              Thanks for choosing our product.
            </p>
          </b-col>
        </b-row>
      </template>
    </AuthBasicLayout>
  </div>
</template>

<script>
import AuthBasicLayout from './layouts/AuthBasicLayout'
export default {
  name: 'Dashboard',
  components: { AuthBasicLayout },
}
</script>

<style>

</style>