const mutations = {
  setQuestions: (state, payload) => {
    state.questions = payload
  },
  setNewQuestions: (state, payload) => {
    state.questions.unshift(payload)
  }
}

export default mutations
