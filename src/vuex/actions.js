import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  userLogin: ({ commit }, userData) => {
    return new Promise((resolve, reject) => {
      http.post('/users', userData)
        .then(({ data }) => resolve(data.accesstoken))
        .catch(err => reject(err))
    })
  }
}

export default actions
