const mutations = {
  setUserProfile: (state, payload) => {
    state.user = payload
  },
  // ----------------------------------------------------------------------------------------------------
  setQuestions: (state, payload) => {
    state.questions = payload
  },
  setQuestion: (state, payload) => {
    state.question = payload
  },
  setNewQuestion: (state, payload) => state.questions.unshift(payload),
  setUpdatedQuestion: (state, payload) => {
    state.question = payload
  },
  // ----------------------------------------------------------------------------------------------------
  setAnswers: (state, payload) => {
    state.answers = payload
  },
  setNewAnswer: (state, payload) => state.answers.push(payload),
  setDeletedAnswer: (state, payload) => {
    let filteredAnswer = state.answers.filter(answer => answer._id !== payload)
    state.answers = filteredAnswer
  }
}

export default mutations
