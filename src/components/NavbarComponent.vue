<template>
  <header class="ui attached stackable menu">
    <nav class="ui container">
      <router-link class="item" :to="{ name: 'home' }">
        <i class="home icon"></i>
        <span>Home</span>
      </router-link>
      <router-link class="item" to="" v-if="isLogin">
        <i class="dashboard icon"></i>
        <span>Dashboard</span>
      </router-link>
      <div class="right item">
        <div v-if="isLogin">
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
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'navbar',
  data: function () {
    return {
      isLogin: false
    }
  },
  methods: {
    ...mapActions([
      'userLogin',
      'userProfile' // handle data user ketika page direfresh/reload
    ]),
    ...mapMutations(['setUserProfile']),
    login: function () {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          let user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL
          }
          this.userLogin(user)
            .then(accesstoken => {
              if (accesstoken) {
                localStorage.setItem('accesstoken', accesstoken)
                this.isLogin = true
              } else {
                // jika tidak mendapat token dari server, login dianggap gagal
                alert('Login failed. Please try again!')
                firebase.auth().signOut()
              }
            })
        })
        .catch(error => alert('Oops! ' + error))
    },
    logout: function () {
      firebase.auth().signOut()
        .then(() => {
          this.setUserProfile(null)
          localStorage.removeItem('accesstoken')
          this.isLogin = false
        })
        .catch(error => alert('Oops! ' + error))
    },
    checkLoginStatus: function () {
      localStorage.getItem('accesstoken') ? this.isLogin = true : this.isLogin = false
    }
  },
  mounted: function () {
    if (localStorage.getItem('accesstoken')) this.userProfile()
    this.checkLoginStatus()
  }
}
</script>

<style>

</style>
