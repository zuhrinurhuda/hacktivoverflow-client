const mutations = {
  setQuestions: (state, payload) => {
    state.questions = payload
  },
  setQuestion: (state, payload) => {
    state.question = payload
  },
  setNewQuestion: (state, payload) => {
    state.questions.unshift(payload)
  },
  setAnswers: (state, payload) => {
    state.answers = payload
  },
  setNewAnswer: (state, payload) => {
    state.answers.push(payload)
  }
}

export default mutations
