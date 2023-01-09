import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'

export const state = () => ({
  scores: [],
})

export const mutations = {
  setScores(state, scores) {
    state.scores = scores
  },
}

export const actions = {
  async scoresInit({commit}, payload) {
    try {
      const db = getFirestore(this.$firebase)
      const scoresRef = collection(db, 'scores')

      const q = query(
        scoresRef,
        where('userUid', '==', payload.userUid),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)

      const arr = []
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())
      })
      commit('setScores', arr)
    } catch (e) {
      alert(e)
    }
  },
}

export const getters = {
  getScores: (state) => state.scores,
  getNumberOfQuestion: (state) => {
    let all = 0
    state.scores.forEach(score => {
      all += score.numberOfQuestion
    })
    return all
  },
  getNumberOfCorrect: (state) => {
    let cor = 0
    state.scores.forEach(score => {
      cor += score.numberOfCorrect
    })
    return cor
  },
  getCorrectAnswerRate: (state) => {
    let cor = 0
    let all = 0
    state.scores.forEach(score => {
      cor += score.numberOfCorrect
      all += score.numberOfQuestion
    })
    if(cor === 0 || all === 0 ) return 0
    const result = Math.round(cor / all * 100)
    return result
  },
}
