export const state = () => ({
  questions: [],
  currentIndex: 0,
  numberOfQuestion: 0,
})

export const mutations = {
  setQuestions(state, questions) {
    state.questions = questions
  },
  setCurrentIndex(state, currentIndex) {
    state.currentIndex = currentIndex
  },
  setNumberOfQuestion(state, numberOfQuestion) {
    state.numberOfQuestion = numberOfQuestion
  },
}

export const actions = {
  startQuiz({commit}, payload) {
    commit('setQuestions', payload.questions.slice(0, payload.numberOfQuestion))
    commit('setNumberOfQuestion', payload.numberOfQuestion)
  },
  incrementIndex({commit, state}) {
    commit('setCurrentIndex', state.currentIndex +1)
  },
}

export const getters = {
  getQuestions: (state) => state.questions,
  getCurrentIndex: (state) => state.currentIndex,
  getNumberOfQuestion: (state) => state.numberOfQuestion,
  getCurrentQuestion: (state) => state.questions[state.currentIndex],
}