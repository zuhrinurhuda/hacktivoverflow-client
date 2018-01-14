<template>
  <header class="ui attached stackable menu">
    <nav class="ui container">
      <router-link class="item" to="">
        <i class="home icon"></i>
        <span>Home</span>
      </router-link>
      <router-link class="item" to="" v-if="token">
        <i class="dashboard icon"></i>
        <span>Dashboard</span>
      </router-link>
      <div id="remove" class="right item">
        <div v-if="token">
          <button class="ui facebook button" @click="logout">
            <i class="sign out icon"></i>
            <span>Sign out</span>
          </button>
        </div>
        <div v-else>
          <button class="ui facebook button" @click="login">
            <i class="facebook icon"></i>
            <span>Sign in with Facebook</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import firebase from '../firebase'
import { mapActions } from 'vuex'
export default {
  name: 'TheNavbar',
  data: function () {
    return {
      token: null
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    login: function () {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          let user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL
          }
          console.log(user)
          this.userLogin(user)
        })
        .catch(error => {
          alert('Oops! ' + error)
        })
    },
    logout: function () {
    }
  }
}
</script>

<style>

</style>
