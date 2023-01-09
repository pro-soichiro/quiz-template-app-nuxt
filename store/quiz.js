export const state = () => ({
  questions: [],
  currentIndex: 0,
  numberOfQuestion: 0,
  selectAnswers: [],
  numberOfCorrect: 0,
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
  setSelectAnswers(state, selectAnswers) {
    state.selectAnswers = selectAnswers
  },
  setNumberOfCorrect(state, numberOfCorrect) {
    state.numberOfCorrect = numberOfCorrect
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
  checkAnswer({commit, state}) {
    let score = 0
    for(let i = 0; state.numberOfQuestion > i; i++) {
      if (state.questions[i].answer === state.selectAnswers[i]) {
        score++
      }
    }
    commit('setNumberOfCorrect', score)
  },
  reset({commit}) {
    commit('setQuestions', [])
    commit('setCurrentIndex', 0)
    commit('setNumberOfQuestion', 0)
    commit('setSelectAnswers', [])
    commit('setNumberOfCorrect', 0)
  },
}

export const getters = {
  getQuestions: (state) => state.questions,
  getCurrentIndex: (state) => state.currentIndex,
  getNumberOfQuestion: (state) => state.numberOfQuestion,
  getSelectAnswers: (state) => state.selectAnswers,
  getCurrentQuestion: (state) => state.questions[state.currentIndex],
  getNumberOfCorrect: (state) => state.numberOfCorrect,
}