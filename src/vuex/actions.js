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
  userProfile: ({ commit }) => {
    http.get('/users/profile', config)
      .then(({ data }) => commit('setUserProfile', data.user))
      .catch(err => console.log(err))
  },
  addNewQuestion: ({ commit }, question) => {
    http.post('/questions', question, config)
      .then(({ data }) => commit('setNewQuestion', data.newQuestion))
      .catch(err => console.log(err))
  },
  getAllQuestions: ({ commit }) => {
    http.get('/questions')
      .then(({ data }) => commit('setQuestions', data.questions))
      .catch(err => console.log(err))
  },
  getQuestionById: ({ commit }, id) => {
    http.get('/questions/' + id)
      .then(({ data }) => commit('setQuestion', data.question))
      .catch(err => console.log(err))
  },
  getAnswersByQuestionId: ({ commit }, id) => {
    http.get('/answers/questions/' + id)
      .then(({ data }) => commit('setAnswers', data.answers))
      .catch(err => console.log(err))
  },
  addNewAnswer: ({ commit }, answer) => {
    http.post('/answers', answer, config)
      .then(({ data }) => {
        http.get('/answers/' + data.newAnswer._id)
          .then(({ data }) => commit('setNewAnswer', data.answer))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  },
  deleteQuestion: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      http.delete('/questions/' + id, config)
        .then(({ data }) => resolve(data.deletedQuestion))
        .catch(err => console.log(err))
    })
  },
  deleteAnswer: ({ commit }, id) => {
    http.delete('/answers/' + id, config)
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
  }
}

export default actions
