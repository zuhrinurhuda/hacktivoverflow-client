import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const config = {
  headers: { accesstoken: localStorage.getItem('accesstoken') }
}

const actions = {
  userLogin: ({ commit }, userData) => {
    return new Promise((resolve, reject) => {
      http.post('/users', userData)
        .then(({ data }) => resolve(data.accesstoken))
        .catch(err => reject(err))
    })
  },
  addNewQuestion: ({ commit }, question) => {
    http.post('/questions', question, config)
      .then(({ data }) => commit('setNewQuestions', data.newQuestion))
      .catch(err => console.log(err))
  },
  getAllQuestions: ({ commit }) => {
    http.get('/questions')
      .then(({ data }) => commit('setQuestions', data.questions))
      .catch(err => console.log(err))
  }
}

export default actions
