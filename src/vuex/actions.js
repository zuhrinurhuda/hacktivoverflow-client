import axios from 'axios'
import firebase from '../firebase'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  userLogin: ({ commit }, userData) => {
    http.post('/users', userData)
      .then(({ data }) => {
        if (!data.accesstoken) {
          alert('Login failed. Please try again!')
          firebase.auth().signOut()
        } else {
          localStorage.setItem('accesstoken', data.accesstoken)
        }
      })
      .catch(err => console.log(err))
  }
}

export default actions
